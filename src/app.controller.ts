import { Controller, Get } from '@nestjs/common'
import { AppService, SeedSuccess } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getHello(): Promise<string> {
		return this.appService.getHello()
	}

	@Get('/seed')
	async seedPokemons(): Promise<SeedSuccess> {
		return this.appService.seedPokemons()
	}
}
