import { Injectable } from '@nestjs/common';
import { CreateFriendshipRequestDto } from './dto/create-friendship_request.dto';
import { UpdateFriendshipRequestDto } from './dto/update-friendship_request.dto';

@Injectable()
export class FriendshipRequestService {
  create(createFriendshipRequestDto: CreateFriendshipRequestDto) {
    return 'This action adds a new friendshipRequest';
  }

  findAll() {
    return `This action returns all friendshipRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendshipRequest`;
  }

  update(id: number, updateFriendshipRequestDto: UpdateFriendshipRequestDto) {
    return `This action updates a #${id} friendshipRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendshipRequest`;
  }
}
