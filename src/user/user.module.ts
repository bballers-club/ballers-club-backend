import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/supabase_database/supabase_database.module';
import { userProvider } from './providers/user.provider';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [...userProvider, UserService],
})
export class UserModule {}
