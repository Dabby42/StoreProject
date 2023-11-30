import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import {
  categoryRepositoryMock,
  createCategoryData,
  createCategoryResponseData,
  getAllCategoryResponseMock,
  updateCategoryData,
} from './category.mock';
import { UnprocessableEntityException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

describe('CategoryController', () => {
  let controller: CategoriesController;
  let categoryRepository;
  const mockCategoryRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((categoryData) =>
      Promise.resolve({
        id: 1,
        ...categoryData,
      }),
    ),
    findOne: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ ...categoryRepositoryMock.data }),
      ),
    find: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(getAllCategoryResponseMock.data),
      ),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoryRepository = module.get(getRepositoryToken(Category));
  });

  describe('Create a category', () => {
    it('should create a category successfully', async () => {
      expect(await controller.createCategory(createCategoryData)).toStrictEqual(
        createCategoryResponseData,
      );
    });

    it('should return an error if insert method throws ', async () => {
      categoryRepository.save.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        controller.createCategory(createCategoryData),
      ).rejects.toThrowError(UnprocessableEntityException);
    });
  });

  describe('Fetch all categories', () => {
    it('should fetch all categories successfully', async () => {
      expect(await controller.getAllCategories()).toStrictEqual(
        getAllCategoryResponseMock,
      );
    });
  });

  describe('Fetch a category', () => {
    it('should fetch a category successfully', async () => {
      expect(
        await controller.getCategory('65676a183b28e47e44a862a7'),
      ).toStrictEqual(categoryRepositoryMock);
    });
  });

  describe('Update category', () => {
    it('should update category successfully', async () => {
      await controller.updateCategory(
        '65676a183b28e47e44a862a7',
        updateCategoryData,
      );
      const id = new ObjectId('65676a183b28e47e44a862a7');
      expect(categoryRepository.update).toHaveBeenCalledWith(
        id,
        updateCategoryData,
      );
    });
  });
});
