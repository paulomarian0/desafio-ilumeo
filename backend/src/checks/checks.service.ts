import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';

@Injectable()
export class ChecksService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateCheckDto) {

    const payload = await this.prisma.check.create({
      data
    })

    return payload;
  }

  async findAll() {

    const payload = await this.prisma.check.findMany();

    return payload;
  }

  async update(id: number, updateCheckDto: UpdateCheckDto) {

    const payload = await this.prisma.check.update({
      where: { id },
      data: {
        ...updateCheckDto,
        isWorking: false
      }
    })

    return payload;
  }

  async remove(id: number) {
    const payload = await this.prisma.check.delete({
      where: { id }
    })

    return payload;
  }
}
