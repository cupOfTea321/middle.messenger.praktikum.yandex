import Block from '../../utils/Block';
import {ProfileAside} from "../../components/profile/ProfileAside";
import {ProfileMain} from "../../components/profile/ProfileMain";
import template from "./profile.hbs";

interface ChatPageProps {
    title: string;
}

export class ProfilePage extends Block<ChatPageProps> {
    render() {
        return this.compile(template, this.props);
    }
}
