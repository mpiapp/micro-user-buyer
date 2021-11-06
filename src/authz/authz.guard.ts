import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as axios from 'axios';
import { BuyerService } from '../buyer/buyer.service';
dotenv.config();

@Injectable()
export class LoginAuthenticationGuard implements CanActivate {

  /* istanbul ignore next */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ""

    const checkAccess = async ( options ) => {
      await axios.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/userinfo`, null, options)
    }

    /* istanbul ignore next */
    try {
      await checkAccess({ headers: { Authorization: `Bearer ${token}` } })
      return true
    } catch (error) {
      throw new UnauthorizedException('Login Required')
    }
  }
}

@Injectable()
export class LoginCompanyOwnerAuthenticationGuard implements CanActivate {

  constructor( private readonly buyerUserService:BuyerService ){}

  /* istanbul ignore next */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ""
    let auth_id = ""

    /* istanbul ignore next */
    try {
      var aut0_response = await axios.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/userinfo`, null, { headers: { Authorization: `Bearer ${token}` } })
      if( aut0_response.data ) auth_id = aut0_response.data.sub.split("|")[1]

      let profile_user = await this.buyerUserService.findById(auth_id)
      if( !profile_user.isOwner ) throw new UnauthorizedException('Not an owner')

      return true
    } catch (error) {
      throw new UnauthorizedException(error.response.message || 'Login Required')
    }
  }

}

@Injectable()
export class LoginProfileAuthenticationGuard implements CanActivate {

  constructor( private readonly buyerUserService:BuyerService ){}

  /* istanbul ignore next */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ""
    const params = req.params
    let auth_id = ""

    /* istanbul ignore next */
    try {

      var aut0_response = await axios.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/userinfo`, null, { headers: { Authorization: `Bearer ${token}` } })
      if( aut0_response.data ) auth_id = aut0_response.data.sub.split("|")[1]

      let profile_user = await this.buyerUserService.findById(auth_id)

      if( !profile_user.isOwner && profile_user.auth_id !== params.auth_id ) throw new UnauthorizedException('Can only accessed by owner or self')

      return true
    } catch (error) {

      console.log(error)

      throw new UnauthorizedException(error.response.message || 'Login Required')
    }
  }

}
