import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerService } from '../buyer/buyer.service';
import { BuyerUser, BuyerUserSchema } from '../buyer/schema/buyer.schema';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([{ name: BuyerUser.name, schema: BuyerUserSchema }])],
    providers: [BuyerService]
})
export class AuthzModule {}
