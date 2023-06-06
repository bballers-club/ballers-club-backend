import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "src/event/entity/event.entity";
import { User } from "src/user/entity/user.entity";

@Entity()
export class EventParticipant {
    @PrimaryColumn("uuid")
    eventId : string

    @ManyToOne(() => Event, event => event.id)
    event : Event

    @PrimaryColumn("uuid")
    userId : string

    @ManyToOne(() => User, user => user.event_participant)
    user : User
}
