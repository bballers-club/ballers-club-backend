import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendshipDto {

    @ApiProperty({
        description : "Authenticated user id"
    })
    currentUserId : string;

    @ApiProperty({
        description : "Id of the friend of the authenticated user"
    })
    userFriendId : string;
}