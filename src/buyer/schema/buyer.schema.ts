import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Document } from "mongoose";

export type BuyerUserDocument = BuyerUser & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class BuyerUser {

    @ApiProperty()
    @Prop()
    auth_id: string

    @ApiProperty()
    @Prop()
    email: string

    @ApiProperty()
    @Prop()
    buyer_id: string

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

    @ApiProperty()
    @Prop()
    @IsIn([true, false])
    isOwner: boolean

    @ApiProperty()
    @Prop()
    modules: Array<string>

    @ApiProperty()
    @Prop()
    features: Array<string>
    
    @ApiProperty()
    @Prop()
    capabilities: Array<string>
}

export const BuyerUserSchema = SchemaFactory.createForClass(BuyerUser)