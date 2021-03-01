/* eslint-disable prettier/prettier */
import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
console.log(process.env.DB_HOST)
const options: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	port: +process.env.DB_PORT,
	database: process.env.DB_DATABASE,
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
