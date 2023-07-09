import { Event } from "src/event/entity/event.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventInvitation {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    eventId : string

    @ManyToOne(() => Event, event => event.id)
    event : Event

    @Column()
    inviterId : string

    @ManyToOne(() => User, user => user.event_invitation_inviter)
    inviter : User

    @Column()
    invitedUserId : string

    @ManyToOne(() => User, user => user.event_invitation_invitedUser)
    invitedUser : User
}
