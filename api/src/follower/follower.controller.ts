import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CheckFollowDto, FollowUserDto } from './dto/follower.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) { }

  @Post('check-follow')
  async checkIfUserFollows(@Body() checkFollowDto: CheckFollowDto): Promise<boolean | string> {
    return this.followerService.checkIfUserFollows(checkFollowDto);
  }

  @Post('follow-user')
  @UseGuards(AuthGuard)
  async followUser(@Body() followUser: FollowUserDto): Promise<void> {
    return this.followerService.followUser(followUser);
  }

  @Post('unfollow-user')
  @UseGuards(AuthGuard)
  async unfollowUser(@Body() followUser: FollowUserDto): Promise<void> {
    return this.followerService.unFollowUser(followUser);
  }

  @Post('accept')
  @UseGuards(AuthGuard)
  async acceptFollowRequest(@Body() followUserDto: FollowUserDto): Promise<void> {
    try {
      await this.followerService.acceptFollowRequest(followUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reject')
  @UseGuards(AuthGuard)
  async rejectFollowRequest(@Body() followUserDto: FollowUserDto): Promise<void> {
    try {
      await this.followerService.rejectFollowRequest(followUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('pending/:nickname')
  @UseGuards(AuthGuard)
  async getPendingFollowers(@Param('nickname') nickname: string) {
    return this.followerService.getPendingFollowers(nickname);
  }
}
