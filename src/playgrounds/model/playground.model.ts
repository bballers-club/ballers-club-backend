import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class Playground {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 150 })
	name: string;

	@Column({
        nullable : true
    })
	address: string;

	@Column()
    latitude : number

    @Column()
    longitude : number

}