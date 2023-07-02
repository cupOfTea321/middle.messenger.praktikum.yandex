import Block from '../../utils/Block';
import {ProfileAside} from "../../components/profile/ProfileAside";
import {ProfileMain} from "../../components/profile/ProfileMain";

interface ChatPageProps {
    title: string;
}

export class ProfilePage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    render() {
        this.children.profileAside = new ProfileAside(this.props);
        this.children.profileMain = new ProfileMain(this.props);
        return this.compile(`
            <main class="profile">
                {{{ this.profileAside }}} 
                {{{ this.profileMain }}} 
            </main>
        

    `, this.props);
    }
}
