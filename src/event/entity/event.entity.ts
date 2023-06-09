import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from '../../user/entity/user.entity';
import { EventType } from "src/event_type/entity/event_type.entity";
import { Match } from "src/match/entity/match.entity";
import { EventParticipant } from "src/event_participant/entity/event_participant.entity";
import { Playground } from "src/playgrounds/entity/playground.entity";
import { EventInvitation } from "src/event_invitation/entity/event_invitation.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    organizerId : string

    @Column({
        nullable : true
    })
    playgroundId : string

    @Column({
        nullable : false
    })
    typeId : string

    @ManyToOne(() => User, user => user.event, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
    organizer : User

    @ManyToOne(() => EventType, event_type => event_type.event, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
    type : EventType

    @OneToMany(() => Match, match => match.event)
    match : Match[]

    @OneToMany(() => EventParticipant, event_participant => event_participant.event)
    event_participant : EventParticipant[]
    
    @ManyToOne(() => Playground, playground => playground.event)
    playground : Playground

    @Column()
    eventName : string

	@CreateDateColumn({ type: 'date' })
	createdAt: Date;

    @Column({
        type : 'timestamp with time zone',
        nullable : true,
        default : "now()"
    })
    starting_date ?: Date

    @Column({
        type : 'date',
        nullable : true
    })
    ending_date ?: Date

    @Column({
        enum : [1,2,3] //1 : Ouvert | 2 : En cours | 3 : Terminé 
    })
    state : number

    @OneToMany(() => EventInvitation, (event_invitation) => event_invitation.event)
    event_invitation : EventInvitation[]
}