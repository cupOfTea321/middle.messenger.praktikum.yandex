import Block from '../../utils/Block';
import template from "./profile.hbs";

interface ChatPageProps {
    title: string;
}

export class ProfilePage extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
