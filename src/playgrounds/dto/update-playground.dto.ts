import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaygroundDto {
	@ApiProperty({
		description: 'Name of the playground',
		nullable: true,
	})
	name?: string;

	@ApiProperty({
		description: 'Address of the playground',
		nullable: true,
	})
	address?: string;

	@ApiProperty({
		description: 'City where the playground is located',
	})
	city?: string;

	@ApiProperty({
		description: 'Country where the playground is located',
	})
	country?: string;

	@ApiProperty({
		description: 'Zipcode of the city',
	})
	zipcode?: string;

	@ApiProperty({
		description: 'Latitude of the playground',
		nullable: true,
	})
	latitude?: number;

	@ApiProperty({
		description: 'Longitude of the playground',
		nullable: true,
	})
	longitude?: number;
}
