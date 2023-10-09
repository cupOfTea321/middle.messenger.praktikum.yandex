import Block from '../../utils/Block';
import template from "./chat.hbs";
import ChatsController from "../../controllers/ChatsController";

export class ChatPage extends Block {
    constructor() {
        super({});
    }

    protected init() {
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
