import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorUser, VendorUserSchema } from './schema/vendor.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: VendorUser.name, schema: VendorUserSchema }])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class AdminModule {}
