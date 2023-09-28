import Block from "../../utils/Block";
import basket from "../../../assets/trash.png";
import template from "./chatUsetItem.hbs";

interface ChatUserItemProps {
    onClick?: () => void;
    login: string;
    events: {
        click: () => void;
    };
}

export class ChatUserItem extends Block{
    constructor(props: ChatUserItemProps) {
        super({
            ...props,
            login:props.login,
            basketImg: basket,
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
