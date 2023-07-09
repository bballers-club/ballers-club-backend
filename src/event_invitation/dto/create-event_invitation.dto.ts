import { ApiProperty } from "@nestjs/swagger"

export class CreateEventInvitationDto {

    @ApiProperty({
        description: "Event where the user will be invited"
    })
    eventId : string

    @ApiProperty({
        description: "Id of the user that invited"
    })
    inviterId : string

    @ApiProperty({
        description: "Id of the user that has been invited"
    })
    invitedUserId : string
}
