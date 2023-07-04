import { Playground } from "src/playgrounds/entity/playground.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class UserFavoritePlayground {

    @PrimaryColumn("uuid")
    userId : string

    @PrimaryColumn("uuid")
    playgroundId : string

    @ManyToOne(() => User, user => user.id, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user : User

    @ManyToOne(() => Playground, playground => playground.id, {
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
    })
    playground : Playground

}
