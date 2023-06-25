import { ApiProperty } from "@nestjs/swagger";

export class UserBackofficeDto {
    id : string;
    username : string;
    email : string;
    createdAt : string
    isBanned: Boolean;
}