import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [MulterModule.register({
    dest: './uploads',
  }),TypeOrmModule.forFeature([Post])],
})
export class PostModule { }
