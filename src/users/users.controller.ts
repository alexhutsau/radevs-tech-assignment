import { Controller, Get, Param, Query } from '@nestjs/common'
import { IQuery } from '../middleware/auth.guard'
import { FindQueryDto } from './dto/find.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  find(@Param('query') query: IQuery, @Query() { tags }: FindQueryDto) {
    return this.usersService.findAllExcept(query.user.id, tags)
  }
}
