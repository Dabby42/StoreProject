import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomCacheModule } from "../cache/cache.module";
import { Product } from "./entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CustomCacheModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
