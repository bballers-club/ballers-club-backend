import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    
    @ApiProperty({
        description : "Username of the user to create",
        example : "ShaqTheDiesel"
    })
    username: string;

    @ApiProperty({
        description : "E-mail of the user to create",
        example : "shaqTheDiesel@gmail.com"
    })
	email: string;
}