import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import * as ormOptions from '../src/config/orm'
import RepoModule from './repo.module'

import { GraphQLModule } from '@nestjs/graphql'
import PokemonResolver from './resolvers/pokemon.resolver'
import { ConfigModule } from '@nestjs/config'

const graphQLImports = [PokemonResolver]

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(ormOptions),
		RepoModule,
		...graphQLImports,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			playground: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
