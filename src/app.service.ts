import { Injectable } from '@nestjs/common';
import { SkipAuth } from './decorators/skip_auth.decorator';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
