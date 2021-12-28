import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Global()
@Module({
    imports: [PrismaModule],
    controllers:[UserController],
    providers:[UserService,PrismaService],
    
})
export class UserModule {}
