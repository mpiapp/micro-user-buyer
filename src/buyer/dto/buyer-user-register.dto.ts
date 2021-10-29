import { ApiProperty } from "@nestjs/swagger"

export class BuyerUserRegisterDTO {

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}