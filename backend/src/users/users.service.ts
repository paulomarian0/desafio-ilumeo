import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const code = randomstring.generate(8);

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      code
    }

    const payload = await this.prisma.user.create({ data });

    return {
      ...payload,
      password: undefined,
    };
  }

  async findAll() {

    const payload = await this.prisma.user.findMany({});

    return payload;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    const payload = await this.prisma.user.findUnique({
      where: { email }
    })

    return payload;
  }

  async update(id: number, data: UpdateUserDto) {

    const payload = await this.prisma.user.update({
      where: {id},
      data
    })

    return payload;
  }

  async remove(id: number) {
  
    const payload = await this.prisma.user.delete({
      where: {id}
    })
  
    return payload;
  }

}
