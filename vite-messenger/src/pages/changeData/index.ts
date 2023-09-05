import Block from '../../utils/Block';
import template from "./change.hbs";
import asideLine from '../../../assets/asideLine.png'
import profileImg from '../../../assets/profileImg.png'
import {render} from "../../utils/render";
import Field from "../../components/Field";

interface ChangeItems {
    first: string;
    second: string;
    name: string
}
export class ChangeData extends Block {

    constructor() {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/
        const nameRegExp = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/
        const phoneRegExp =  /^\+?\d{10,15}$/
        super({
            asideLine,
            profileImg,
            onClickProfile: () => {
                render('profile')
            },
            fields: [
                {
                    first: 'Почта',
                    second: 'pochta@yandex.ru',
                    name: 'email',
                    ref: 'changeEmail',

                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.changeEmail as Field).checkMatches(target.value, this.refs.changeEmail, emailRegExp, 'введите корректную почту');
                    },
                },
                {
                    first: 'Логин',
                    second: 'ivanivanov',
                    name: 'login',
                    ref: 'changeLog',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.changeLog as Field).checkMatches(target.value, this.refs.changeLog, loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                    },
                },
                {
                    first: 'Имя',
                    second: 'Иван',
                    name: 'first_name',
                    ref: 'firstName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.firstName as Field).checkMatches(target.value, this.refs.firstName, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    first: 'Фамилия',
                    second: 'Иванов',
                    name: 'second_name',
                    ref: 'lastName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.lastName as Field).checkMatches(target.value, this.refs.lastName, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    first: 'Имя в чате',
                    second: 'Иван',
                    name: 'display_name',
                    ref: 'chatName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.chatName as Field).checkMatches(target.value, this.refs.chatName, nameRegExp, 'введите корректное имя');
                    },
                },
            ],
        });

    }
    render() {
        return this.compile(template, this.props);
    }
}
