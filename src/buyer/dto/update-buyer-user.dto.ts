import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsMongoId, IsOptional } from "class-validator"

export class UpdateBuyerUserDTO {

    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    id ?: string

    @ApiProperty()
    @Prop()
    fullname?: string

    @ApiProperty()
    @Prop()
    role_id?: string

    @ApiProperty()
    @IsIn(['ACTIVE', 'INACTIVE'])
    status?: string

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