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
		type: BigInt,
	})
	zipcode: number;

	@ApiProperty({
		type: Number,
	})
	latitude: number;

	@ApiProperty({
		type: Number,
	})
	longitude: number;
}
