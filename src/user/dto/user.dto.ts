import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({
		description: 'UUID of the user',
		example: 'abfe96e7-b0cd-4eb4-893e-cb4df87c053e',
	})
	id: string;

	@ApiProperty({
		description: 'Username of the user',
		example: 'ShaqTheBigDiesel',
	})
	username: string;

	@ApiProperty({
		description: 'Total games played by the user',
		example: '45',
	})
	gamesPlayed: number;

	@ApiProperty({
		description: 'Lost games of the user',
		example: '25',
	})
	gamesLoss: number;

	@ApiProperty({
		description: 'Won games of the user',
		example: '20',
	})
	gamesWon: number;

	@ApiProperty({
		description: 'Date when the user created his account',
	})
	createdAt: Date;
}
