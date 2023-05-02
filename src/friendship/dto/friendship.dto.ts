import { ApiProperty } from '@nestjs/swagger';

export class FriendshipDto {
  @ApiProperty({
    description: 'Authenticated user id',
  })
  userOneId : string;

  @ApiProperty({
    description: 'Id of the friend of the authenticated user',
  })
  userTwoId : string;

  @ApiProperty({
    description: 'Date when the friendship started',
  })
  createdAt: Date;
}
