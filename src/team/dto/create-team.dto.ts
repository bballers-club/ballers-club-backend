import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';

export class CreateTeamDto {
	@ApiProperty({
		description: 'Name of the team',
	})
	name: string;

	@ApiPropertyOptional({
		description: 'List of users that are in the team',
	})
	players?: User[];
}
