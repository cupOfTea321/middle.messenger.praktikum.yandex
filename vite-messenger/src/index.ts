

import {render} from "./utils/render";
import {ChatPage} from "./pages/chat/chatPage";
import {ProfilePage} from "./pages/profile/ProfilePage";
import {ChangeData} from "./pages/profileChange/ChangeData";
import {ErrorPage} from "./pages/error/ErrorPage";
import {Button} from "./testComponents/Button";
import Card from "./testComponents/Card";
import {registerComponent} from "./utils/resgiterComponent";
import Field from "./testComponents/Field";
import Form from "./testComponents/Form";

// window.addEventListener('DOMContentLoaded', () => {
//     const root = document.querySelector('#root')!;
//
//     const authPage = new Index({ title: 'Home page' });
//
//     root.append(authPage.getContent()!);
//
//     authPage.dispatchComponentDidMount();
// });
registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Card', Card);
registerComponent('Form', Form);

window.addEventListener('DOMContentLoaded', () => {
    render('auth')
});


// switch (window.location.pathname) {
//     case "/":
//         render("#app", Index);
//         break;
//     case "/registration":
//         render("#app", Index);
//         break;
//     case "/chat":
//         render("#app", ChatPage);
//         break;
//     case "/profile":
//         render("#app", ProfilePage);
//         break;
//     case "/change":
//         render("#app", ChangeData);
//         break;
//     default:
//         render("#app", ErrorPage);
//         break;
// }
