import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NotificationsHistory {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    content : string;

    @Column('uuid')
    senderId : string

    @ManyToOne(() => User, user => user.notifications)
    sender : User

    @CreateDateColumn({
        type: 'timestamptz'
    })
    sentAt : Date
}