import { Injectable } from '@nestjs/common'
import RepoService from './repo.service'
import axios from 'axios'

export interface SeedSuccess {
	success: boolean
	message?: string
}

@Injectable()
export class AppService {
	constructor(private readonly repoService: RepoService) {}

	async getHello(): Promise<string> {
		// querying database
		return `Hello world count is ${await this.repoService.PokemonRepo.count()}`
	}

	async seedPokemons(): Promise<SeedSuccess> {
		try {
			// check database
			const pokemons = await this.repoService.PokemonRepo.find()
			if (pokemons.length > 0) {
				return {
					success: false,
					message: 'pokemons already exist on the database',
				}
			}

			// make queries to get lists of pokemons
			let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=200&offset=0'

			for (let index = 0; index < 8; index++) {
				if (!nextUrl) {
					break
				}
				const pokeapiresponse = await axios.get(nextUrl)
				nextUrl = pokeapiresponse.data.next
				const results = pokeapiresponse.data.results
				// get individual images and save in the db
				await Promise.all(
					results.map(async (pokemonFromResults: any) => {
						const individualPoke = await axios
							.get(
								`https://pokeapi.co/api/v2/pokemon/${pokemonFromResults.name}`,
							)
							.catch(() => {
								return {
									status: 404,
									data: { sprites: { front_default: 'not found' } },
								}
							})
						const image = `${
							individualPoke.data.sprites.front_default
								? individualPoke.data.sprites.front_default
								: 'not found'
						}`
						await this.repoService.PokemonRepo.insert({
							name: pokemonFromResults.name,
							imageUrl: image,
						})
					}),
				)
			}
			return { success: true }
		} catch (error) {
			console.log(error)
			return { success: false }
		}
	}
}
