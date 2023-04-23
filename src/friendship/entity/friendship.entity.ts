import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Friendship {

    @PrimaryColumn("uuid")
    currentUserId : string;

    @PrimaryColumn("uuid")
    userFriendId : string;
    
    @ManyToOne(() => User, user => user.currentUser)
    currentUser : User;

    @ManyToOne(() => User, user => user.userFriend)
    userFriend : User;

    @CreateDateColumn({type : "date"})
	createdAt : Date

}