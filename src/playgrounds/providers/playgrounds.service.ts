import { Injectable,Inject ,HttpStatus, HttpException } from '@nestjs/common';
import { Playground } from '../entity/playground.entity';
import { Repository } from 'typeorm';
import { z } from "zod"

@Injectable()
export class PlaygroundsService{

    private playgroundObjectValidator = z.object({
        name : z.string(),
        latitude : z.number(),
        longitude : z.number()
    });

    constructor(@Inject('PLAYGROUND_REPOSITORY') private playgroundRepository: Repository<Playground>){}

    async findAll(): Promise<Playground[]> {
        try{
            return await this.playgroundRepository.find()
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }
    async findOneById(id: string): Promise<Playground> {
        try{
           const idValidated = z.string().uuid().parse(id);
           
           return await this.playgroundRepository.findOneBy({
                id : idValidated
           });
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }
    async create(playground: {
        name : string,
        address ?: string,
        latitude : number,
        longitude : number
    }): Promise<Playground> {
        try{
           const playgroundValidated = this.playgroundObjectValidator.parse(playground);

           const createdPlayground = await this.playgroundRepository.create({
            ...playgroundValidated
           })

           return await this.playgroundRepository.save(createdPlayground)
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }
    async update(id: string, playground: {
        name ?: string,
        address ?: string,
        latitude ?: number,
        longitude ?: number
    }): Promise<Playground> {
        try{
            const validatedId = z.string().uuid().parse(id);
            const validatedPlayground = this.playgroundObjectValidator.parse(playground)

            await this.playgroundRepository.update(validatedId, {
                ...validatedPlayground
            });

            return await this.findOneById(validatedId);
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }
    async delete(id: string): Promise<void> {
        try{
           const validatedId = z.string().uuid().parse(id);

           await this.playgroundRepository.delete(validatedId)
        }
        catch(error){
            throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Invalid parameter : ${error.message}`,
				},
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
				}
			);
        }
    }
    async findPlaygroundsAroundPlayer(latitude : number, longitude : number, radius : number) : Promise<Playground[]>{
        try{
            const playgrounds = await this.findAll();
            const playgroundsInRadius : Playground[] = []; 

            if(playgrounds.length > 0){
                
                playgrounds.forEach((playground) => {
                    const validatedUserLatitude = z.number().parse(latitude);
                    const validatedUserLongitude = z.number().parse(longitude);

                    const validatedPlaygroundLatitude = z.number().parse(playground.latitude);
                    const validatedPlaygroundLongitude = z.number().parse(playground.longitude)

                    const validatedRadius = z.number().parse(radius);

                    /*
                    Could or not be an error if he's already on a playground, we can still find others around
                    if 
                    (
                       ( validatedUserLatitude === validatedPlaygroundLatitude ) && ( validatedUserLongitude == validatedPlaygroundLongitude)
                    )
                    {
                        throw new Error()
                    }*/

                    const radlat1   = Math.PI * validatedUserLatitude /180
                    const radlat2   = Math.PI * validatedPlaygroundLatitude/180
                    const theta     = validatedUserLongitude - validatedPlaygroundLongitude
                    const radtheta  = Math.PI * theta/180
                    let   dist      = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

                    if (dist > 1) {
                        dist = 1;
                    }

                    dist = Math.acos(dist)
                    dist = dist * 180/Math.PI
                    //We'll turn the value into meters
                    dist = ( (dist * 60 * 1.1515) * 1.609344 ) * 1000;
                  
                    if(validatedRadius >= dist){
                        playgroundsInRadius.push(playground)
                    }
                });

                return playgroundsInRadius;
            }

         }
         catch(error){
             throw new HttpException(
                 {
                     status: HttpStatus.BAD_REQUEST,
                     error: `Invalid parameter : ${error.message}`,
                 },
                 HttpStatus.BAD_REQUEST,
                 {
                     cause: error,
                 }
             );
         }
    }
}
