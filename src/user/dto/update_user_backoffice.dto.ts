import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserBackofficeDto {
    id : string;
    username ?: string;
    email ?: string;
    createdAt ?: string
}