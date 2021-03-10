import {
	Args,
	// Mutation,
	Query,
	Resolver,
} from '@nestjs/graphql'
import Pokemon from '../db/models/pokemon.entity'
import RepoService from '../repo.service'
// import PokemonInput from './input/pokemon.input'

@Resolver()
class PokemonResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(() => [Pokemon])
	public async pokemons(): Promise<Pokemon[]> {
		return this.repoService.PokemonRepo.findAndCount({ take: 10, skip: 0 })[0]
	}

	@Query(() => Pokemon, { nullable: true })
	public async pokemon(@Args('id') id: number): Promise<Pokemon> {
		return this.repoService.PokemonRepo.findOne(id)
	}

	// @Mutation(() => Pokemon)
	// public async createPokemon(
	// 	@Args('data') input: PokemonInput,
	// ): Promise<Pokemon> {
	// 	const pokemon = this.repoService.PokemonRepo.create({
	// 		name: input.name,
	// 		imageUrl: input.image_url,
	// 	})
	// 	return this.repoService.PokemonRepo.save(pokemon)
	// }
}
export default PokemonResolver
