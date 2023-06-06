import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entity/user.entity';
import { EventType } from "src/event_type/entity/event_type.entity";
import { Match } from "src/match/entity/match.entity";
import { EventParticipant } from "src/event_participant/entity/event_participant.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    organizerId : string

    @ManyToOne(() => User, user => user.event)
    organizer : User

    @ManyToOne(() => EventType, event_type => event_type.event)
    type : EventType

    @OneToMany(() => Match, match => match.event)
    match : Match[]

    @OneToMany(() => EventParticipant, event_participant => event_participant.event)
    event_participant : EventParticipant[]

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