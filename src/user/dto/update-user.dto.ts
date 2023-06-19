import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiProperty({
		description: 'User id',
		nullable: false
	})
	id : string

	@ApiProperty({
		description: 'Username of the user to update',
		nullable: true,
	})
	username?: string;

	@ApiProperty({
		description: 'Avatar of the user',
		nullable: true,
	})
	avatarUrl?: string;

	@ApiProperty({
		description : 'Email of the user',
		nullable: true
	})
	email ?: string

	@ApiProperty({
		description: 'Level of the user',
		nullable: true,
	})
	level?: string;

	@ApiProperty({
		description: 'Position mostly played by the user',
		nullable: true,
	})
	position?: string;
}
