import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete, NotFoundException
} from "@nestjs/common";
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { sendSuccess } from '../utils/helpers/response.helpers';
import { AdminGuard } from '../admin/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GeneralGuard } from '../auth/general.jwt.guard';
import { JwtGuard } from "../auth/auth.jwt.guard";

@ApiTags('Categories')
@ApiBearerAuth('jwt')
@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.createCategory(createCategoryDto);
    return sendSuccess(null, 'Category created successfully');
  }

  @UseGuards(GeneralGuard)
  @Get()
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return sendSuccess(categories, 'All categories retrieved successfully.');
  }

  @UseGuards(GeneralGuard)
  @Get(':id')
  async getCategory(@Param('id') id: string) {
    const data = await this.categoriesService.getCategory(id);
    if (!data) throw new NotFoundException('Category not found.');
    return sendSuccess(data, 'Category retrieved successfully.');
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.updateCategory(id, updateCategoryDto);
    return sendSuccess(null, 'Category updated successfully');
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    await this.categoriesService.removeCategory(id);
    return sendSuccess(null, 'Category deleted successfully.');
  }
}
