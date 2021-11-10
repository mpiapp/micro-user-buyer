import { ArrayOfObjectBuyers, SuccsessGetRoleByAuthId } from "./buyer-payload.mock"

export const BuyerControllerMock = {
    // ==================================== controller ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectBuyers }),
    findOne: jest.fn().mockImplementation((id) => { return SuccsessGetRoleByAuthId(id.auth_id) }),
    findOneAndUpdate: jest.fn().mockImplementation((id, dto) => { return { auth_id: id.id, ...dto } }),
}