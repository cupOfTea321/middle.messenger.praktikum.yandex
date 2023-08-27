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

export class ChatMain extends Block {
    constructor(props) {
        super({
            ...props,
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

export class ChatSearch extends Block {
    constructor(props) {
        super({

                ...props,
            events: {
                click: props.onClick
            },
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
                ]
            },
        );
    }

    render() {
        return this.compile(template2, this.props);
    }
}

export class ChatItem extends Block {
    render() {
        return this.compile(template3, this.props);
    }
}
