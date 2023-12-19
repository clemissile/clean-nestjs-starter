import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ArticlesService } from 'src/articles/articles.service';

@Module({
  controllers: [UsersController],
  providers: [ArticlesService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
