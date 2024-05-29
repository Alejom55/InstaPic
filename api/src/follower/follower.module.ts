import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { Follower } from './entities/follower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService],
  imports: [TypeOrmModule.forFeature([Follower])],

})
export class FollowerModule {}
