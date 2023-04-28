import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';

@Module({
  controllers: [UsersController, TagsController],
  providers: [UsersService],
  imports: [TagsModule]
})
export class UsersModule {}
