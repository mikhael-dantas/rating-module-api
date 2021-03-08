/* eslint-disable prettier/prettier */
import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const options: TypeOrmModuleOptions = {
   type: 'postgres',
   url: process.env.DATABASE_URL,
   host: process.env.DB_HOST,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT),
   database: process.env.DB_DATABASE,
   synchronize: false,
   entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
   migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
   cli: {
      migrationsDir: process.env.NODE_ENV === 'production' ? 'dist/db/migrations' : 'src/db/migrations',
      entitiesDir: process.env.NODE_ENV === 'production' ? 'dist/db/models' : 'src/db/models',
   },
   logging: true,
}
module.exports = options
