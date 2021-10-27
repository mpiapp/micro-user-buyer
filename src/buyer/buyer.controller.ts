import { Body, Controller, Post, UnauthorizedException, Headers, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginAuthenticationGuard } from '../authz/authz.guard';
import { BuyerService } from './buyer.service';
import { BuyerUserCreateDTO } from './dto/buyer-user-create.dto';
import { BuyerUserRegisterDTO } from './dto/buyer-user-register.dto';
import { UserEmailDTO } from './dto/user-email.dto';
import { BuyerUser } from './schema/buyer.schema';

@Controller('buyer')
export class BuyerController {

    constructor( private readonly buyerService:BuyerService ){}

    @ApiCreatedResponse({ type: BuyerUser, description: 'register a buyer-user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Post('register')
    async register(@Body() body: BuyerUserRegisterDTO): Promise<BuyerUserCreateDTO> {
        const registeredUser = await this.buyerService.register(body)

        /* istanbul ignore next */      // ignored for automatic registering user
        if( registeredUser !== 'error' ) {
            let userPayload: BuyerUserCreateDTO = {
                auth_id: registeredUser['_id'] ? registeredUser['_id'] : "",
                email: registeredUser['email'] ? registeredUser['email'] : "",
                buyer_id: body['buyer_id'] ? body['buyer_id'] : "",
                fullname: body['fullname'] ? body['fullname'] : "",
                role_id: body['role_id'] ? body['role_id'] : "",
                status: 'ACTIVE'
            }
            
            return this.buyerService.registerCreate(userPayload)
        }
        throw new UnauthorizedException()
    }

    @ApiOkResponse({ description: 'logined a user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
    @Post('login')
    async login(@Body() body: BuyerUserRegisterDTO): Promise<any> {
        const loginedUser = await this.buyerService.login(body)

        /* istanbul ignore next */      // ignored for automatic login user
        if(loginedUser !== 'error') return loginedUser
        throw new UnauthorizedException()
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post('user-access')
    async user_access(@Headers() headers: object ): Promise<any> {
        const checkedAccessUserResponse = await this.buyerService.checkAccess(headers)

         /* istanbul ignore next */      // ignored for automatic login user
        if(checkedAccessUserResponse !== 'error') return checkedAccessUserResponse
        throw new UnauthorizedException()
    }

    // @UseGuards(LoginAuthenticationGuard)
    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post('change-password')
    async change_password(@Body() email: UserEmailDTO ): Promise<any> {
        return this.buyerService.changePassword(email)
    }
}
