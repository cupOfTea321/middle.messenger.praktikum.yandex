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


registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Form', Form);
registerComponent('Link', Link);
registerComponent('ChatMain', ChatMain);
registerComponent('ChatSearch', ChatSearch);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileAside', ProfileAside);
registerComponent('ProfileMain', ProfileMain);
registerComponent('ProfileItem', ProfileItem);
registerComponent('ChangeItem', ChangeItem);

enum Routes {
    Index = '/',
    SignUp = '/sign-up',
    Profile = '/profile',
    Chat = '/messenger',
    ChangeInfo = '/settings',

}


window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Index, AuthPage)
        .use(Routes.SignUp, RegistrationPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.Chat, ChatPage)
        .use(Routes.ChangeInfo, ChangeData)

    let isProtectedRoute = false;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.SignUp:
            isProtectedRoute = false;
            break;
    }

    try {
        await AuthController.fetchUser();

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

