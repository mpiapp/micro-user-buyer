import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as axios from 'axios';
import { BuyerService } from '../buyer/buyer.service';
import { Reflector } from '@nestjs/core';
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

      req.headers['auth_id'] = auth_id
      req.headers['buyer_company_id'] = profile_user['buyer_id']

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
      throw new UnauthorizedException(error.response.message || 'Login Required')
    }
  }

}

@Injectable()
export class BuyerGuards implements CanActivate {

  /* istanbul ignore next */
  constructor( 
    private readonly buyerUserService:BuyerService,
    private reflector: Reflector,
    ){}

  /* istanbul ignore next */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ""
    const params = req.params
    let auth_id = ""

    const modulesArray = this.reflector.get<any>('modules', context.getHandler());
    const featuresArray = this.reflector.get<any>('features', context.getHandler());
    const capabilitiesArray = this.reflector.get<any>('capabilities', context.getHandler());

    /* istanbul ignore next */
    try {

      var aut0_response = await axios.default.post(`https://${process.env.AUTH0_BUYERUSER_BASE_URL}/userinfo`, null, { headers: { Authorization: `Bearer ${token}` } })
      if( aut0_response.data ) auth_id = aut0_response.data.sub.split("|")[1]

      let profile_user = await this.buyerUserService.findById(auth_id)

      if( profile_user.isOwner ) return true

      let profile_user_modules = JSON.parse(JSON.stringify(profile_user.modules))
      let profile_user_features = JSON.parse(JSON.stringify(profile_user.features))
      let profile_user_capabilities = JSON.parse(JSON.stringify(profile_user.capabilities))
      
      if( modulesArray && profile_user_modules.filter(element => modulesArray.includes(element)).length <= 0 ) throw new UnauthorizedException(`Can only accessed by owner or the one that has modules ${modulesArray}`)
      if( featuresArray && profile_user_features.filter(element => featuresArray.includes(element)).length <= 0 ) throw new UnauthorizedException(`Can only accessed by owner or the one that has modules ${modulesArray}`)
      if( capabilitiesArray && profile_user_capabilities.filter(element => capabilitiesArray.includes(element)).length <= 0 ) throw new UnauthorizedException(`Can only accessed by owner or the one that has modules ${modulesArray}`)

      return true
    } catch (error) {
      throw new UnauthorizedException(error.response.message || 'Login Required')
    }
  }

}