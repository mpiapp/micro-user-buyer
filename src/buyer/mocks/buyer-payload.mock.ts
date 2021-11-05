import { ApiPreconditionFailedResponse } from '@nestjs/swagger';
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
    status: 'ACTIVE',
    isOwner: true
}

export const RegisterCreatePayloadSuccess = {
    id: "id",
    auth_id: "1234",
    email: "test1234@gmail.com",
    buyer_id: "123", 
    fullname: "test", 
    role_id: "00",
    status: 'ACTIVE',
    isOwner: true
}

export const SuccsessUpdateBuyer = (id) => {
    return {
        auth_id: id,
        email: "test1234@gmail.com",
        buyer_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    }
}

export const SuccsessGetRoleByAuthId = (id) => {
    return {
        auth_id: id,
        email: "test1234@gmail.com",
        buyer_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    }
}

export const ArrayOfObjectBuyers = [
    {
        id: "id1",
        auth_id: "1234",
        email: "test1234@gmail.com",
        buyer_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    },
    {
        id: "id2",
        auth_id: "12345",
        email: "test12345@gmail.com",
        buyer_id: "1234", 
        fullname: "test12", 
        role_id: "001",
        status: 'ACTIVE',
        isOwner: false
    },
    {
        id: "id3",
        auth_id: "12341",
        email: "test12341@gmail.com",
        buyer_id: "1231", 
        fullname: "test12", 
        role_id: "002",
        status: 'ACTIVE',
        isOwner: false
    }
]

export const TrueRegisterPayload = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD, buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadLowercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_LOWERCASE, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadUppercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_UPPERCASE, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadNoNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_NO_NUMBER, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadOnlyNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_ONLY_NUMBER, flag: 'BUYER', buyer_id: "123", fullname: "test", role_id: "00" }
export const EmailPayload = { email: 'test1234@gmail.com' }