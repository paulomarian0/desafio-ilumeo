import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt';
import { QueryParamsUserDto } from './dto/query-params-user.dto';

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

  async findAll(params: QueryParamsUserDto) {

    if (params.id) {
      params.id = +params.id
    }

    const payload = await this.prisma.user.findMany({
      where: params,
      include: {
        checks: true
      }
    });

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
      where: { id },
      data
    })

    return payload;
  }

  async remove(id: number) {

    const payload = await this.prisma.user.delete({
      where: { id }
    })

    return payload;
  }

}
