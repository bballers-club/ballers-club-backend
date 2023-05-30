import { ApiProperty } from "@nestjs/swagger";

export class CreateEventTypeDto {
    @ApiProperty({
        description : "Name of the type"
    })
    name : string
}