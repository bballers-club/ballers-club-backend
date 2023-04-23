import { User } from "src/user/entity/user.entity";

export class CreateTeamDto {

    name: string;
    players ?: User[];

}