import API, {UserAPI, UserData, UserPassword} from "../api/UserAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class MutateController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async mutate(data: UserData) {
        try {
            console.log(data)
            router.go('/profile');
            await this.api.mutateUser(data);

            store.set('user', data);


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
}

export default new MutateController();
