import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],
  providers: [AuthService,UserService,PrismaService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
  
 
})
export class AuthModule {}
