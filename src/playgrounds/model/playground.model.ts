import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Playground {

    @ApiProperty({
        description : "UUID of the Playground"
    })
	@PrimaryGeneratedColumn("uuid")
	id: string;

    @ApiProperty({
        description : "Name of the playground",
        maximum : 150
    })
	@Column({ length: 150 })
	name: string;

    @ApiPropertyOptional({
        description : "Address of the playground"
    })
	@Column({
        nullable : true
    })
	address: string;

    @ApiProperty({
        description : "Geographic latitude of the playground"
    })
	@Column()
    latitude : number

    @ApiProperty({
        description : "Geographic longitude of the playground"
    })
    @Column()
    longitude : number

}