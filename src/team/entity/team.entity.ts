import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, } from 'typeorm';
import { User } from "../../user/entity/user.entity"


@Entity()
export class Team {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 150 })
    name: string;

    @ManyToMany((type) => User, user => user.teams ,{cascade: ["insert"] })
    @JoinTable({})
    players: User[];

    @CreateDateColumn({type : "date"})
    createdAt : Date
}
