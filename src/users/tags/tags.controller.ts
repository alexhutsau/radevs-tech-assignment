import { Body, Controller, Delete, Param, ParseUUIDPipe, Put } from '@nestjs/common'
import { IQuery } from '../../middleware/auth.guard'
import { SaveUserTagBodyDto } from './dto/save.dto'
import { TagsService } from './tags.service'

@Controller('user/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
  ) {}

  @Put()
  save(@Param('query') query: IQuery, @Body() body: SaveUserTagBodyDto) {
    return this.tagsService.save({ ...body, userId: query.user.id })
  }

  @Delete(':id')
  async delete(@Param('query') query: IQuery, @Param('id', ParseUUIDPipe) tagId: string) {
    await this.tagsService.delete(tagId, query.user.id)
  }
}
