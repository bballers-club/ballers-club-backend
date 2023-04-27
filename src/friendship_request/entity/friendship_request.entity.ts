import { Entity, ManyToOne, CreateDateColumn, PrimaryColumn } from "typeorm";
import { User } from '../../user/entity/user.entity';

@Entity()
export class FriendshipRequest {

    @PrimaryColumn("uuid")
    requestSenderId : string;

    @PrimaryColumn("uuid")
    requestReceiverId : string;

    @ManyToOne(() => User, user => user.currentUser)
    requestSender : User

    @ManyToOne(() => User, user => user.userFriend)
    requestReceiver : User

    @CreateDateColumn({
        type : "date"
    })
    createdAt : Date

}
