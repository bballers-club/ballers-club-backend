import { Module } from '@nestjs/common';
import { EventTypeService } from './providers/services/event_type.service';
import { EventTypeController } from './event_type.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { eventTypeProvider } from './providers/event_type.provider';
import { EventTypeRepository } from './providers/repository/event_type.repository';

@Module({
  imports : [DatabaseModule],
  controllers: [EventTypeController],
  providers: [...eventTypeProvider,EventTypeService,EventTypeRepository]
})
export class EventTypeModule {}
