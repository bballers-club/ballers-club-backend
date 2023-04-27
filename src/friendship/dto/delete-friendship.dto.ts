import { ApiProperty } from "@nestjs/swagger";

export class DeleteFriendshipDto {
    @ApiProperty({
        description : "Id of the authenticated user"
    })
    currentUserId : string

    @ApiProperty({
        description : "Id of the friend selected"
    })
    userFriendId : string
}