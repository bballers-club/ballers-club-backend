import { User } from "src/user/entity/user.entity"
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"

@Entity()
export class PlaygroundRequest {

    @PrimaryGeneratedColumn("uuid")
    id : string

    @ManyToOne(() => User, user => user.id)
    user : User

    @Column()
    name : string;

    @Column()
    address : string;

    @Column({
        type : "double precision"
    })
    latitude : number;

    @Column({
        type : "double precision"
    })
    longitude : number
}
