import { OmitType } from "@nestjs/swagger";
import { Team } from "./team.model";
import { User } from "src/user/model/user.model";

export class UpdateTeamModel extends OmitType(Team, ["createdAt"] as const){}