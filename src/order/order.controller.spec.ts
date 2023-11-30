import { Test, TestingModule } from '@nestjs/testing';
import {
  getAllOrdersResponseMock,
  getOrderResponseMock,
} from './order.mock';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CacheService } from '../cache/cache.service';

describe('OrderController', () => {
  let controller: OrderController;
  let orderRepository;

  const mockOrderRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((orderData) =>
      Promise.resolve({
        id: 1,
        ...orderData,
      }),
    ),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    count: jest.fn().mockReturnValue(0),
    getOne: jest.fn().mockReturnValue({}),
    find: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(getAllOrdersResponseMock.data.orders),
      ),
    findAndCount: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([getAllOrdersResponseMock.data]),
      ),
    findOne: jest
      .fn()
      .mockImplementation(() => Promise.resolve(getOrderResponseMock.data)),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn().mockImplementation(() => null),
    set: jest.fn(),
    refresh: jest.fn(),
    cachedData: jest.fn().mockImplementation((_, callback) => callback()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderRepository = module.get(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all orders', () => {
    it('should retrieve all orders successfully', async () => {
      expect(
        await controller.getAllOrders(
          { page: '1', limit: '20' },
          { user: { role: 'admin' } },
        ),
      ).toStrictEqual(getAllOrdersResponseMock);
    });
  });

  describe('Fetch an order', () => {
    it('should fetch an order successfully', async () => {
      expect(
        await controller.getOrder('65676a183b28e47e44a862a7'),
      ).toStrictEqual(getOrderResponseMock);
    });
  });
});
