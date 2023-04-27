import { ApiProperty } from "@nestjs/swagger";

export class FriendshipRequestDto {
    @ApiProperty({
        description : "User that sent the request uuid"
    })
    requestSenderId : string;

    @ApiProperty({
        description : "User that received the request uuid"
    })
    requestReceiverId : string;

    @ApiProperty({
        description : "Date when the entry has been created, shouldn't provide it, auto generated when inserted",
        nullable : true
    })
    createdAt : Date
}