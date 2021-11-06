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
    @IsOptional()
    fullname?: string

    @ApiProperty()
    @Prop()
    @IsOptional()
    role_id?: string

    @ApiProperty()
    @IsIn(['ACTIVE', 'INACTIVE'])
    @IsOptional()
    status?: string

    @ApiProperty()
    @Prop()
    @IsOptional()
    modules?: Array<String>

    @ApiProperty()
    @Prop()
    @IsOptional()
    features?: Array<String>
    
    @ApiProperty()
    @Prop()
    @IsOptional()
    capabilities?: Array<String>
}