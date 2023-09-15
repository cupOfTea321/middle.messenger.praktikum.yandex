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

export class ChatMain extends Block {
    constructor() {
        super({
            ava: avatar,
            camera,
            sawIcon,
            sandIcon,
            addIcon,
            pointsIcon
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
interface LoginValues {
    login: string;
}
export class ChatSearchBase extends Block {

    constructor(props) {
        let login: LoginValues={
            login: '',
        }
        super({

            //     ...props,
            // events: {
            //     click: props.onClick
            // },
                onClickChat: () => {
                    render('profile')
                    console.log('onClick')
                },
                chats: [
                    {
                        ava: avatar,
                        name: 'Андрей',
                        you: false,
                        message: 'Изображение',
                        time: '10:49',
                        newMessage: 2,

                    },
                    {
                        ava: avatar,
                        name: 'Киноклуб',
                        you: true,
                        message: 'стикер',
                        time: '10:49',
                        newMessage: false
                    },
                    {
                        ava: avatar,
                        name: 'Илья',
                        you: false,
                        message: 'Друзья, у меня для вас особенный выпуск новостей!',
                        time: '15:12',
                        newMessage: 4
                    },
                    {
                        ava: avatar,
                        name: 'Вадим',
                        you: true,
                        message: 'Круто!',
                        time: 'Пт',
                        newMessage: false
                    },
                    {
                        ava: avatar,
                        name: 'тет-а-теты',
                        you: false,
                        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
                        time: 'Ср',
                        newMessage: false
                    },
                    {
                        ava: avatar,
                        name: '1, 2, 3',
                        you: false,
                        message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
                        time: 'Пн',
                        newMessage: false
                    },
                ],
            onSubmit: (e: MouseEvent)=>{
                e.preventDefault();
            },
            searchUser:(e: FocusEvent)=>{
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
                { messages: 'asd' },
            ],
            addUser:()=>{
                console.log(login.login)
                ChatsController.create(login.login);
            },
            },
        );
    }

    render() {
        return this.compile(template2, this.props);
    }
}
const withChat = withStore((state) => ({
    selectChat: state.selectedChat,
    chatName: state.selectedChat,
    chats: state.chats?.map((item, index)=>{
        return {
            onChat:()=>{
                // ChatsController.delete(item.id)
                ChatsController.selectChat(item.id)
                ChatsController.selectChatName(item.title)
            },
            ava: item.avatar ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}` : avatar,
            name: item.title,
            newMessage: item.unread_count,
            message: item.last_message
        }
    })
}))
export const ChatSearch = withChat(ChatSearchBase);
export class ChatItem extends Block {
    render() {
        return this.compile(template3, this.props);
    }
}
