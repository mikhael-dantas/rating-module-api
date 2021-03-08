import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as path from 'path'

// import * as ormOptions from './config/orm'
import RepoModule from './repo.module'

import { GraphQLModule } from '@nestjs/graphql'
import PokemonResolver from './resolvers/pokemon.resolver'
import {
	ConfigModule,
	ConfigService,
	// ConfigService
} from '@nestjs/config'

const graphQLImports = [PokemonResolver]

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('DATABASE_URL'),
				host: configService.get('DB_HOST'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				port: configService.get('DB_PORT'),
				database: configService.get('DB_DATABASE'),
				synchronize: false,
				entities: [path.resolve(__dirname, 'db', 'models', '*')],
				migrations: [path.resolve(__dirname, 'db', 'migrations', '*')],
				cli: {
					migrationsDir: './db/migrations',
					entitiesDir: './db/models',
				},
				logging: true,
			}),
			inject: [ConfigService],
		}),
		// TypeOrmModule.forRoot(ormOptions),
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
