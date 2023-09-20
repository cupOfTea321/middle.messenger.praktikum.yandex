import template from "./chatMain.hbs";
import template2 from "./chatSearch.hbs";
import template3 from "./chatItem.hbs";
import Block from "../../utils/Block";
import avatar from "../../../assets/Ellipse 19.png";
import camera from "../../../assets/camera.png";
import sawIcon from "../../../assets/sawIcon.png";
import addIcon from "../../../assets/addIcon.png";
import sandIcon from "../../../assets/sandIcon.png";
import pointsIcon from "../../../assets/pointsIcon.png";
import {render} from "../../utils/render";
import ChatsController from "../../controllers/ChatsController";
import {withStore} from "../../utils/Store";
import {Input} from "../Input";
import {Button} from "../Button";
import MessagesController, { Message as MessageInfo } from "../../controllers/MessagesController";

interface MessengerProps {
    selectedChat: number | undefined;
    messages: MessageInfo[];
    userId: number;
}

export class ChatMainBase extends Block {
    constructor(props) {
        super({
            ...props,
            ava: avatar,
            camera,
            sawIcon,
            sandIcon,
            addIcon,
            pointsIcon,

        });
    }
    componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        this.children.messages = this.createMessages(newProps);

        return true;
    }
    createMessages(props: MessengerProps) {
        return props.messages.map(data => {
            // return new Message({...data, isMine: props.userId === data.user_id });
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
const withSelectedChatMessages = withStore(state => {
    const selectedChatId = state.selectedChat;
    console.log((state.messages || {})[selectedChatId])
    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user.id,
            click: () => {
                const input =this.children.input as Input;
                const message = input.getValue();

                input.setValue('');

                MessagesController.sendMessage(this.props.selectedChat!, message);
            }
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.id
    };
});

export const ChatMain = withSelectedChatMessages(ChatMainBase);
interface LoginValues {
    login: string;
}

export class ChatSearchBase extends Block {

    constructor(props) {

        let login: LoginValues = {
            login: '',
        }
        super({
                onClickChat: () => {
                    render('profile')
                    console.log('onClick')
                },
                onSubmit: (e: MouseEvent) => {
                    e.preventDefault();
                },
                searchUser: (e: FocusEvent) => {
                    const target = e.target as HTMLInputElement;
                    login.login = target.value;
                },
                sendMessage: (e: FocusEvent) => {
                    const target = e.target as HTMLInputElement;
                    // val.message = target.value;
                },
                searchRef: "searchRef",
                // settingImg: setting,
                errMes: false,

                ava: props.ava,
                message: props.message,
                selectChat: props.selectChat,
                selectChatName: props.selectChatName,

                chat: [
                    {messages: 'asd'},
                ],
                addUser: () => {
                    console.log(login.login)
                    ChatsController.create(login.login);
                },
                label: 'Отправить',
                type: 'button',

            },
        );
    }
    render() {
        return this.compile(template2,
            {
                ...this.props,
                chats: this.props.chats?.map(chat => chat)

            }
            );

    }
}

const withChat = withStore((state) => ({
    id: state.chats?.map(item => item.id),
    selectChat: state.selectedChat,
    chatName: state.selectedChat,
    chats: state.chats?.map((item, index) => {
        return {
            onChat: () => {
                console.log('onChat')
                // ChatsController.delete(item.id)
                ChatsController.selectChat(item.id)
                ChatsController.selectChatName(item.title)
            },
            click: (target) => {
                console.log(target)
                // const input = this.refs.searchRef as Input;
                const message = '';
                //
                // input.setValue('');

                MessagesController.sendMessage(item.id, message);
            },
            id: item.id,
            ava: item.avatar ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}` : avatar,
            name: item.title,
            newMessage: item.unread_count,
            message: item.last_message
        }
    })
}))
export const ChatSearch = withChat(ChatSearchBase);
window.ChatSearch = new ChatSearch()
export class ChatItemBase extends Block {

    constructor(props) {
        super({
            ...props,
            events: {
                click: props.onClick,
            }
        });
        // console.log(props)
    }
    render() {
        return this.compile(template3,
            {
                ...this.props,
                isSelected: this.props.id === this.props.selectedChat?.id
            });
    }
}
export const withSelectedChat = withStore(state => (
    {selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)
    }));
export const ChatItem = withSelectedChat(ChatItemBase);
