import { ApiProperty } from "@nestjs/swagger";

export class UpdateEventDto
{
    @ApiProperty({
        description : "Id of the event"
    })
    id : string
    
    @ApiProperty({
        description : "Id of the user who created the event"
    })
    organizerId ?: string

    @ApiProperty({
        description : "Playground id where the event will take place"
    })
    playgroundId ?: string

    @ApiProperty({
        description : "State of the event"
    })
    state : number

    @ApiProperty({
        description : "Name of the event"
    })
    eventName ?: string

    @ApiProperty({
        description : "Date when the event will start",
        nullable : true
    })
    starting_date ?: Date

    @ApiProperty({
        description : "Date whe the event will normally end",
        nullable : true
    })
    ending_date ?: Date

    @ApiProperty({
        description: "Time when the event start",
        nullable : true
    })
    eventTime ?: Date

    @ApiProperty({
        description : "Event type"
    })
    typeId : string
}