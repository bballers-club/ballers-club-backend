import { Module } from '@nestjs/common';
import { PlaygroundsService } from './providers/playgrounds.service';
import { PlaygroundsController } from './playgrounds.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { playgroundProvider } from './providers/playground.provider';

@Module({
  imports : [DatabaseModule],
  controllers: [PlaygroundsController],
  providers: [...playgroundProvider,PlaygroundsService]
})
export class PlaygroundsModule {}
