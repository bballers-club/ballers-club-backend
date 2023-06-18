import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './decorators/skip_auth.decorator';

@Controller('/api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@SkipAuth()
	@Get()
	getLandingPage(): string {
		return `
		style {
			.main-div {
				background-color : red;
				font-color : black;
			}
		}

		<div>
			Hello World
		</div>
		`;
	}
}
