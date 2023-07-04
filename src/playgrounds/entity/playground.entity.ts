import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Event } from 'src/event/entity/event.entity';

@Entity()
export class Playground {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(() => Event, event => event.playground)
	event : Event[]

	@Column({ length: 150 })
	name: string;

	@Column({
		nullable: false,
	})
	address: string;

	@Column({
		nullable: false,
	})
	city: string;

	@Column({
		nullable: false,
	})
	country: string;

	@Column({
		nullable: false,
	})
	zipcode: string;

	@Column({
		nullable : false,
		default : true
	})
	request_pending : boolean

	@Column({
		type: 'double precision',
	})
	latitude: number;

	@Column({
		type: 'double precision',
	})
	longitude: number;
}
