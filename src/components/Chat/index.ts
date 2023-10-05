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
import ChatsController from "../../controllers/ChatsController";
import store, {withStore} from "../../utils/Store";
import MessagesController from "../../controllers/MessagesController";
import UserController from "../../controllers/MutateController";
import {User} from "../../api/AuthAPI";


class ChatMainBase extends Block {
    constructor(props: any) {
        const val = {
            message: '',
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
            popupRef: "popupRef",
            componentDidUpdate(): boolean {
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
                MessagesController.sendMessage(this.props.selectedChat!, val.message);

                val.message = ''
            },




        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
const withSelectedChatMessages = withStore(state => {
    // console.log(state)

    const valUser = {
        login: '',
    }
    const selectedChatId = state.selectedChat;
    const selectedChat = state.chats?.find(chat => chat.id === selectedChatId);
    const avatarImg = selectedChat ? selectedChat.avatar : undefined;
    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            selectedChatName: undefined,
            userId: state.user.id,
        };
    }
    const usersWithLog = (selectedChat ? selectedChat.users : null) || [];
    usersWithLog.forEach(user => {
        user.deleteUser = () => {
            if (state.selectedChat !== undefined) {
                ChatsController.deleteUser(state.selectedChat, user.id);
            }
        };
    });
    const messages = (state.messages || {})[selectedChatId].map((item)=>{
        return {...item, isMine: state.user.id  === item.user_id}
    })
    return {
        messages: messages || [],
        selectedChat: state.selectedChat,
        userId: state.user.id,
        ava: avatarImg ? `https://ya-praktikum.tech/api/v2/resources/${avatarImg}` : avatar,
        selectedChatName: state.selectedChatName,
        isOpenPopup: state.isOpenPopup,
        users: usersWithLog,
        openPopup:()=>{
            console.log('openPopup')
            store.set("isOpenPopup", true)
        },
        closePopup:()=>{
            store.set("isOpenPopup", false)
        },
        closeChat:() => {
            const selectedChatId = selectedChat?.id;
            if (selectedChatId !== undefined) {
                ChatsController.delete(selectedChatId);
            } else {
                console.error('selectedChatId is undefined');
            }
        },
        addUser:()=>{
            console.log('addUser')
            UserController.searchUser((valUser as User), selectedChat);
        },
        searchUser:(e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            valUser.login = target.value;
        },
        addAvatar:(e: Event)=>{
            const fileInput = e.target as HTMLInputElement;
            const files = fileInput.files;

            if (files && files.length > 0) {
                const selectedFile = files[0];
                const chatId: number | undefined = selectedChat?.id;
                ChatsController.addAvatar(chatId, selectedFile);
            } else {
                console.error('Не выбран файл');
            }
        },

    };
});

export const ChatMain = withSelectedChatMessages(ChatMainBase);
interface LoginValues {
    login: string;
}

export class ChatSearchBase extends Block {

    constructor(props: any) {

        const login: LoginValues = {
            login: '',
        }
        super({
                onSubmit: (e: MouseEvent) => {
                    e.preventDefault();
                },
                searchUser: (e: FocusEvent) => {
                    const target = e.target as HTMLInputElement;
                    login.login = target.value;
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
                addUser: (e: any) => {
                    e.preventDefault()
                    ChatsController.create(login.login);
                },
                label: 'Отправить',
                type: 'button',

            },
        );
    }
    render() {
        const chats = this.props.chats?.map((chat: any) => chat)
        return this.compile(template2,
            {
                ...this.props,
                chats

            }
            );

    }
}

const withChat = withStore((state) => ({
    id: state.chats?.map(item => item.id),
    selectChat: state.selectedChat,
    chatName: state.selectedChat,
    chats: state.chats?.map((item) => {
        return {
            onChat: () => {
                console.log('onChat')
                // ChatsController.delete(item.id)
                ChatsController.selectChat(item.id)
                ChatsController.selectChatName(item.title)
                ChatsController.getChatUsers(item.id);
            },
            click: () => {
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
// window.ChatSearch = new ChatSearch()
export class ChatItemBase extends Block {

    constructor(props: any) {
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
