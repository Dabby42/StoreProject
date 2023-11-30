import { Test, TestingModule } from '@nestjs/testing';
import {
  getAllProductResponseMock,
  productRepositoryMock,
  updateProductData,
  createProductData,
  createProductResponseData,
} from './product.mock';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CacheService } from '../cache/cache.service';
import { ProductController } from './product.controller';
import { loginUserSuccessMockData } from '../auth/auth.mock';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let module: TestingModule;
  let productRepository;
  const mockProductRepository = {
    findOneBy: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ...productRepositoryMock })),
    findOne: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ...productRepositoryMock })),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn(),
    insert: jest.fn().mockImplementation((userData) =>
      Promise.resolve({
        id: 1,
        ...userData,
        raw: {
          insertId: 1,
        },
      }),
    ),
  };

  const mockJWTService = {
    sign: jest
      .fn()
      .mockImplementation(() => loginUserSuccessMockData.data.token),
  };

  const mockCache = {
    get: jest.fn().mockImplementation(() => productRepositoryMock.id),
    set: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: JwtService,
          useValue: mockJWTService,
        },
        {
          provide: CacheService,
          useValue: mockCache,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a new product', function () {
    it('should return a success response', async () => {
      productRepository.findOneBy.mockImplementationOnce(() =>
        Promise.resolve(null),
      );

      expect(await controller.createProduct(createProductData)).toEqual(
        createProductResponseData,
      );
    });

    it('should return an error if save method throws', async () => {
      productRepository.save.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        controller.createProduct(createProductData),
      ).rejects.toThrowError();
    });
  });
});
