import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlaygroundDto {

    @ApiProperty({
        description : "Name of the playground",
        nullable : true
    })
	name ?: string;

    @ApiProperty({
        description : "Address of the playground",
        nullable : true
    })
	address ?: string;

    @ApiProperty({
        description : "Latitude of the playground",
        nullable : true
    })
    latitude ?: number

    @ApiProperty({
        description : "Longitude of the playground",
        nullable : true
    })
    longitude ?: number
}