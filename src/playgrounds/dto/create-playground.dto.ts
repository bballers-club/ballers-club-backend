import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaygroundDto {
    @ApiProperty({
        description : "Name of the playground"
    })
    name : string;

    @ApiProperty({
        description : "Address of the playground"
    })
	address : string;

    @ApiProperty({
        description : "Latitude of the playground"
    })
    latitude : number

    @ApiProperty({
        description : "Longitude of the playground"
    })
    longitude : number
}