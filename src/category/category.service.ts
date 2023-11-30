import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ObjectId } from "mongodb";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
    } catch (error) {
      throw new UnprocessableEntityException('An unknown error occurred');
    }
  }

  async getAllCategories() {
    return await this.categoryRepository.find();
  }

  async getCategory(_id: string) {
    const objectId = new ObjectId(_id);
    const category = await this.categoryRepository.findOne({
      where: { _id: objectId },
    });

    if (!category) return null;
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const objectId = new ObjectId(id);
    await this.categoryRepository.update(objectId, updateCategoryDto);
  }

  async removeCategory(id: string) {
    const objectId = new ObjectId(id);
    const data = await this.categoryRepository.delete(objectId);
    if (data.affected === 0) throw new NotFoundException('Category not found.');
  }
}
