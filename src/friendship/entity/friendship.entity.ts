import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Friendship {
	@PrimaryColumn('uuid')
	userOneId: string;

	@PrimaryColumn('uuid')
	userTwoId: string;

	@ManyToOne(() => User, (user) => user.userOne, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
	userOne: User;

	@ManyToOne(() => User, (user) => user.userTwo, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
	userTwo: User;

	@CreateDateColumn({ type: 'date' })
	createdAt: Date;
}
