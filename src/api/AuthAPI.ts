import BaseAPI from './BaseAPI.ts';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  email: string | any;
  login: string | any;
  first_name: string | any;
  second_name: string | any;
  phone: string | any;
  display_name: string | any;
  password: string | any;
  password2: string | any;

}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  chatId?: number;
  deleteUser?: ()=> void;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: Record<string, string>) {
    return this.http.post('/signin', data);
  }


  signup(data: Record<string, string>) {
    return this.http.post('/signup', data);
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
export default new AuthAPI();
