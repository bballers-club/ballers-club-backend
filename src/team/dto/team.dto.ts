import { User } from 'src/user/entity/user.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty({
    description: 'UUID of the team',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the team',
  })
  name: string;

  @ApiProperty({
    description: 'Date when the team has been created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'List of players that are in the team',
  })
  players: User[];
}
