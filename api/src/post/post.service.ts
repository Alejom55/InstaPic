import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<void> {
    const { description, uri_resource, nickname } = createPostDto;

    const user = await this.userRepository.findOne({ where: { nickname } });
    if (!user) {
      throw new NotFoundException(`User with email ${nickname} not found`);
    }

    const post = this.postRepository.create({
      description,
      uri_resource,
      post_date: new Date(),
      user,
    });

    this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
