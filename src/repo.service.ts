import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Pokemon from './db/models/pokemon.entity'

@Injectable()
class RepoService {
	public constructor(
		@InjectRepository(Pokemon)
		public readonly PokemonRepo: Repository<Pokemon>,
	) {}
}

export default RepoService
