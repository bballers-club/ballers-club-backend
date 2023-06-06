import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entity/event.entity";

@Entity()
export class Match {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @PrimaryColumn("uuid")
    eventId : string;

    @ManyToOne(() => Event, event => event.id)
    event : Event

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