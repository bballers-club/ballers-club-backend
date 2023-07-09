import { DataSource } from 'typeorm';
import { EVENT_INVITATION_REPOSITORY } from './event_invitation.constants';
import { EventInvitation } from '../entity/event_invitation.entity';


export const eventInvitationProvider = [
	{
		provide: EVENT_INVITATION_REPOSITORY,
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(EventInvitation),
		inject: ['DATA_SOURCE'],
	},
];
