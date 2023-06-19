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
					status: HttpStatus.BAD_REQUEST,
					error: `${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
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
            const {data, error} = await supabaseClient.auth.signInWithPassword({
                email : email,
                password : password
            });

            if(error) {
                throw new HttpException('Invalid credentials',HttpStatus.BAD_REQUEST)
            }

            const user = await this.userService.findOneById(data.user.id);

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
					status: HttpStatus.BAD_REQUEST,
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				},
			);
        }
    }

}
