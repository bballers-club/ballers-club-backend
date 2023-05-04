import { ApiProperty } from '@nestjs/swagger';

export class PlayerInTeamDto {
	@ApiProperty({
		description: 'UUID of the user',
	})
	userId: string;

	@ApiProperty({
		description: 'UUID of the team',
	})
	teamId: string;
}
