
import { AuthPage } from './pages/auth/authPage';
import { RegistrationPage } from './pages/registration/registrationPage';
import render from "./utils/render";
import {ChatPage} from "./pages/chat/chatPage";
import {ProfilePage} from "./pages/profile/ProfilePage";
import {ChangeData} from "./pages/profileChange/ChangeData";
import {ErrorPage} from "./pages/error/ErrorPage";

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
        render("#app", AuthPage);
        break;
    case "/registration":
        render("#app", RegistrationPage);
        break;
    case "/chat":
        render("#app", ChatPage);
        break;
    case "/profile":
        render("#app", ProfilePage);
        break;
    case "/change":
        render("#app", ChangeData);
        break;
    default:
        render("#app", ErrorPage);
        break;
}
