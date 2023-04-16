import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './supabase_database/supabase_database.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [DatabaseModule, UserModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
