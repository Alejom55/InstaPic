import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserPublicDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  findOneByNickname(nickname: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  findAll() {
    console.log('hola')
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
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
}

// update(id: number, updateAuthDto: UpdateAuthDto) {
//   return `This action updates a #${id} auth`;
// }

