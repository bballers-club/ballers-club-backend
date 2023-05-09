import { ApiProperty } from '@nestjs/swagger';
export class OneUserFriendshipDTO {
	@ApiProperty({
		description: 'Id of the friend',
	})
	userId: string;

	@ApiProperty({
		description: 'Username of the friend',
	})
	username: string;

	@ApiProperty({
		description: 'URL of the friend profile picture',
	})
	avatarUrl?: string;

	@ApiProperty({
		description: 'Games won of the friend',
	})
	gamesWon: number;

	@ApiProperty({
		description: 'Games lost of the friend',
	})
	gamesLost: number;

	@ApiProperty({
		description: 'Total games of the friend',
	})
	totalGames: number;
}
