import * as dotenv from 'dotenv';
dotenv.config();

const stringId = "id"
const numberId = 1

export const StringMockId = stringId

export const MockId = {
    id: stringId
}

export const RegisterCreatePayload = {
    auth_id: "1234",
    email: "test1234@gmail.com",
    buyer_id: "123", 
    fullname: "test", 
    role_id: "00",
    status: 'ACTIVE'
}

export const RegisterCreatePayloadSuccess = {
    id: "id",
    auth_id: "1234",
    email: "test1234@gmail.com",
    buyer_id: "123", 
    fullname: "test", 
    role_id: "00",
    status: 'ACTIVE'
}

export const TrueRegisterPayload = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD, buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadLowercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_LOWERCASE, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadUppercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_UPPERCASE, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadNoNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_NO_NUMBER, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadOnlyNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_ONLY_NUMBER, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const EmailPayload = { email: 'test1234@gmail.com' }