import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import {ChatMain} from "../../components/chat/ChatMain";
import {ChatSearch} from "../../components/chat/ChatSearch";
import template from "./chat.hbs";

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block<ChatPageProps> {
    // constructor(props: ChatPageProps) {
    //     super('div', props);
    // }
    render() {
        return this.compile(template, this.props);
    }
//     render() {
//         this.children.chatSearch = new ChatSearch(this.props);
//         this.children.chatMain = new ChatMain(this.props);
//         return this.compile(`
//             <div class="Chat">
//                 {{{ this.chatSearch }}}
//                 {{{ this.chatMain }}}
//             </div>
//
//
// <script defer type="module" src="Chat.ts"></script>
//     `, this.props);
//     }
}
