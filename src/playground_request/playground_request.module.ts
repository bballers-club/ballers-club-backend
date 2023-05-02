import { Module } from '@nestjs/common';
import { PlaygroundRequestService } from './providers/playground_request.service';
import { PlaygroundRequestController } from './playground_request.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { playgroundRequestProvider } from './providers/playground_request.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaygroundRequestController],
  providers: [...playgroundRequestProvider, PlaygroundRequestService],
})
export class PlaygroundRequestModule {}
