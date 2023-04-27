import { ApiProperty } from "@nestjs/swagger";

export class FriendshipDto {
    @ApiProperty({
        description : "Authenticated user id"
    })
    currentUserId : string;

    @ApiProperty({
        description : "Id of the friend of the authenticated user"
    })
    userFriendId : string;

    @ApiProperty({
        description : "Date when the friendship started"
    })
	createdAt : Date
}