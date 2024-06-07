import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserPublicDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Follower } from 'src/follower/entities/follower.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      return
    }
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findUserPublic(nickname: string): Promise<UserPublicDto | BadRequestException> {
    const existingUser = await this.userRepository.findOne({ where: { nickname: nickname }, relations: ['followers', 'following'], });
    if (!existingUser) {
      return new BadRequestException('User not found');
    }
    const { id, ...userPublic } = existingUser;
    return userPublic;
  }

  async findUserAndPostsPrivate(nickname: string): Promise<User | BadRequestException> {
    const existingUser = await this.userRepository.findOne({ where: { nickname: nickname }, relations: ['posts', 'posts.comments', 'followers', 'following'], });
    if (!existingUser) {
      return new BadRequestException('User not found');
    }
    return existingUser;
  }

  async findRandomUsersNotFollowed(nickname: string): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { nickname },
      relations: ['following'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const followedUserIds = await this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .where('follower.user_follower_id = :userId', { userId: user.id })
      .andWhere('follower.state IN (:...states)', { states: ['Accepted', 'Pending'] })
      .getMany();

    const followedIds = followedUserIds.map(follower => follower.user.id);
    followedIds.push(user.id);

    const notFollowedUsers = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id NOT IN (:...followedIds)', { followedIds })
      .orderBy('RANDOM()')
      .take(5)
      .getMany();

    return notFollowedUsers;
  }

}


