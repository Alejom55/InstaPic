import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CheckFollowDto, FollowUserDto } from './dto/follower.dto';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) { }

  @Post('check-follow')
  async checkIfUserFollows(@Body() checkFollowDto: CheckFollowDto): Promise<boolean> {
    return this.followerService.checkIfUserFollows(checkFollowDto);
  }

  @Post('follow-user')
  async followUser(@Body() followUser: FollowUserDto): Promise<void> {
    return this.followerService.followUser(followUser);
  }

  @Post('accept')
  async acceptFollowRequest(@Body() followUserDto: FollowUserDto): Promise<void> {
    try {
      await this.followerService.acceptFollowRequest(followUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reject')
  async rejectFollowRequest(@Body() followUserDto: FollowUserDto): Promise<void> {
    try {
      await this.followerService.rejectFollowRequest(followUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
