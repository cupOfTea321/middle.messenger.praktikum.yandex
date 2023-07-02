import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import {ChatMain} from "../../components/chat/ChatMain";
import {ChatSearch} from "../../components/chat/ChatSearch";

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    render() {
        this.children.chatSearch = new ChatSearch(this.props);
        this.children.chatMain = new ChatMain(this.props);
        return this.compile(`
            <div class="chat">
                {{{ this.chatSearch }}} 
                {{{ this.chatMain }}} 
            </div>
        

<script defer type="module" src="chat.ts"></script>
    `, this.props);
    }
}
