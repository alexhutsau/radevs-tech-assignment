import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'
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

  async findUserIdsByTagName(names: string[]): Promise<string[]> {
    const tags = await this.tagsRepository.createQueryBuilder('tags')
      .distinct().select('tags.userId as "userId"')
      .where({ name: In(names) })
      .getRawMany()

    return tags.map(t => t.userId)
  }
}
