import { ApiProperty } from "@nestjs/swagger"

export class VendorUserRegisterDTO {

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}