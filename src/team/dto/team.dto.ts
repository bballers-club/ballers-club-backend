import { User } from "src/user/entity/user.entity";

export class TeamDto {

    id: string;
    name: string;
    createdAt : Date;
    players: User[];
    
}