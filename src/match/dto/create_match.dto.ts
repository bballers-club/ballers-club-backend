import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchDto {
    @ApiProperty({
        description : "Event attached to the match"
    })
    eventId : string;
}