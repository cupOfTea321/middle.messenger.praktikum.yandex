import API, {AuthAPI, SigninData} from '../api/AuthAPI.ts';
import MessagesController from './MessagesController.ts';
import router from "../utils/Router.ts";
import store from "../utils/Store.ts";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  // валидация формы происходит здесь в catch
  public async signin(data: SigninData) {
    // store.set('auth.error', null)
    // store.set('auth.isLoading', true)

    try {
      console.log(data, ' signin')
      await this.api.signin(data);

      await this.fetchUser();
      // store.set('auth.isLoading', false)
      router.go('/messenger');
    } catch (e: any) {
      // store.set('auth.error', e.message)
      // store.set('auth.isLoading', false)
      console.error(e);
    }
  }

  async signup(data: Record<string, string>) {
    try {
      await this.api.signup(data);
      console.log(data, ' signup')
      await this.fetchUser();

      router.go('/chat');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set('user', user);
    } catch (error) {
      console.error("Ошибка:", error);
    }
    // const user = await this.api.read();
    //
    // store.set('user', user);
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
