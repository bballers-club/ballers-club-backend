import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Playground {
	@PrimaryGeneratedColumn('uuid')
	id: string;

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
		type: 'double precision',
	})
	latitude: number;

	@Column({
		type: 'double precision',
	})
	longitude: number;
}
