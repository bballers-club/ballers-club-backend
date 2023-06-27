import { Match } from "src/match/entity/match.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class MatchParticipant {
    @PrimaryColumn("uuid")
    matchId : string;

    @PrimaryColumn("uuid")
    userId : string
    
    @Column()
    inTeamOne : boolean

    @Column()
    inTeamTwo: boolean

    @ManyToOne(() => Match, match => match.match_participant)
    match : Match[]

    @ManyToOne(() => User, user => user.match_participant)
    user : User[]
}
