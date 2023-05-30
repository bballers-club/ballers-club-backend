import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entity/user.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @PrimaryColumn("uuid")
    organizerId : string

    @OneToMany(() => User, user => user.id)
    organizer : User

    @Column()
    eventName : string

	@CreateDateColumn({ type: 'date' })
	createdAt: Date;

    @Column({
        type : 'date',
        nullable : true,
        default : "now()"
    })
    starting_date : Date

    @Column({
        type : 'date',
        nullable : true
        
    })
    ending_date : 'date'

    @Column({
        enum : [1,2,3]
    })
    state : number
}