import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { matchProvider } from './providers/match.provider';
import { MatchRepository } from './providers/repository/match.repository';

@Module({
  imports : [DatabaseModule],
  controllers: [MatchController],
  providers: [...matchProvider,MatchService, MatchRepository]
})
export class MatchModule {}
