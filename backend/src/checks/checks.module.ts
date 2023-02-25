import { Module } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { ChecksController } from './checks.controller';

@Module({
  controllers: [ChecksController],
  providers: [ChecksService]
})
export class ChecksModule {}
