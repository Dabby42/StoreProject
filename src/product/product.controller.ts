import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/auth.jwt.guard';
import { ApiQuery } from '@nestjs/swagger';
import { ProductQueryDto } from './dto/product-query.dto';
import { sendSuccess } from '../utils/helpers/response.helpers';

@Controller('v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.createProduct(createProductDto);
    return sendSuccess(null, 'Product created successfully');
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @Get()
  async getAllProducts(@Query() productQueryDto: ProductQueryDto) {
    const data = await this.productService.getAllProducts(productQueryDto);
    return sendSuccess(data, 'Products retrieved successfully');
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const data = await this.productService.getProduct(id);
    if (!data) throw new NotFoundException('Product not found.');
    return sendSuccess(data, 'Product retrieved successfully.');
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.updateProduct(id, updateProductDto);
    return sendSuccess(null, 'Product updated successfully');
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productService.removeProduct(id);
    return sendSuccess(null, 'Product deleted successfully.');
  }
}
