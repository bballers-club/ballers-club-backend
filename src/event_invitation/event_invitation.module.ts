import { Module } from '@nestjs/common';
import { EventInvitationService } from './providers/services/event_invitation.service';
import { EventInvitationController } from './event_invitation.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { EventParticipantModule } from 'src/event_participant/event_participant.module';
import { EventInvitationRepository } from './providers/repositories/event_invitation.repository';
import { eventInvitationProvider } from './providers/event_invitation.provider';

@Module({
  imports : [DatabaseModule, EventParticipantModule],
  controllers: [EventInvitationController],
  providers: [...eventInvitationProvider,EventInvitationService, EventInvitationRepository]
})
export class EventInvitationModule {}
