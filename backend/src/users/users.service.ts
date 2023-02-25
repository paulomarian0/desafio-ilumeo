import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as randomstring from 'randomstring';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const code = randomstring.generate(8);

    const payload = await this.prisma.user.create({

      data: {
        ...createUserDto,
        code
      }

    })

    return payload;
  }

  async findAll() {

    const payload = await this.prisma.user.findMany();

    return payload;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

 async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
