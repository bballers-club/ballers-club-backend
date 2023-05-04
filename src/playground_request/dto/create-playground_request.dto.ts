import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaygroundRequestDto {
	@ApiProperty({
		type: String,
		format: 'uuid',
	})
	userId: string;

	@ApiProperty({
		type: String,
	})
	name: string;

	@ApiProperty({
		type: String,
	})
	address: string;

	@ApiProperty({
		type: Number,
	})
	latitude: number;

	@ApiProperty({
		type: Number,
	})
	longitude: number;
}
