/* eslint-disable prettier/prettier */
import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const options: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'SqlCard',
	port: 5432,
	database: 'ratingmodule',
	// host: process.env.DB_HOST || 'localhost',
	// username: process.env.DB_USERNAME || 'postgres',
	// password: process.env.DB_PASSWORD || 'SqlCard',
	// port: parseInt(process.env.DB_PORT) || 5432,
	// database: process.env.DB_DATABASE || 'ratingmodule',
	synchronize: true,
	entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
	migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
   cli: {
      migrationsDir: './src/db/migrations',
      entitiesDir: './src/db/models',
   },
   logging: true
}

module.exports = options
