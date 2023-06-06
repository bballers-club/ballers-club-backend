import { ApiProperty } from "@nestjs/swagger";

export class MatchDto {
    @ApiProperty({
        description : "Match id"
    })
    id : string

    @ApiProperty({
        description : "Event attached to the match",
        nullable : true
    })
    eventId ?: string;

    @ApiProperty({
        description : "Amount of point of the first team",
        nullable : true,
        default : 0
    })
    teamOnePoint ?: number;

    @ApiProperty({
        description : "Amount of point of the second team",
        nullable : true,
        default : 0
    })
    teamTwoPoint ?: number;

    @ApiProperty({
        description : "Team who won",
        nullable : true,
        enum : [1,2]
    })
    winningTeam ?: number;
}