import { Entity, ManyToOne, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class FriendshipRequest {
  @PrimaryColumn('uuid')
  requestSenderId: string;

  @PrimaryColumn('uuid')
  requestReceiverId: string;

  @ManyToOne(() => User, (user) => user.userOne)
  requestSender: User;

  @ManyToOne(() => User, (user) => user.userTwo)
  requestReceiver: User;

  @CreateDateColumn({
    type: 'date',
  })
  createdAt: Date;
}
