import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { FriendshipService } from './providers/friendship.service';
import { Friendship } from './entity/friendship.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';

@Controller('friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService) {}

    @Get()
    async findAllFriendships() : Promise<Friendship[]> {
        return await this.friendshipService.findAll()
    }

    @Get(":id")
    async findOneFriendshipOfUser(@Param("id") id : string) : Promise<Friendship> {
        return await this.friendshipService.findAllFriendshipOfOneUser(id)
    }

    @Post()
    async createFriendship(@Body() friendship : CreateFriendshipDto) : Promise<Friendship> {
        return await this.friendshipService.create(friendship)
    }

    @Delete(":id")
    async deleteFriendship(@Body("currentUserId") currentUserId : string, @Body("userFriendId") userFriendId : string) : Promise<void> {
        return await this.friendshipService.deleteFriendship(currentUserId,userFriendId);
    }
}
