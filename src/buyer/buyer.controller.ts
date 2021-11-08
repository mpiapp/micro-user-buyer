import { Body, Controller, Post, UnauthorizedException, Headers, Get, Query, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginCompanyOwnerAuthenticationGuard, LoginProfileAuthenticationGuard } from '../authz/authz.guard';
import { BuyerService } from './buyer.service';
import { BuyerUserCreateDTO } from './dto/buyer-user-create.dto';
import { BuyerUserRegisterDTO } from './dto/buyer-user-register.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateBuyerUserDTO } from './dto/update-buyer-user.dto';
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
        if( !registeredUser.error ) {

            let checked_company = await this.buyerService.find({ buyer_id: body['buyer_id'] ? body['buyer_id'] : "" })

            let userPayload: BuyerUserCreateDTO = {
                auth_id: registeredUser['_id'] ? registeredUser['_id'] : "",
                email: registeredUser['email'] ? registeredUser['email'] : "",
                buyer_id: body['buyer_id'] ? body['buyer_id'] : "",
                fullname: body['fullname'] ? body['fullname'] : "",
                role_id: body['role_id'] ? body['role_id'] : "",
                status: 'ACTIVE',
                isOwner: checked_company.length ? false : true,
                modules: body['modules'] ? body['modules'] : [],
                features: body['features'] ? body['features'] : [],
                capabilities: body['capabilities'] ? body['capabilities'] : [],
            }
            
            return this.buyerService.registerCreate(userPayload)
        }
        throw new UnauthorizedException(registeredUser.description)
    }

    @ApiOkResponse({ description: 'logined a user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
    @Post('login')
    async login(@Body() body: BuyerUserRegisterDTO): Promise<any> {
        const loginedUser = await this.buyerService.login(body)

        /* istanbul ignore next */      // ignored for automatic login user
        if(!loginedUser.error) return loginedUser
        throw new UnauthorizedException()
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post('user-access')
    async user_access(@Headers() headers: object ): Promise<any> {
        const checkedAccessUserResponse = await this.buyerService.checkAccess(headers)

         /* istanbul ignore next */      // ignored for automatic login user
        if(checkedAccessUserResponse != 'error') return checkedAccessUserResponse
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

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Get()
    async fetch_buyers(
        @Query() queries: any
    ): Promise<any> {
        return this.buyerService.find(queries)
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @UseGuards(LoginCompanyOwnerAuthenticationGuard)
    @Get('company-owner')
    async fetch_buyers_company_owner(
        @Query() queries: any,
        @Headers() headers: object
    ): Promise<any> {

        if( !headers['buyer_company_id'] ) throw new UnauthorizedException('Not an owner')
        
        queries['buyer_id'] = headers['buyer_company_id']
        return this.buyerService.find(queries)
    }

    @ApiOkResponse({ type: BuyerUser, description: 'get a buyer user by auth_id' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'auth_id', required: true })
    @UseGuards(LoginProfileAuthenticationGuard)
    @Get(':auth_id')
    async findById(
        @Param('auth_id') id: IdDTO
    ): Promise<BuyerUser> {
        return this.buyerService.findById(id)
    }

    @ApiCreatedResponse({ type: BuyerUser, description: 'update a buyer user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'auth_id', required: true })
    @UseGuards(LoginCompanyOwnerAuthenticationGuard)
    @Put(':auth_id')
    async update(
        @Param('auth_id') id: IdDTO, 
        @Body() body: UpdateBuyerUserDTO
    ): Promise<BuyerUser> {
        return this.buyerService.update(id, body)
    }
}
