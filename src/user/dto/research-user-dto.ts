import { ApiProperty } from "@nestjs/swagger";

export class ResearchUserDto {
    @ApiProperty({
        description : "Id of the found user",
        format : "uuid"
    })
    id : string

    @ApiProperty({
        description : "Username of the found user"
    })
    username : string
}