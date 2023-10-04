import {Button} from "./components/Button";
import {registerComponent} from "./utils/resgiterComponent";
import Field from "./components/Field";
import Form from "./components/Form";
import {ChatItem, ChatMain, ChatSearch} from "./components/Chat";
import {ChangeItem, ProfileAside, ProfileItem, ProfileMain} from "./components/Profile";
import Router from "./utils/Router";
import {AuthPage} from "./pages/auth";
import {RegistrationPage} from "./pages/registration";
import {ProfilePage} from "./pages/profile";
import {ChatPage} from "./pages/chat";
import {ChangeData} from "./pages/changeData";
import AuthController from "./controllers/AuthController";
import {Link} from "./components/Link";
import {ChangePass} from "./pages/changePass";
import {ProfileAvatar} from "./components/ProfileAvatar";
import {Input} from "./components/Input";
import {Message} from "./components/Message";
import {PopupWrap} from "./components/PopupWrap";
import {ChatUserItem} from "./components/ChatUserItem";
import ChatsController from "./controllers/ChatsController";


registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Input', Input);
registerComponent('Form', Form);
registerComponent('Link', Link);
registerComponent('ChatMain', ChatMain);
registerComponent('ChatSearch', ChatSearch);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileAside', ProfileAside);
registerComponent('ProfileMain', ProfileMain);
registerComponent('ProfileItem', ProfileItem);
registerComponent('ProfileAvatar', ProfileAvatar);
registerComponent('ChangeItem', ChangeItem);
registerComponent('Message', Message);
registerComponent('PopupWrap', PopupWrap);
registerComponent('ChatUserItem', ChatUserItem);

enum Routes {
    Index = '/',
    SignUp = '/sign-up',
    Profile = '/profile',
    Chat = '/messenger',
    ChangeInfo = '/settings',
    ChangePass = '/pass-settings',

}


window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Index, AuthPage)
        .use(Routes.SignUp, RegistrationPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.Chat, ChatPage)
        .use(Routes.ChangeInfo, ChangeData)
        .use(Routes.ChangePass, ChangePass)

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.SignUp:
            isProtectedRoute = false;
            break;
    }

    try {
        await AuthController.fetchUser();
        await ChatsController.fetchChats();
        Router.start();

        if (!isProtectedRoute) {
            Router.go(Routes.Profile)
        }
    } catch (e) {
        Router.start();

        if (isProtectedRoute) {
            Router.go(Routes.Index);
        }
    }

});

