import { Module } from '@nestjs/common';
import { PlaygroundRequestService } from './providers/playground_request.service';
import { PlaygroundRequestController } from './playground_request.controller';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { playgroundRequestProvider } from './providers/playground_request.provider';
import { PlaygroundsService } from '../playgrounds/providers/playgrounds.service';
import { playgroundProvider } from '../playgrounds/providers/playground.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [PlaygroundRequestController],
	providers: [
		...playgroundProvider,
		...playgroundRequestProvider,
		PlaygroundRequestService,
		PlaygroundsService,
	],
})
export class PlaygroundRequestModule {}
