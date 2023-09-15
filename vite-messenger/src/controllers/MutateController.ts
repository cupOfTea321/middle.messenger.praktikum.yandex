import API, {UserAPI, UserData, UserPassword} from "../api/UserAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import ChatsController from "./ChatsController";

export interface User {
    login: string;
    users: object;
}

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async mutateUserInfo(data: UserData) {
        try {
            await this.api.mutateUser(data);

            store.set('user', data);

            router.go('/profile');
        } catch (e: any) {
            console.error(e.message);
        }
    }
    async mutateAvatar(data: any) {
        try {
            const file: FormData = new FormData();
            file.append('avatar', data);

            await this.api.mutateAvatar(file);
        } catch (e: any) {
            console.error(e);
        }
    }

    async mutatePassword(data: UserPassword) {
        try {
            await this.api.mutatePassword(data);

            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async searchUser(data: object, idChat){
        try {
            const items:User[] = await this.api.searchUser(data);
            const filteredUsers:User[] = items.filter((user) => user.login === data.login);

            ChatsController.addUserToChat(idChat, filteredUsers)


        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new UserController();
