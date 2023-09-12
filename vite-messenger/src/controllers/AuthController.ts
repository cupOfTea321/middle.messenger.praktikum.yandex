import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import MessagesController from './MessagesController';
import router from "../utils/Router";
import store from "../utils/Store";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  // валидация формы происходит здесь в catch
  async signin(data: SigninData) {
    // store.set('auth.error', null)
    // store.set('auth.isLoading', true)
    try {
      await this.api.signin(data);

      await this.fetchUser();
      // store.set('auth.isLoading', false)
      router.go('/profile');
    } catch (e: any) {
      // store.set('auth.error', e.message)
      // store.set('auth.isLoading', false)
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
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
