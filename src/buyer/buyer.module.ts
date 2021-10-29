import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { BuyerUser, BuyerUserSchema } from './schema/buyer.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: BuyerUser.name, schema: BuyerUserSchema }])],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class AdminModule {}
