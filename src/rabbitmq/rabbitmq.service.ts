import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { config } from '../config/config';
import { Connection } from 'amqplib';
import { UserService } from '../user/user.service';
import { validate } from 'class-validator';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private readonly logger = new Logger('RabbitmqService');

  constructor(
    private ordersService: OrderService,
    private readonly userService: UserService,
    @Inject('RABBITMQ_CONNECTION') private readonly connection: Connection,
  ) {}

  onModuleInit(): any {
    this.consumeOrderMessage();
  }

  async consumeOrderMessage() {
    if (this.connection) {
      const channel = await this.connection.createChannel();
      await channel.assertQueue(config.amqp.consumers.order_sync.queueName);
      const handler = async (msg) => {
        try {
          const message = JSON.parse(msg.content.toString());
          const messageData = new CreateOrderDto();
          Object.assign(messageData, message);
          const validationError = await validate(messageData, {
            whitelist: true,
          });
          if (validationError.length) {
            this.logger.debug(
              'Skipping handling message, invalid message schema ' +
                JSON.stringify(message),
            );
            channel.ack(msg);
            return;
          }
          this.logger.debug(
            'Handling User Order for message : ' + JSON.stringify(message),
          );
          await this.handleOrder(messageData);
          channel.ack(msg);
          this.logger.debug(
            'Done handling User Order for message : ' + JSON.stringify(message),
          );
        } catch (e) {
          this.logger.error(
            'Error while handling order message ' +
              msg.content.toString() +
              ' with error ' +
              e.message,
          );
          channel.ack(msg);
        }
      };
      channel.consume(config.amqp.consumers.order_sync.queueName, handler);
    }
  }

  async handleOrder(data: CreateOrderDto) {
    const orderData: CreateOrderDto = {
      order_id: data.order_id,
      total_amount: data.total_amount,
      user_id: data.user_id,
      product_id: data.product_id,
      category_id: data.category_id,
    };

    await this.ordersService.createOrder(orderData);
  }
}
