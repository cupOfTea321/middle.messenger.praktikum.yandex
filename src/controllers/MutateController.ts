import API, {UserAPI, UserData} from "../api/UserAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import ChatsController from "./ChatsController";
import {User} from "../api/AuthAPI";

// export interface User {
//     login: string;
//     users: object;
// }

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
        console.log('mutateAvatar')
        try {
            const file: FormData = new FormData();
            file.append('avatar', data);

            await this.api.mutateAvatar(file).then( (item: any) => {
                if(item.avatar){
                    const changedAvatar = {avatar: item.avatar};

                    store.set('user', changedAvatar);
                }
            });
        } catch (e: any) {
            console.error(e);
        }
    }

    async mutatePassword(data: Record<string, string>) {
        try {
            await this.api.mutatePassword(data);

            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async searchUser(data: User, idChat: any){
        try {
            console.log(data, ' ', idChat)
            const items:User[] = await this.api.searchUser(data);
            const filteredUsers:User[] = items.filter((user: User) => user.login === data.login);
            const idUser = filteredUsers[0].id;

            await ChatsController.addUserToChat(idChat.id, idUser);
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new UserController();
