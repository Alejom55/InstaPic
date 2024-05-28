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


  async create2(CreateUserDto: CreateUserDto) {
    try {

      const userData = CreateUserDto;
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('Email already exists')
      }
      console.log(err)
    }
  }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      // throw new BadRequestException('Email already exists');
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

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
