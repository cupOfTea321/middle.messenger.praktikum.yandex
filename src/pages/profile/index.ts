import Block from '../../utils/Block';
import template from "./profile.hbs";
import store, {withStore} from "../../utils/Store";
import {User} from "../../api/AuthAPI";
import {Button} from "../../components/Button";
import AuthController from "../../controllers/AuthController";

interface ChatPageProps {
    title: string;
}

const userFields = [
    'id',
    'first_name',
    'second_name',
    'display_name',
    'login',
    'avatar',
    'email',
    'phone'
] as Array<keyof ProfileProps>;

interface ProfileProps extends User {
}

class ProfilePageBase extends Block {
    // init() {
    //     this.children.logoutButton = new Button({
    //         label: 'Выйти',
    //         events: {
    //             click: () => {
    //                 AuthController.logout();
    //             }
    //         }
    //     })
    // }
    constructor() {
        super({

        })
    }


    render() {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({...state.user}))
export const ProfilePage = withUser(ProfilePageBase);
