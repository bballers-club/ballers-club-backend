import { ApiProperty } from "@nestjs/swagger";

export class EventDto {
    @ApiProperty({
        description : "Event id",
        format : "uuid"
    })
    id : string

    @ApiProperty({
        description : "Id of the user who created the event"
    })
    organizerId : string

    @ApiProperty({
        description : "Playground id where the event will take place",
        nullable : true
    })
    playgroundId ?: string

    @ApiProperty({
        description : "Date when the event has been created"
    })
    createdAt : Date

    @ApiProperty({
        description : "Name of the event"
    })
    eventName : string

    @ApiProperty({
        description : "State of the event"
    })
    state : number

    @ApiProperty({
        description : "Date when the event will start",
        nullable : true
    })
    starting_date : Date

    @ApiProperty({
        description : "Date whe the event will normally end",
        nullable : true
    })
    ending_date : Date

    @ApiProperty({
        description: "Time when the event starts",
        nullable : true
    })
    eventTime ?: Date

    @ApiProperty({
        description : "Event type"
    })
    typeId : string
}