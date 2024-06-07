import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Follower } from 'src/follower/entities/follower.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
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

  async getPostsFromFollowedUsers(nickname: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({ where: { nickname } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const followedUserIds = await this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .where('follower.user_follower_id = :userId', { userId: user.id })
      .andWhere('follower.state = :state', { state: 'Accepted' })
      .getMany();

    const followedIds = followedUserIds.map(follower => follower.user.id);

    if (followedIds.length === 0) {
      return [];
    }

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.user.id IN (:...followedIds)', { followedIds })
      .getMany();

    return posts;
  }

}
