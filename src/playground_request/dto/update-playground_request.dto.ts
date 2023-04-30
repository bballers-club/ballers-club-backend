import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePlaygroundRequestDto } from './create-playground_request.dto';

export class UpdatePlaygroundRequestDto extends PartialType(CreatePlaygroundRequestDto) {

    @ApiProperty({
        type : "string",
        format : "uuid"
    })
    userId : string;

    @ApiProperty({
        type : "string"
    })
    name : string;

    @ApiProperty({
        type : "string"
    })
    address : string;

    @ApiProperty({
        type : "double"
    })
    latitude : number;

    @ApiProperty({
        type : "double"
    })
    longitude : number
}
