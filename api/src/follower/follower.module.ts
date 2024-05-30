import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { Follower } from './entities/follower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService],
  imports: [TypeOrmModule.forFeature([Follower]),TypeOrmModule.forFeature([User])],

})
export class FollowerModule {}
