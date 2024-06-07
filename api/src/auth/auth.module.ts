import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { Follower } from 'src/follower/entities/follower.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Follower])],
})
export class AuthModule { }
