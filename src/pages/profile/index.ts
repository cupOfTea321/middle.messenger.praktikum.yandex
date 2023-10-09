import Block from '../../utils/Block';
import template from "./profile.hbs";
import {withStore} from "../../utils/Store";


class ProfilePageBase extends Block {

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
