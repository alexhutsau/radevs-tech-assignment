import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { IUserTag, UserTag } from './entites/tag.entity'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(UserTag)
    private tagsRepository: Repository<UserTag>,
  ) {}

  async save(tagInfo: IUserTag): Promise<UserTag> {
    return (await this.tagsRepository.createQueryBuilder()
      .insert().orUpdate(['color'], ['user_id', 'name'])
      .values(tagInfo)
      .returning('*')
      .execute()
    ).generatedMaps[0] as UserTag
  }

  delete(id: string, userId: string): Promise<DeleteResult> {
    return this.tagsRepository.delete({ id, userId })
  }
}
