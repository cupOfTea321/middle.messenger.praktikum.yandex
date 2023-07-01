
import { AuthPage } from './pages/auth/authPage';
import { RegistrationPage } from './pages/registration/registrationPage';
import render from "./utils/render";

// window.addEventListener('DOMContentLoaded', () => {
//     const root = document.querySelector('#root')!;
//
//     const authPage = new AuthPage({ title: 'Home page' });
//
//     root.append(authPage.getContent()!);
//
//     authPage.dispatchComponentDidMount();
// });

switch (window.location.pathname) {
    case "/":
        render("#root", AuthPage);
        break;
    case "/registration":
        render("#root", RegistrationPage);
        break;
    default:
        render("#root", AuthPage);
        break;
}
