import { ApiProperty } from '@nestjs/swagger';

export class DeleteFriendshipDto {
  @ApiProperty({
    description: 'Id of the authenticated user',
  })
  userOneId: string;

  @ApiProperty({
    description: 'Id of the friend selected',
  })
  userTwoId: string;
}
