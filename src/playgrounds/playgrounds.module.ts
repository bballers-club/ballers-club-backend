import { Module } from '@nestjs/common';
import { PlaygroundsService } from './providers/playgrounds.service';
import { PlaygroundsController } from './playgrounds.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';

@Module({
  imports : [DatabaseModule],
  controllers: [PlaygroundsController],
  providers: [PlaygroundsService]
})
export class PlaygroundsModule {}
