import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IQuery } from '../../middleware/auth.guard';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../orders.service';
import { SaveOrderTagBodyDto } from './dto/save.dto'
import { IOrderTag, OrderTag } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;
  let tagsService: TagsService;
  let ordersService: OrdersService;
  
  let query: IQuery;
  const dummyUUID = '00000000-0000-0000-0000-000000000000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        OrdersService,
        {
          provide: getRepositoryToken(OrderTag),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);
    ordersService = module.get<OrdersService>(OrdersService);

    query = { user: { id: dummyUUID, name: 'test' } };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save', () => {
    it('should create or update order tag', async () => {
      const body: SaveOrderTagBodyDto = {
        orderId: dummyUUID,
        name: 'test',
        color: '000000',
      };

      const tagInfo: IOrderTag = { ...body };

      jest.spyOn(ordersService, 'findOne').mockResolvedValue({
        id: dummyUUID,
        userId: query.user.id,
      });

      jest.spyOn(tagsService, 'save').mockResolvedValue({
        id: dummyUUID,
        ...tagInfo
      });

      expect(await controller.save(query, body)).toMatchObject({
        id: expect.any(String),
        ...tagInfo,
      });
    })

    it('should throw ForbiddenException if order doesn\'t belong to user', async () => {
      const body: SaveOrderTagBodyDto = {
        orderId: dummyUUID,
        name: 'test',
        color: '000000',
      };

      jest.spyOn(ordersService, 'findOne').mockResolvedValue(undefined);

      expect(jest.spyOn(tagsService, 'save')).not.toBeCalled();
      await expect(controller.save(query, body)).rejects.toThrow(ForbiddenException);
    })
  });

  describe('delete', () => {
    it('should delete user tag', async () => {
      const tagId = dummyUUID;

      jest.spyOn(tagsService, 'delete').mockResolvedValue({ raw: undefined });

      expect(await controller.delete(query, tagId)).resolves;
    })
  });
});
