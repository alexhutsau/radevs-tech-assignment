import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { TagsService } from './tags/tags.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tagsService: TagsService,
  ) {}

  findByName(name: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { name } })
  }

  async findAllExcept(id: string, tags?: string[]): Promise<User[]> {
    const userIds = tags?.length && await this.tagsService.findUserIdsByTagName(tags)

    if (tags?.length && !userIds.length) {
      return []
    }

    const qb = this.usersRepository.createQueryBuilder('users')
      .innerJoinAndSelect('users.tags', 'tags')
      .where({ id: Not(id) })

    if (userIds?.length) {
      qb.andWhereInIds(userIds)
    }

    return qb.getMany()
  }
}
