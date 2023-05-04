import { User } from '../../user/entity/user.entity';

export class UpdateTeamDto {
	name?: string;
	players?: User[];
}
