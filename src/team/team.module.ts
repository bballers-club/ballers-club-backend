import { Module } from '@nestjs/common';
import { TeamService } from './providers/team.service';
import { TeamController } from './team.controller';
import { DatabaseModule } from '../supabase_database/supabase_database.module';
import { teamProvider } from './providers/team.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamController],
  providers: [...teamProvider, TeamService],
})
export class TeamModule {}
