import { ApiProperty } from "@nestjs/swagger"
import { Timestamp } from "rxjs"
import { MatchDto } from "src/match/dto/match.dto"

export class EventBackofficeDto {
    @ApiProperty({
        description : "Event id",
        format : "uuid"
    })
    id : string

    @ApiProperty({
        description : "Id of the user who created the event"
    })
    organizer : string

    @ApiProperty({
        description : "State of the event"
    })
    state : number

    @ApiProperty({
        description : "Playground id where the event will take place",
        nullable : true
    })
    playground ?: string
    

    @ApiProperty({
        description : "Date when the event has been created"
    })
    createdAt : Date

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
        description : "Name of the event"
    })
    eventName : string

    @ApiProperty({
        description : "Event type"
    })
    type : string

    @ApiProperty({
        description : "List of match related to the event",
        nullable : true
    })
    matches ?: MatchDto[]
}