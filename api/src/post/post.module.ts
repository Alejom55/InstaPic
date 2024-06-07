import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { Follower } from 'src/follower/entities/follower.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Follower]) ],
})
export class PostModule { }
