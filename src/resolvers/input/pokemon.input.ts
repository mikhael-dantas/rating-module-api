import { Field, InputType } from '@nestjs/graphql'

@InputType()
class PokemonInput {
	@Field()
	readonly name: string

	@Field()
	readonly image_url: string
}

export default PokemonInput
