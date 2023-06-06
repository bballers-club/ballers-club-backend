import { ApiProperty } from "@nestjs/swagger";

export class UpdateMatchDto {
    @ApiProperty({
        description : "Match id"
    })
    id : string

    @ApiProperty({
        description : "Amount of point of the first team",
        default : 0
    })
    teamOnePoint ?: number;

    @ApiProperty({
        description : "Amount of point of the second team",
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