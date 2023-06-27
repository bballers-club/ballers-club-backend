import { Module } from '@nestjs/common';
import { MatchService } from './providers/services/match.service';
import { MatchController } from './match.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { matchProvider } from './providers/match.provider';
import { MatchRepository } from './providers/repository/match.repository';
import { MatchParticipantModule } from 'src/match_participant/match_participant.module';

@Module({
  imports : [DatabaseModule, MatchParticipantModule],
  controllers: [MatchController],
  providers: [...matchProvider,MatchService, MatchRepository]
})
export class MatchModule {}
