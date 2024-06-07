import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('upload')
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto): Promise<void> {
    return this.postService.create(createPostDto);
  }
  @Get("following-users-posts/:nickname")
  // @UseGuards(AuthGuard)
  getPostsFromFollowedUsers(@Param('nickname') nickname: string) {
    return this.postService.getPostsFromFollowedUsers(nickname);
  }

}
