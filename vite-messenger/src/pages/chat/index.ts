import Block from '../../utils/Block';
import template from "./chat.hbs";

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block<ChatPageProps> {
    render() {
        return this.compile(template, this.props);
    }
}
