import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entity/event.entity";
import { MatchParticipant } from "src/match_participant/entities/match_participant.entity";

@Entity()
export class Match {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("uuid")
    eventId : string;

    @ManyToOne(() => Event, event => event.id)
    event : Event

    @OneToMany(() => MatchParticipant, match_participant => match_participant.match)
    match_participant : MatchParticipant

    @Column({
        default : 0
    })
    teamOnePoint : number;

    @Column({
        default : 0
    })
    teamTwoPoint : number;

    @Column({
        enum : [1,2],
        nullable : true
    })
    winningTeam : number;
}