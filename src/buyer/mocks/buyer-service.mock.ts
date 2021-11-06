import { ArrayOfObjectBuyers, SuccsessGetRoleByAuthId } from "./buyer-payload.mock"

export const BuyerServiceMock = {
    // ==================================== service ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectBuyers }),
    create: jest.fn().mockImplementation((dto) => { return { id: expect.any(String), ...dto } }),
    findOne: jest.fn().mockImplementation((id) => { return SuccsessGetRoleByAuthId(id.auth_id) }),
    findOneAndUpdate: jest.fn().mockImplementation((id, dto) => { return { auth_id: id.id, ...dto } }),
}