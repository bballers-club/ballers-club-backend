import { Team } from 'src/team/model/team.model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 150 })
	username: string;

	@Column()
	email: string;

	@ManyToMany(() => Team, team => team.players)
	teams : Team[]

	@CreateDateColumn({type : "date"})
	createdAt : Date
}
