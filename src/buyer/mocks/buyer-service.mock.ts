export const BuyerServiceMock = {
    // ==================================== service ====================================
    create: jest.fn().mockImplementation((dto) => { return { id: expect.any(String), ...dto } }),
}