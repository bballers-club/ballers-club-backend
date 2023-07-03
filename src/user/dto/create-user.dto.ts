import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'UUID of the user to create',
		example: 'abfe96e7-b0cd-4eb4-893e-cb4df87c053e',
	})
	id: string;

	@ApiProperty({
		description: 'Username of the user to create',
		example: 'ShaqTheDiesel',
	})
	username: string;

	@ApiProperty({
		description: 'Url for the user avatar',
		example: 'https://i.imgur.com/1.png',
		nullable: true,
	})
	avatarUrl?: string;

	@ApiProperty({
		description: 'Level of the user',
		example: 'recreationnal',
	})
	level: string;

	@ApiProperty({
		description: 'Position of the user',
		example: 'PG',
	})
	position: string;

	@ApiProperty({
		description : 'Email of the user'
	})
	email ?: string
}
