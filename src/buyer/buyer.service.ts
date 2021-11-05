import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerUserRegisterDTO } from './dto/buyer-user-register.dto';
import { BuyerUser, BuyerUserDocument } from './schema/buyer.schema';
import * as requester from 'axios';
import * as dotenv from 'dotenv';
import { BuyerUserCreateDTO } from './dto/buyer-user-create.dto';
import { UserEmailDTO } from './dto/user-email.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateBuyerUserDTO } from './dto/update-buyer-user.dto';

dotenv.config();

@Injectable()
export class BuyerService {

    constructor( @InjectModel(BuyerUser.name) private readonly buyerModel:Model<BuyerUserDocument> ) {}

    async find(q): Promise<BuyerUser[]> {
        let condition = {}

        q["fullname"] ? condition['fullname'] = { $regex: '.*' + q['fullname'] + '.*' } : {}
        q["buyer_id"] ? condition['buyer_id'] = q['buyer_id'] : {}

        return this.buyerModel.find(condition)
    }

    async findById(id: IdDTO): Promise<BuyerUser> {
        return this.buyerModel.findOne({auth_id: id.id})
    }

    async update(id: IdDTO, body: UpdateBuyerUserDTO ): Promise<BuyerUser> {
        await this.buyerModel.findOneAndUpdate({auth_id: id.id}, body)
        return this.findById(id)
    }

    async registerCreate( user: BuyerUserCreateDTO ): Promise<any> {
        return this.buyerModel.create(user)
    }

    async register(body: BuyerUserRegisterDTO): Promise<any> {
        const headersRequest = {
            'Content-Type': process.env.application_json,
            'Accept': process.env.application_json,
        };

        try {
            const registeredUser = await requester.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/dbconnections/signup`, {
                client_id: process.env.AUTH0_BUYERUSER_CLIENT_ID,
                connection: process.env.AUTH0_BUYERUSER_CONNECTION,
                email: body.email, 
                password: body.password
            }, { headers: headersRequest })

            return registeredUser.data

        } catch (error) {
            // console.log(error.response.data)
            return { error: true, ...error.response.data }
        }
    }

    async login(body: BuyerUserRegisterDTO): Promise<any> {
        try {
            let loginedUser = await requester.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/oauth/token`, {
                client_id: process.env.AUTH0_BUYERUSER_CLIENT_ID,
                connection: process.env.AUTH0_BUYERUSER_CONNECTION,
                scope: process.env.AUTH0_BUYERUSER_SCOPE,
                grant_type: process.env.AUTH0_BUYERUSER_GRANT_TYPE,
                username: body.email, 
                password: body.password
            })

            delete loginedUser.data['scope']
            return {
                message: 'Authorized',
                ...loginedUser.data
            }

        } catch (error) {
            // console.log(error.response.data)
            return { error: true, ...error.response.data }
        }
    }

    async checkAccess(headers: object): Promise<any> {
        try {
            let token = headers["token"]
            const options = { headers: { Authorization: `Bearer ${token}` } }
            await requester.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/userinfo`, null, options)

            /* istanbul ignore next */      // ignored for automatic give access to user
            return { message: 'Authorized' }
        } catch (error) {
            // console.log(error.response.data)
            return 'error'
        }
    }

    async changePassword(email: UserEmailDTO): Promise<any> {

        const payload = {
            client_id: process.env.AUTH0_BUYERUSER_CLIENT_ID,
            connection: process.env.AUTH0_BUYERUSER_CONNECTION,
            email: email['email'],
        }
        await requester.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/dbconnections/change_password`, payload)
        return { message: 'Link for password change sent to email' }
    }
    
}
