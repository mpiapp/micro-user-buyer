import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsMongoId, IsOptional } from "class-validator"

export class BuyerUserCreateDTO {

    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    id ?: string

    @ApiProperty()
    auth_id: string

    @ApiProperty()
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
    @IsIn(['ACTIVE', 'INACTIVE'])
    status: string

    @ApiProperty()
    @Prop()
    @IsIn([true, false])
    isOwner: Boolean

    @ApiProperty()
    @Prop()
    modules?: Array<String>

    @ApiProperty()
    @Prop()
    features?: Array<String>
    
    @ApiProperty()
    @Prop()
    capabilities?: Array<String>

}