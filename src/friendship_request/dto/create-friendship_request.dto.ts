import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendshipRequestDto {
	@ApiProperty({
		description: 'User that sent the request uuid',
	})
	requestSenderId: string;

	@ApiProperty({
		description: 'User that received the request uuid',
	})
	requestReceiverId: string;
}
