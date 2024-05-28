import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  async create(CreateUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = CreateUserDto;
      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await this.userRepository.save(newUser);
      const { password: _, ...user } = newUser;
      return user;

    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('Email already exists')
      }
      console.log(err)
    }
    console.log({ CreateUserDto })
    return 'This action adds a new auth';
  }

  findAll() {
    console.log('hola')
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
