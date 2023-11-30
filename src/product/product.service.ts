import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';
import { CacheService } from '../cache/cache.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  private readonly cacheKeyBase: string;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private cacheService: CacheService,
  ) {
    this.cacheKeyBase = 'PRODUCTS_';
  }
  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
  }

  getAllProducts(queryProductDto: ProductQueryDto) {
    const { page, limit } = queryProductDto;
    return this.cacheService.cachedData(
      `${this.cacheKeyBase}${page}_${limit}`,
      async () => {
        const skip = (+page - 1) * +limit;

        const [products, count] = await Promise.all([
          this.productRepository.find({
            skip,
            take: +limit,
            relations: ['category', 'user'],
          }),
          this.productRepository.count(),
        ]);

        const pages = Math.ceil(count / +limit);
        return {
          products,
          count,
          current_page: +page,
          pages,
        };
      },
    );
  }

  getProduct(_id: string) {
    let key = this.cacheKeyBase;
    key += _id;
    const objectId = new ObjectId(_id);
    return this.cacheService.cachedData(key, async () => {
      const product = await this.productRepository.findOne({
        where: { _id: objectId },
      });

      if (!product) return null;
      return product;
    });
  }

  async updateProduct(_id: string, updateProductDto: UpdateProductDto) {
    const objectId = new ObjectId(_id);

    const data = await this.productRepository.update(
      objectId,
      updateProductDto,
    );
    if (data.affected === 0)
      throw new BadRequestException('Update could not be performed.');
    await this.cacheService.refresh(this.cacheKeyBase);
  }

  async removeProduct(_id: string) {
    const objectId = new ObjectId(_id);

    const data = await this.productRepository.delete(objectId);
    if (data.affected === 0) throw new NotFoundException('Product not found.');
    await this.cacheService.refresh(this.cacheKeyBase);
  }
}
