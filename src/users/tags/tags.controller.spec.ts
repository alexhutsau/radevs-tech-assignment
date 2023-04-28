import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IQuery } from '../../middleware/auth.guard';
import { SaveUserTagBodyDto } from './dto/save.dto';
import { IUserTag, UserTag } from './entites/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;
  let tagsService: TagsService;
  
  let query: IQuery;
  const dummyUUID = '00000000-0000-0000-0000-000000000000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(UserTag),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);

    query = { user: { id: dummyUUID, name: 'test' } };
  });

  describe('save', () => {
    it('should create or update user tag', async () => {
      const body: SaveUserTagBodyDto = {
        name: 'test',
        color: '000000',
      };

      const tagInfo: IUserTag = {
        userId: query.user.id,
        ...body,
      };

      jest.spyOn(tagsService, 'save').mockResolvedValue({
        id: dummyUUID,
        ...tagInfo
      });

      expect(await controller.save(query, body)).toMatchObject({
        id: expect.any(String),
        ...tagInfo,
      });
    })
  })

  describe('delete', () => {
    it('should delete user tag', async () => {
      const tagId = dummyUUID;

      jest.spyOn(tagsService, 'delete').mockResolvedValue({ raw: undefined });

      expect(await controller.delete(query, tagId)).resolves;
    })
  })
});
