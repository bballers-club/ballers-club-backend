import { ApiProperty } from "@nestjs/swagger";

export class OneFriendshipRequestDto  {

    @ApiProperty({
        description : "Id of the sender",
        format : "uuid"
    })
    requestSenderId : string


    @ApiProperty({
        description : "Id of the receiver",
        format : "uuid"
    })
    requestReceiverId : string


    @ApiProperty({
        description : "Username of the sender",
        format : "string"
    })
    requesterUsername : string

}