import { HttpException, Injectable } from '@nestjs/common';
import { EventParticipantRepository } from '../repositories/event_participant.repository';

@Injectable()
export class EventParticipantService {
    constructor(
		private eventParticipantRepository: EventParticipantRepository
	) {}
}
