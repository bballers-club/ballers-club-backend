import { ApiProperty } from "@nestjs/swagger";

export class EventParticipantDto{
    @ApiProperty({
        description : "Id of the event"
    })
    eventId : string;

    @ApiProperty({
        description : "Id of the user participating to the event"
    })
    userId : string
}