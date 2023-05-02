import { ApiProperty } from '@nestjs/swagger';

export class PlaygroundRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  address: string;

  @ApiProperty({
    type: 'double',
  })
  latitude: number;

  @ApiProperty({
    type: 'double',
  })
  longitude: number;
}
