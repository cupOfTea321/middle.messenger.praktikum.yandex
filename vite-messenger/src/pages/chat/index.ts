import Block from '../../utils/Block';
import template from "./chat.hbs";
import ChatsController from "../../controllers/ChatsController";
import {Messenger} from "../../components/Messenger";

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block {
    constructor() {
        super({});
    }

    protected init() {
        // this.children.chatsList = new ChatsList({ isLoaded: false });

        // this.children.messenger = new Messenger({});

        ChatsController.fetchChats().finally(() => {
            (this.children.chatsList as Block).setProps({
                isLoaded: true
            })
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
