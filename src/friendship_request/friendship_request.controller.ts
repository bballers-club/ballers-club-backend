import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipRequestService } from './friendship_request.service';
import { CreateFriendshipRequestDto } from './dto/create-friendship_request.dto';
import { UpdateFriendshipRequestDto } from './dto/update-friendship_request.dto';

@Controller('friendship-request')
export class FriendshipRequestController {
  constructor(private readonly friendshipRequestService: FriendshipRequestService) {}

  @Post()
  create(@Body() createFriendshipRequestDto: CreateFriendshipRequestDto) {
    return this.friendshipRequestService.create(createFriendshipRequestDto);
  }

  @Get()
  findAll() {
    return this.friendshipRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendshipRequestDto: UpdateFriendshipRequestDto) {
    return this.friendshipRequestService.update(+id, updateFriendshipRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipRequestService.remove(+id);
  }
}
