import { Team } from 'src/team/entity/team.entity';
import { Friendship } from 'src/friendship/entity/friendship.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Team, (team) => team.players)
  teams: Team[];

  @OneToMany(() => Friendship, (friendship) => friendship.userOne)
  userOne: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.userTwo)
  userTwo: Friendship[];

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;
}
