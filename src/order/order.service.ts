import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '../cache/cache.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderService {
  private readonly cacheKeyBase: string;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private cacheService: CacheService,
  ) {
    this.cacheKeyBase = 'ORDERS_';
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const orderExists = await this.orderRepository.findOne({
      where: { order_id: createOrderDto.order_id },
    });
    if (orderExists) throw new ConflictException('Order already exists.');
    const newOrder = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(newOrder);
  }
  async getAllOrders(queryOrderDto: OrderQueryDto) {
    const { page, limit, start_date, end_date, ...conditions } = queryOrderDto;
    return this.cacheService.cachedData(
      `${this.cacheKeyBase}${page}_${limit}`,
      async () => {
        const skip = (+page - 1) * +limit;

        // eslint-disable-next-line prefer-const
        let [orders, count] = await Promise.all([
          this.orderRepository.find({
            skip,
            take: +limit,
            relations: ['category', 'user', 'product'],
          }),
          this.orderRepository.count(),
        ]);
        if (start_date && end_date) {
          orders = orders.filter(
            (order) =>
              order.created_at >= new Date(start_date) &&
              order.created_at <= new Date(end_date),
          );
        }
        const pages = Math.ceil(count / +limit);

        return {
          orders,
          count,
          current_page: +page,
          pages,
        };
      },
    );
  }

  async getOrder(order_id: string) {
    let key = this.cacheKeyBase;
    key += order_id;
    const objectId = new ObjectId(order_id);

    return this.cacheService.cachedData(key, async () => {
      const order = await this.orderRepository.findOne({
        where: { _id: objectId },
      });

      if (!order) return null;
      return order;
    });
  }

  async removeOrder(_id: string) {
    const objectId = new ObjectId(_id);
    const data = await this.orderRepository.delete(objectId);
    if (data.affected === 0) throw new NotFoundException('Order not found.');
    await this.cacheService.refresh(this.cacheKeyBase);
  }
}
