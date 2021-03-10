/* eslint-disable prettier/prettier */
import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const options: TypeOrmModuleOptions = {
   type: 'postgres',
   url: process.env.DATABASE_URL,
   ssl:  process.env.NODE_ENV === 'development' ? false : {
      rejectUnauthorized: false
   },
   host: process.env.DB_HOST,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT),
   database: process.env.DB_DATABASE,
   synchronize: false,
   entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
   migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
   cli: {
      migrationsDir: 'dist/db/migrations',
      entitiesDir: 'dist/db/models',
   },
   logging: process.env.NODE_ENV === 'development' ? true : false,
}

module.exports = options
