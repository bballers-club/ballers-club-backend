import { Team } from 'src/team/model/team.model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
	@ApiProperty({
		description : "UUID of the user"
	})
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ApiProperty({
		description : "Username of the user",
		maximum : 150
	})
	@Column({ length: 150 })
	username: string;

	@ApiProperty({
		description : "E-mail of the user"
	})
	@Column()
	email: string;

	@ManyToMany(() => Team, team => team.players)
	teams : Team[]

	@CreateDateColumn({type : "date"})
	createdAt : Date
}
