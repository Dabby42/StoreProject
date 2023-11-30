import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomCacheModule } from "../cache/cache.module";
import { Category } from "./entities/category.entity";
import { CategoriesController } from "./category.controller";
import { CategoriesService } from "./category.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CustomCacheModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoryModule {
}
