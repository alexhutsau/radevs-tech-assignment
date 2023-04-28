import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TagsModule } from './tags/tags.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../middleware/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    TagsModule,
  ],
})
export class UsersModule {}
