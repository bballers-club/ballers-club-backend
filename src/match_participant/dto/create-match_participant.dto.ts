import { ApiProperty } from "@nestjs/swagger"

export class CreateMatchParticipantDto {
    @ApiProperty({
        description : "Id of the match"
    })
    matchId : string

    @ApiProperty({
        description : "Id of the user that participates to the match"
    })
    userId : string

    @ApiProperty({
        description: "Determine if the player is in team one"
    })
    inTeamOne : boolean

    @ApiProperty({
        description: "Determine if the player is in the team two"
    })
    inTeamTwo : boolean
}
