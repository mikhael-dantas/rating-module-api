import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Pokemon from './db/models/pokemon.entity'
import RepoService from './repo.service'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Pokemon])],
	providers: [RepoService],
	exports: [RepoService],
})
class RepoModule {}
export default RepoModule
