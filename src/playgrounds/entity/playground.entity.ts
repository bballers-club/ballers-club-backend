import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, Double } from 'typeorm';

@Entity()
export class Playground {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 150 })
	name: string;

	@Column({
        nullable : false
    })
	address: string;

	@Column({
		type : "double"
	})
    latitude : number

    @Column({
		type : "double"
	})
    longitude : number

}