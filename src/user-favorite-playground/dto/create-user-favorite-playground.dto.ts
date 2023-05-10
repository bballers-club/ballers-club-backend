import { ApiProperty } from "@nestjs/swagger";


export class CreateUserFavoritePlaygroundDto {
    @ApiProperty({
        description: "Id of the user",
        format : "uuid"
    })
    userId : string

    @ApiProperty({
        description : "Id of the playground",
        format : "uuid"
    })
    playgroundId : string
}
