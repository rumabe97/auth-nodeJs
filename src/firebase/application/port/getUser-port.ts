export interface GetUserPort {
    getUserByUid(uid: string);

    getUserByEmail(email: string);

    getUserByPhoneNumber(phoneNumber: string);
}