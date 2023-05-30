import { ApiProperty } from '@nestjs/swagger';

export class PlaygroundRequestDto {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	id: string;

	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	userId: string;

	@ApiProperty({
		type: 'string',
	})
	name: string;

	@ApiProperty({
		type: 'string',
	})
	address: string;

	@ApiProperty({
		description: 'City where the playground is located',
		type: String,
	})
	city: string;

	@ApiProperty({
		description: 'Country where the playground is located',
		type: String,
	})
	country: string;

	@ApiProperty({
		description: 'Zipcode of the city',
		type: String,
	})
	zipcode: string;

	@ApiProperty({
		type: 'double',
	})
	latitude: number;

	@ApiProperty({
		type: 'double',
	})
	longitude: number;
}
