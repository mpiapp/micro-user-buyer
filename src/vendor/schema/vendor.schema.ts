import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Document } from "mongoose";

export type VendorUserDocument = VendorUser & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class VendorUser {

    @ApiProperty()
    @Prop()
    auth_id: string

    @ApiProperty()
    @Prop()
    email: string

    @ApiProperty()
    @Prop()
    vendor_id: string

    @ApiProperty()
    @Prop()
    fullname: string

    @ApiProperty()
    @Prop()
    role_id: string

    @ApiProperty()
    @Prop()
    @IsIn(['ACTIVE', 'INACTIVE'])
    status: string
}

export const VendorUserSchema = SchemaFactory.createForClass(VendorUser)