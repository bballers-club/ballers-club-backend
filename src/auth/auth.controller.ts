import { Body, Controller, HttpException, HttpStatus, Post, Param } from '@nestjs/common';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';
import { supabaseClient } from 'src/main';
import { UserService } from 'src/user/providers/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @SkipAuth()
    @Post()
    async signIn(@Body("email") email : string, @Body("password") password : string) : Promise<Record<string,string>> {
        try{
            const {data,error} = await supabaseClient.auth.signInWithPassword({
                email : email,
                password : password
            })

            const user_info = await this.userService.findUserByEmail(email);

            if(user_info.is_banned && user_info.banned_until){
                throw new HttpException(`The user is banned until : ${user_info.banned_until}`, HttpStatus.FORBIDDEN);
            }
           
            if(error) {
               throw new HttpException(error.name +" "+error.message,400)
            }

            return await {
                id : data.user.id,
                token : data.session.access_token
            }

        }
        catch(error){
    
            throw new HttpException(
				{
					status: error.status,
					error: `${error.message}`,
				},
				error.status,
				{
					cause: error,
				},
			);
        }
    }

    @SkipAuth()
    @Post("backoffice")
    async signInToBackOffice(@Body("email") email :string, @Body("password") password : string) : Promise<Record<string, string>> {
        try{
            const user = await this.userService.findUserByEmail(email);

            if(!user){
                throw new HttpException('User doesn\'t exist',HttpStatus.BAD_REQUEST);
            }

            if(user.is_banned){
                throw new HttpException(`User is banned until ${user.banned_until}`,HttpStatus.UNAUTHORIZED)
            }

            const {data, error} = await supabaseClient.auth.signInWithPassword({
                email : email,
                password : password
            });

            if(error) {
                throw new HttpException('Invalid credentials',HttpStatus.BAD_REQUEST)
            }

            if(user.role != "admin"){
                throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
            }

            return {
                token : data.session.access_token,
                id : user.id
            };
        }
        catch(error){
            throw new HttpException(
				{
					status: error.status,
					error: error.message,
				},
				error.status,
				{
					cause: error,
				},
			);
        }
    }

}
