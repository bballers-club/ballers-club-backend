import { Test, TestingModule } from '@nestjs/testing';
import { PlaygroundRequestService } from './playground_request.service';

describe('PlaygroundRequestService', () => {
	let service: PlaygroundRequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PlaygroundRequestService],
		}).compile();

		service = module.get<PlaygroundRequestService>(
			PlaygroundRequestService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
