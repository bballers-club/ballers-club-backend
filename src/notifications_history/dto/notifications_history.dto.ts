import { ApiProperty } from "@nestjs/swagger";

export class NotificationsHistoryDto {
    @ApiProperty({
        description: 'Id of the notification',
    })
    id : string;

    @ApiProperty({
        description: 'Content of the notification'
    })
    content : string;

    @ApiProperty({
        description: 'User that sent the notification'
    })
    senderId : string


    @ApiProperty({
        description: 'Date when the notification was sent'
    })
    sentAt : Date
}