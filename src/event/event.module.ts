import { Module } from '@nestjs/common';
import { EventService } from './providers/services/event.service';
import { EventController } from './event.controller';
import { eventProvider } from './providers/event.provider';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { EventRepository } from './providers/repository/event.repository';
import { EventParticipantModule } from 'src/event_participant/event_participant.module';

@Module({
  imports: [DatabaseModule, EventParticipantModule],
  controllers: [EventController],
  providers: [...eventProvider,EventService, EventRepository]
})
export class EventModule {}
