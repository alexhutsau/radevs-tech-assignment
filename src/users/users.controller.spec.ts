import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IQuery } from '../middleware/auth.guard';
import { User } from './entities/user.entity';
import { UserTag } from './tags/entites/tag.entity';
import { TagsService } from './tags/tags.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  let query: IQuery;
  const dummyUUID = '00000000-0000-0000-0000-000000000000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        TagsService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAllExcept: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserTag),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    query = { user: { id: dummyUUID, name: 'test' } };
  });

  describe('find', () => {
    it('should return users', async () => {
      const res: User[] = [];

      jest.spyOn(usersService, 'findAllExcept').mockResolvedValue(res);

      expect(await controller.find(query, { tags: undefined })).toBe(res);
    })
  });
});
