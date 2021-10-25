import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsMongoId, IsOptional } from "class-validator"

export class VendorUserCreateDTO {

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
    vendor_id: string

    @ApiProperty()
    @Prop()
    fullname: string

    @ApiProperty()
    @Prop()
    role_id: string

    @ApiProperty()
    @IsIn(['ACTIVE', 'INACTIVE'])
    status: string
}