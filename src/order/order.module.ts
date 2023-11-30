import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomCacheModule } from '../cache/cache.module';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomCacheModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
