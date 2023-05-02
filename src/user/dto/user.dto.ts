import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'UUID of the user',
    example: 'abfe96e7-b0cd-4eb4-893e-cb4df87c053e',
  })
  id: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'ShaqTheBigDiesel',
  })
  username: string;

  @ApiProperty({
    description: 'E-mail of the user',
    example: 'shaqDiesel@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Date when the user created his account',
  })
  createdAt: Date;
}
