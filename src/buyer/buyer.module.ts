import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorController } from './buyer.controller';
import { VendorService } from './buyer.service';
import { BuyerUser, BuyerUserSchema } from './schema/buyer.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: BuyerUser.name, schema: BuyerUserSchema }])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class AdminModule {}
