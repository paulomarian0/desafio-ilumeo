import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { QueryParamsCheckDto } from './dto/query-params-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';

@Controller('checks')
export class ChecksController {
  constructor(private readonly checksService: ChecksService) {}

  @Post()
  create(@Body() createCheckDto: CreateCheckDto) {
    return this.checksService.create(createCheckDto);
  }

  @Get()
  findAll(@Query() query: QueryParamsCheckDto) {
    return this.checksService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateCheckDto) {
    return this.checksService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.checksService.remove(+id);
  }
}
