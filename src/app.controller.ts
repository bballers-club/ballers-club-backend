import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './decorators/skip_auth.decorator';
import {Response} from "express"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @SkipAuth()
    @Get()
    async redirectToSwagger(@Res() response : Response){
        return response.redirect("/ballers-club-api");
    }
 
}
