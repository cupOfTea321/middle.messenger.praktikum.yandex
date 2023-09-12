import Block from '../../utils/Block';
import template from "./profile.hbs";
import {withStore} from "../../utils/Store";
import {User} from "../../api/AuthAPI";

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
interface ProfileProps extends User {}
export class ProfilePage extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }))
