

import {AuthPage} from "../pages/auth";
import {RegistrationPage} from "../pages/registration";
import {ChatPage} from "../pages/chat";
import {ProfilePage} from "../pages/profile";
import {ChangeData} from "../pages/changeData";
import {ErrorPage} from "../pages/error";

const ROUTES = {
    'auth': AuthPage,
    'reg': RegistrationPage,
    'chat': ChatPage,
    'profile': ProfilePage,
    'change': ChangeData,
    'error': ErrorPage,
}

export function render(name: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!;

    root.innerHTML = '';

    const Page = ROUTES[name];

    const page = new Page();

    root.append(page.getContent()!);

    page.dispatchComponentDidMount();
}
