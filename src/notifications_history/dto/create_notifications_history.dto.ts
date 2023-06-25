import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationsHistoryDto {
    @ApiProperty({
        description: 'Content of the notification'
    })
    content : string;

    @ApiProperty({
        description: 'User that sent the notification'
    })
    senderId : string
}