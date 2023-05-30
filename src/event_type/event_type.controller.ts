import { Controller } from '@nestjs/common';
import { EventTypeService } from './event_type.service';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}
}
