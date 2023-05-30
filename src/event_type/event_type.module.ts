import { Module } from '@nestjs/common';
import { EventTypeService } from './event_type.service';
import { EventTypeController } from './event_type.controller';

@Module({
  controllers: [EventTypeController],
  providers: [EventTypeService]
})
export class EventTypeModule {}
