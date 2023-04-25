import { PartialType } from '@nestjs/swagger';
import { CreateFriendshipRequestDto } from './create-friendship_request.dto';

export class UpdateFriendshipRequestDto extends PartialType(CreateFriendshipRequestDto) {}
