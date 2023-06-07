import { ApiProperty } from "@nestjs/swagger";

export class MatchParticipantDto {
    @ApiProperty({
        description : "Id of the match"
    })
    matchId : string

    @ApiProperty({
        description : "Id of the user that participates to the match"
    })
    userId : string
}