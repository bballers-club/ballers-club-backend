import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'Username of the user to create',
		example: 'ShaqTheDiesel',
	})
	username: string;
}
