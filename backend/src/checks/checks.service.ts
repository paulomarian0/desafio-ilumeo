import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import * as dayjs from 'dayjs';
import { QueryParamsCheckDto } from './dto/query-params-check.dto';

@Injectable()
export class ChecksService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateCheckDto) {

    const entryDay = dayjs(data.entryTime).toDate()

    const alreadyCheckedToday = await this.prisma.check.findFirst({
      where: {
        entryTime: {
          equals: entryDay
        }
      }
    })

    if (alreadyCheckedToday)
      return "You already check in today!"

    const payload = await this.prisma.check.create({
      data
    })

    return payload;
  }

  async findAll(query: QueryParamsCheckDto) {

    const payload = await this.prisma.check.findMany({
      where: query,
      orderBy: {
        departureTime: 'desc'
      }
    });

    return payload;
  }

  async update(id: number, updateCheckDto: UpdateCheckDto) {

    const { entryTime } = await this.prisma.check.findFirst({
      where: { id },
      select: {
        entryTime: true
      }
    })

    const departureTime = dayjs(updateCheckDto.departureTime)

    // the worked time is the difference in miliseconds from the entryTime to departureTime
    const duration = dayjs(departureTime).diff(dayjs(entryTime), 'seconds')

    const time = new Date(1970, 0, 1); //the initial time is 01 Jan 1970

    time.setSeconds(duration);

    const workedHours = dayjs(time).subtract(3, 'hours').toDate()

    const payload = await this.prisma.check.update({
      where: { id },
      data: {
        ...updateCheckDto,
        isWorking: false,
        workedHours
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
