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
import {Message} from "../Message";
import UserController from "../../controllers/MutateController";
import {User} from "../../api/AuthAPI";

interface MessengerProps {
    selectedChat: number | undefined;
    messages: MessageInfo[];
    userId: number;
}

export class ChatMainBase extends Block {
    constructor(props) {
        const val = {
            message: '',
        }
        const valUser = {
            login: '',
        }
        super({
            ...props,
            ava: avatar,
            camera,
            sawIcon,
            sandIcon,
            addIcon,
            pointsIcon,
            isMine: props.isMine,
            componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
                // this.children.messages = this.createMessages(newProps);

                return true;
            },
            onChange: (e: FocusEvent) => {
                const target = e.target as HTMLInputElement;
                val.message = target.value;
            },
            sendMessage:(e: FocusEvent)=>{
                e.preventDefault();
                if(val.message.length === 0 ){
                    this.props.errMes = true;
                    console.log('пустое поле');
                    return;
                }
                this.props.errMes = false;
                // this.props.isMine = false
                MessagesController.sendMessage(this.props.selectedChat!, val.message);

                console.log(this.props);
                val.message = ''
            },
            closeChat:() => {
                const selectedChatId = props.selectedChat;
                if (selectedChatId !== undefined) {
                    ChatsController.delete(selectedChatId);
                } else {
                    console.error('selectedChatId is undefined');
                }
            },
            searchUser:(e: FocusEvent) => {
                const target = e.target as HTMLInputElement;
                valUser.login = target.value;
            },
            addUser:()=>{
                UserController.searchUser((valUser as User), props.selectedChat);
            },
            addAvatar:(e: Event)=>{
                const fileInput = e.target as HTMLInputElement;
                const files = fileInput.files;

                if (files && files.length > 0) {
                    const selectedFile = files[0];
                    const chatId: number | undefined = props.selectedChat;

                    ChatsController.addAvatar(chatId, selectedFile);
                } else {
                    console.error('Не выбран файл');
                }
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
const withSelectedChatMessages = withStore(state => {
    const selectedChatId = state.selectedChat;
    // const selectedChat = state.chats?.find(chat => chat.id === selectedChatId);
    // const avatarImg = selectedChat ? selectedChat.avatar : undefined;
    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            selectedChatName: undefined,
            userId: state.user.id,
            click: () => {
                console.log(state)
                const input =this.children.input as Input;
                const message = input.getValue();

                input.setValue('');

                MessagesController.sendMessage(this.props.selectedChat!, message);
            }
        };
    }
    const messages = (state.messages || {})[selectedChatId].map((item)=>{
        return {...item, isMine: state.user.id  === item.user_id}
    })
    return {
        messages: messages || [],
        selectedChat: state.selectedChat,
        userId: state.user.id,
        selectedChatName: state.selectedChatName,
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
