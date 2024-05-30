import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckFollowDto, FollowUserDto } from './dto/follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) { }

  async checkIfUserFollows(checkFollowDto: CheckFollowDto): Promise<boolean> {
    const { loggedInUserNickname, targetUserNickname } = checkFollowDto;
    const loggedInUser = await this.userRepository.findOne({
      where: { nickname: loggedInUserNickname },
    });
    const targetUser = await this.userRepository.findOne({
      where: { nickname: targetUserNickname },
    });
    if (!loggedInUser || !targetUser) {
      throw new BadRequestException('User not found');
    }
    const follower = await this.followerRepository.findOne({
      where: {
        user: { id: targetUser.id },
        userFollower: { id: loggedInUser.id },
      },
    });
    if (!follower) {
      return false
    } else {
      return follower.state === 'Accepted';
    }
  }

  async followUser(createFollowerDto: FollowUserDto): Promise<void> {
    const { loggedInUserNickname, targetUserNickname } = createFollowerDto;
    if (loggedInUserNickname === targetUserNickname) {
      throw new BadRequestException('Cannot follow yourself');
    }

    const loggedInUser = await this.userRepository.findOne({
      where: { nickname: loggedInUserNickname },
    });
    const targetUser = await this.userRepository.findOne({
      where: { nickname: targetUserNickname },
    });

    if (!loggedInUser || !targetUser) {
      throw new BadRequestException('User not found');
    }

    const existingFollower = await this.followerRepository.findOne({
      where: {
        user: { id: targetUser.id },
        userFollower: { id: loggedInUser.id },
      },
    });
    if (existingFollower) {
      throw new BadRequestException('Already following this user');
    }
    const follower = new Follower();
    follower.state = 'Pending';
    follower.request_date = new Date();
    follower.request_update_date = new Date();
    follower.user = targetUser;
    follower.userFollower = loggedInUser;
    await this.followerRepository.save(follower);
  }

  async acceptFollowRequest(followUserDto: FollowUserDto): Promise<void> {
    const { loggedInUserNickname, targetUserNickname } = followUserDto;
    const loggedInUser = await this.userRepository.findOne({
      where: { nickname: loggedInUserNickname },
    });
    const targetUser = await this.userRepository.findOne({
      where: { nickname: targetUserNickname },
    });
    if (!loggedInUser || !targetUser) {
      throw new BadRequestException('User not found');
    }
    const follower = await this.followerRepository.findOne({
      where: {
        user: { id: loggedInUser.id },
        userFollower: { id: targetUser.id },
      },
    });
    if (!follower) {
      throw new BadRequestException('Follow request not found');
    }
    follower.state = 'Accepted';
    await this.followerRepository.save(follower);
  }

  async rejectFollowRequest(followUserDto: FollowUserDto): Promise<void> {
    const { loggedInUserNickname, targetUserNickname } = followUserDto;
    const loggedInUser = await this.userRepository.findOne({
      where: { nickname: loggedInUserNickname },
    });
    const targetUser = await this.userRepository.findOne({
      where: { nickname: targetUserNickname },
    });
    if (!loggedInUser || !targetUser) {
      throw new BadRequestException('User not found');
    }
    const follower = await this.followerRepository.findOne({
      where: {
        user: { id: loggedInUser.id },
        userFollower: { id: targetUser.id },
      },
    });
    if (!follower) {
      throw new BadRequestException('Follow request not found');
    }
    follower.state = 'Rejected';
    await this.followerRepository.save(follower);
  }
}
