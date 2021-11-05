import { ArrayOfObjectBuyers } from "./buyer-payload.mock"

export const BuyerControllerMock = {
    // ==================================== controller ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectBuyers }),
}