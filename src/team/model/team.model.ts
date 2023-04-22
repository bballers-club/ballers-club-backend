import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, } from 'typeorm';
import { User } from "../../user/model/user.model"
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Team {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column({ length: 150 })
    name: string;

    @ApiProperty()
    @ManyToMany((type) => User, user => user.teams ,{cascade: ["insert"] })
    @JoinTable({})
    players: User[];

    @ApiProperty()
    @CreateDateColumn({type : "date"})
    createdAt : Date
}
