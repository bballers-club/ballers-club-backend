import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './supabase_database/supabase_database.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { PlaygroundsModule } from './playgrounds/playgrounds.module';
import { FriendshipModule } from './friendship/friendship.module';
import { PlaygroundRequestModule } from './playground_request/playground_request.module';
import { FriendshipRequestModule } from './friendship_request/friendship_request.module';
import { UserFavoritePlaygroundModule } from './user-favorite-playground/user-favorite-playground.module';
import { EventModule } from './event/event.module';
import { EventTypeModule } from './event_type/event_type.module';
import { MatchModule } from './match/match.module';
import { EventParticipantModule } from './event_participant/event_participant.module';
import { MatchParticipantModule } from './match_participant/match_participant.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NotificationsHistoryModule } from './notifications_history/notifications_history.module';
import { EventInvitationModule } from './event_invitation/event_invitation.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath : join(__dirname,'..','landing'),
			exclude: ['/api/(.*)']
		}),
		DatabaseModule,
		UserModule,
		TeamModule,
		AuthModule,
		PlaygroundsModule,
		FriendshipModule,
		PlaygroundRequestModule,
		FriendshipRequestModule,
		UserFavoritePlaygroundModule,
		EventModule,
		EventTypeModule,
		MatchModule,
		EventParticipantModule,
		MatchParticipantModule,
		NotificationsHistoryModule,
		EventInvitationModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
