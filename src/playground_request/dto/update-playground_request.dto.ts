import { PartialType } from '@nestjs/swagger';
import { CreatePlaygroundRequestDto } from './create-playground_request.dto';

export class UpdatePlaygroundRequestDto extends PartialType(CreatePlaygroundRequestDto) {
    userId : string;
    name : string;
    address : string;
    latitude : number;
    longitude : number
}
