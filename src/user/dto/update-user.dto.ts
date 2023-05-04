import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiProperty({
		description: 'Username of the user to update',
		nullable: true,
	})
	username?: string;
}
