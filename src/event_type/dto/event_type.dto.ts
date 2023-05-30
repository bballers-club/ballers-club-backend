import { ApiProperty } from '@nestjs/swagger';
export class EventTypeDto {
    @ApiProperty({
        description : "Id of the type"
    })
    id : string

    @ApiProperty({
        description : "Name of the type"
    })
    name : string
}