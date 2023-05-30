import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class PlaygroundRequest {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('uuid')
	userId: string;

	@ManyToOne(() => User, (user) => user.id, {
		nullable: false,
		cascade: ['insert'],
	})
	user: User;

	@Column()
	name: string;

	@Column()
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
