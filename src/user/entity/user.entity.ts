import { Team } from 'src/team/entity/team.entity';
import { Friendship } from 'src/friendship/entity/friendship.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToMany,
	OneToMany,
	PrimaryColumn,
	ManyToOne,
} from 'typeorm';
import { Event } from 'src/event/entity/event.entity';

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

	@ManyToMany(() => Team, (team) => team.players)
	teams: Team[];

	@OneToMany(() => Friendship, (friendship) => friendship.userOne)
	userOne: Friendship[];

	@OneToMany(() => Friendship, (friendship) => friendship.userTwo)
	userTwo: Friendship[];

	@OneToMany(() => Event, (event) => event.organizer)
	event: Event[]

	@CreateDateColumn({ type: 'date' })
	createdAt: Date;
}
