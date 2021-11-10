import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { BuyerControllerMock } from './mocks/buyer-controller.mock';
import { ArrayOfObjectBuyers, EmailPayload, FalseRegisterPayloadOnlyNumberPass, FalseRegisterPayloadUppercasePass, MockId, RegisterCreatePayload, StringMockId, SuccsessGetRoleByAuthId, SuccsessUpdateBuyer } from './mocks/buyer-payload.mock';
import { BuyerUser } from './schema/buyer.schema';

describe('BuyerController', () => {
  let controller: BuyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyerController],
      providers: [BuyerService,{
        provide: getModelToken(BuyerUser.name),
        useValue: BuyerControllerMock
      }, 
    ]
    }).compile();      
    
    controller = module.get<BuyerController>(BuyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // crud
  it(`should get a list of user-buyers (Controller)`, async () => {
    expect(await controller.fetch_buyers({})).toEqual(ArrayOfObjectBuyers)
  })

  it(`should get a list of user-buyers company-owner (Controller)`, async () => {
    let queries = {'buyer_id' : '123'}
    let headers = { 'buyer_company_id': '123' }

    expect(await controller.fetch_buyers_company_owner(queries, headers)).toEqual(ArrayOfObjectBuyers)
  })

  it(`should not get a list of user-buyers company-owner if buyer-id wrong (Controller)`, async () => {
    let queries = {'buyer_id' : ''}
    let headers = { 'buyer_company_id': '' }

    try {
      await await controller.fetch_buyers_company_owner(queries, headers)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should update a user buyer (Controller)`, async () => {
    expect(await controller.update(MockId, RegisterCreatePayload)).toEqual(SuccsessUpdateBuyer(StringMockId))
  })

  it(`should get a user buyer (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(SuccsessGetRoleByAuthId(MockId))
  })

  // register
  it(`should not register a user if all password number (Controller)`, async () => {
    try {
      await controller.register(FalseRegisterPayloadOnlyNumberPass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not register a user if all password uppercase (Controller)`, async () => {
    try {
      await controller.register(FalseRegisterPayloadUppercasePass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not register a user if all password lowercase (Controller)`, async function(){
    try {
      var test = await controller.register(FalseRegisterPayloadUppercasePass)
      console.log(test)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // login
  it(`should not login a user if email not in the system (Controller)`, async () => {
    try {
      await controller.login(FalseRegisterPayloadOnlyNumberPass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // check-access
  it(`should not give a user access if token undefined (Controller)`, async () => {
    try {
      await controller.user_access({
        token: null
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not give a user access if token false (Controller)`, async () => {
    try {
      await controller.user_access({
        token: "false_token"
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // change password
  it(`should send link to change password (Controller)`, async () => {
    try {
      await controller.change_password(EmailPayload)
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

});
