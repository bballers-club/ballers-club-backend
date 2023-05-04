import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipRequestService } from './friendship_request.service';

describe('FriendshipRequestService', () => {
	let service: FriendshipRequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FriendshipRequestService],
		}).compile();

		service = module.get<FriendshipRequestService>(
			FriendshipRequestService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
