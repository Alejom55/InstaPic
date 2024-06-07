import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserPublicDto } from './dto/auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Get(':nickname')
  findUserPublic(@Param('nickname') nickname: string): Promise<UserPublicDto | BadRequestException> {
    return this.authService.findUserPublic(nickname);
  }

  @Get(':nickname/private')
  // @UseGuards(AuthGuard)
  findUserAndPostsPrivate(@Param('nickname') nickname: string): Promise<User | BadRequestException> {
    return this.authService.findUserAndPostsPrivate(nickname);
  }

  @Get(':nickname/random-users-not-followed')
  // @UseGuards(AuthGuard)
  findRandomUsersNotFollowed(@Param('nickname') nickname: string) {
    return this.authService.findRandomUsersNotFollowed(nickname);
  }


}
