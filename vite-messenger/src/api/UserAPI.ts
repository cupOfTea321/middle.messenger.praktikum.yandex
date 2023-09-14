import BaseAPI from "./BaseAPI";

export interface UserData {
    id?: number;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
}
export interface UserPassword {
    oldPassword: string;
    newPassword: string;
}

export class UserAPI extends BaseAPI{
    constructor() {
        super('/user');
    }
    mutateUser(data: UserData) {
        return this.http.put('/profile', data);
    }
    mutateAvatar(data: FormData) {
        return this.http.put('/profile/avatar', data);
    }
    mutatePassword(data: UserPassword) {
        return this.http.put('/password', data);
    }
}
export default new UserAPI();
