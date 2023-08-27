// import Block from './Block';
//
// function render(query: string, component: Block) {
//     const root = document.querySelector(query) as HTMLElement;
//
//     root.innerHTML = ''
//     const authPage = new component({ });
//
//     root.appendChild(authPage!.getContent());
//
//     authPage.dispatchComponentDidMount();
//     return root
// }
//
// export default render;


import {HomePage} from "../pages/Home";
import {LoginPage} from "../pages/Login";
import {AuthPage} from "../pages/auth";
import {RegistrationPage} from "../pages/registration";
import {ChatPage} from "../pages/chat";

const ROUTES = {
    // 'home': HomePage,
    // 'login': LoginPage,
    'auth': AuthPage,
    'reg': RegistrationPage,
    'chat': ChatPage,
}

export function render(name: keyof typeof ROUTES) {
    const root = document.querySelector('#app')!;

    root.innerHTML = '';

    const Page = ROUTES[name];

    const page = new Page();

    root.append(page.getContent()!);

    page.dispatchComponentDidMount();
}
