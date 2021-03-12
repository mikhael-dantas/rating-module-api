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
	public async pokemons(
		@Args('take') take: number,
		@Args('skip') skip: number,
	): Promise<Pokemon[]> {
		take = take ? take : 10
		take = take > 100 ? 100 : take
		skip = skip ? skip : 0
		return this.repoService.PokemonRepo.find({ take: take, skip: skip })
	}

	@Query(() => Pokemon, { nullable: true })
	public async pokemon(@Args('name') name: string): Promise<Pokemon> {
		return this.repoService.PokemonRepo.findOne({ where: { name: name } })
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
