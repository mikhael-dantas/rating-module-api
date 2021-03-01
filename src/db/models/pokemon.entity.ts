import { ObjectType, Field } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
// import Book from './book.entity'

@ObjectType()
@Entity({ name: 'pokemons' })
export default class Pokemon {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field()
	@Column({ name: 'image_url' })
	imageUrl: string

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	// Associations
	// @OneToMany(() => Book, (book) => book.authorConnection)
	// bookConnection: Promise<Book[]>
}
