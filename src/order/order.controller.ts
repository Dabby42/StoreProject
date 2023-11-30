import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiQuery } from '@nestjs/swagger';
import { GeneralGuard } from '../auth/general.jwt.guard';
import { RoleEnum } from '../user/entities/user.entity';
import { sendSuccess } from '../utils/helpers/response.helpers';
import { OrderQueryDto } from './dto/order-query.dto';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GeneralGuard)
  @Get()
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({
    name: 'start_date',
    type: 'string',
    example: '2021-01-10 12:00:00',
    required: false,
  })
  @ApiQuery({
    name: 'end_date',
    type: 'string',
    example: '2021-05-10 12:00:00',
    required: false,
  })
  @ApiQuery({
    name: 'user_id',
    description:
      'This is for when admin wants to get orders of a particular user. ',
    type: 'number',
    required: false,
  })
  async getAllOrders(@Query() orderQueryDto: OrderQueryDto, @Req() req: any) {
    //if it is a user calling this endpoint, ensure they only get their orders.
    if (req.user.role === RoleEnum.USER)
      orderQueryDto.user_id = String(req.user.id);
    const orders = await this.orderService.getAllOrders(orderQueryDto);
    return sendSuccess(orders, 'Orders retrieved successfully');
  }

  @UseGuards(GeneralGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrder(id);
    return sendSuccess(order, 'Order retrieved successfully');
  }

  @UseGuards(GeneralGuard)
  @Delete(':id')
  async removeOrder(@Param('id') id: string) {
    await this.orderService.removeOrder(id);
    return sendSuccess(null, 'Order deleted successfully');
  }
}
