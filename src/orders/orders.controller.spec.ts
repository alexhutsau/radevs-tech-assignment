import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IQuery } from '../middleware/auth.guard';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderTag } from './tags/entities/tag.entity';
import { TagsService } from './tags/tags.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: OrdersService;

  let query: IQuery;
  const dummyUUID = '00000000-0000-0000-0000-000000000000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findAll: jest.fn(),
          },
        },
        TagsService,
        {
          provide: getRepositoryToken(OrderTag),
          useValue: {},
        },
      ]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);

    query = { user: { id: dummyUUID, name: 'test' } };
  });

  describe('find', () => {
    it('should return user orders', async () => {
      const res: Order[] = [];

      jest.spyOn(ordersService, 'findAll').mockResolvedValue(res);

      expect(await controller.find(query, { tags: undefined })).toBe(res);
    })
  });
});
