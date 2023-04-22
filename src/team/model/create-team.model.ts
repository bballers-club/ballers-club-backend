import { OmitType } from "@nestjs/swagger";
import { Team } from "./team.model";
import { User } from "src/user/model/user.model";

export class CreateTeamModel extends OmitType(Team, ["id","createdAt"]){
    name : string
    players : [User]
}