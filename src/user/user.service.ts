import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Prisma, User} from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/DTOs/UserDto';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    hashData(data:string):string{
        return bcrypt.hashSync(data, 10);
    }

    public async getAllUsers(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.UserWhereUniqueInput;
            where?: Prisma.UserWhereInput;
            orderBy?: Prisma.UserOrderByWithRelationInput;}
    ):Promise<User[]>{
        
    const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
          });
    }

    public async getUser(userWithUniqueInput: Prisma.UserWhereUniqueInput):Promise<User>{
       return await this.prisma.user.findUnique({where:userWithUniqueInput})
    }

    public async createUser(user:Prisma.UserCreateInput):Promise<User>{
        const hashedPass = await this.hashData(user.password)
        return await this.prisma.user.create({
           data:{
               password:hashedPass,
               firstName:user.firstName,
               lastName:user.lastName,
               username:user.username,
               email:user.email,
               birthDate:user.birthDate,
               joinedAt:user.joinedAt
               
           }
        }
        )
        
    }

    public async updateUser(params:{where : Prisma.UserWhereUniqueInput, data:Partial<UserDto>}):Promise<User>{
        const { where , data} = params 
        return await this.prisma.user.update({where, data})
    }

    public async deleteUser(where: Prisma.UserWhereUniqueInput):Promise<User>{
        return await this.prisma.user.delete({where})

    }

}