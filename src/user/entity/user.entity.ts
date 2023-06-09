import { Team } from 'src/team/entity/team.entity';
import { Friendship } from 'src/friendship/entity/friendship.entity';
import {
	Entity,
	Column,
	CreateDateColumn,
	ManyToMany,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { Event } from 'src/event/entity/event.entity';
import { EventParticipant } from 'src/event_participant/entity/event_participant.entity';
import { MatchParticipant } from 'src/match_participant/entities/match_participant.entity';
import { NotificationsHistory } from 'src/notifications_history/entity/notifications_history.entity';
import { EventInvitation } from 'src/event_invitation/entity/event_invitation.entity';


@Entity()
export class User {
	@PrimaryColumn('uuid', {
		unique: true,
	})
	id: string;

	@Column({ length: 150 })
	username: string;

	@Column({
		default: '00',
	})
	rank: number;

	@Column({
		default: 0,
	})
	gamesPlayed: number;

	@Column({
		default: 0,
	})
	gamesWon: number;

	@Column({
		default: 0,
	})
	gamesLost: number;

	@Column({
		nullable: true,
	})
	avatarUrl?: string;

	@Column({
		nullable: true,
	})
	level: string;

	@Column({
		nullable: true,
	})
	position: string;

	@Column({
		default : "user"
	})
	role : string;

	@Column({
		default : false
	})
	is_banned : Boolean

	@Column({
		nullable : true,
		type : 'timestamptz'
	})
	banned_until : Date;

	@Column({
		nullable : true
	})
	email : string;

	@ManyToMany(() => Team, (team) => team.players)
	teams: Team[];

	@OneToMany(() => Friendship, (friendship) => friendship.userOne)
	userOne: Friendship[];

	@OneToMany(() => Friendship, (friendship) => friendship.userTwo)
	userTwo: Friendship[];

	@OneToMany(() => Event, (event) => event.organizer)
	event: Event[]

	@OneToMany(() => EventParticipant, (event_participant) => event_participant.user)
	event_participant : EventParticipant[]

	@OneToMany(() => MatchParticipant, (match_participant) => match_participant.user)
	match_participant : MatchParticipant[]

	@OneToMany(() => NotificationsHistory , (notifications) => notifications.sender)
	notifications : NotificationsHistory[]

	@OneToMany(() => EventInvitation, (event_invitation) => event_invitation.inviter)
	event_invitation_inviter : EventInvitation[]

	@OneToMany(() => EventInvitation, (event_invitation) => event_invitation.invitedUser)
	event_invitation_invitedUser : EventInvitation[]

	@CreateDateColumn({ type: 'date' })
	createdAt: Date;
}
