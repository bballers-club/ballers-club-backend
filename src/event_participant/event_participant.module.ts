import { Module } from '@nestjs/common';
import { EventParticipantService } from './providers/services/event_participant.service';
import { EventParticipantController } from './event_participant.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { EventParticipantRepository } from './providers/repositories/event_participant.repository';
import { eventParticipantProvider } from './providers/event_participant.provider';

@Module({
  imports : [DatabaseModule],
  controllers: [EventParticipantController],
  providers: [...eventParticipantProvider,EventParticipantService, EventParticipantRepository]
})
export class EventParticipantModule {}
