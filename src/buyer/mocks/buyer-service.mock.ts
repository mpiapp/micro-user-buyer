import { ArrayOfObjectBuyers } from "./buyer-payload.mock"

export const BuyerServiceMock = {
    // ==================================== service ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectBuyers }),
    create: jest.fn().mockImplementation((dto) => { return { id: expect.any(String), ...dto } }),
}