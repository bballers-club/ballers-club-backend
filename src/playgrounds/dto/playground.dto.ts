import { ApiProperty } from '@nestjs/swagger';

export class PlaygroundDto {
	@ApiProperty({
		description: 'UUID of the playground',
	})
	id: string;

	@ApiProperty({
		description: 'Name of the playground',
	})
	name: string;

	@ApiProperty({
		description: 'Address of the playground',
	})
	address: string;

	@ApiProperty({
		description: 'City where the playground is located',
	})
	city: string;

	@ApiProperty({
		description: 'Country where the playground is located',
	})
	country: string;

	@ApiProperty({
		description: 'Zipcode of the city',
	})
	zipcode: number;

	@ApiProperty({
		description: 'Latitude of the playground',
	})
	latitude: number;

	@ApiProperty({
		description: 'Longitude of the playground',
	})
	longitude: number;
}
