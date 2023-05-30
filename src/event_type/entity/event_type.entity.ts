import { Event } from "src/event/entity/event.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventType {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    name : string

    @OneToMany(() => Event, event => event.type)
    event : Event[]
}