import { Module } from '@nestjs/common';
import { MatchParticipantController } from './match_participant.controller';
import { MatchParticipantService } from './providers/services/match_participant.service';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { matchParticipantProvider } from './providers/match_participant.providers';
import { MatchParticipantRepository } from './providers/repository/match_participant.repository';

@Module({
  imports : [DatabaseModule],
  controllers: [MatchParticipantController],
  providers: [...matchParticipantProvider,MatchParticipantService,MatchParticipantRepository]
})
export class MatchParticipantModule {}
