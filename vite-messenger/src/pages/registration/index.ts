import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import {Form} from "../../components/Form";
import template from "./reg.hbs";
import {render} from "../../utils/render";
import Field from "../../testComponents/Field";
// import styles from '../../components/Button/button.css'
interface RegistrationPageProps {
    title: string;
}
export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props) {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/
        const nameRegExp = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/
        const passRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
        const phoneRegExp =  /^\+?\d{10,15}$/

        super({
            type: 'button',
            ...props,

            onBtnClick: () => {
                render('auth');
            },

            buttons: [
                {
                    label: 'Зарегистрироваться',
                    class: 'first-button',
                    onClick: () => {
                        console.log('login')
                    }
                },
                {
                    label: 'Войти',
                    class: 'second-button',
                },
            ],
            fields: [
                {
                    name: 'email',
                    label: 'Почта',
                    ref: 'regEmail',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regEmail as Field).checkMatches(target.value, this.refs.regEmail, emailRegExp, 'введите корректную почту');
                    },
                },
                {
                    name: 'login',
                    label: 'Логин',
                    ref: 'regLogin',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regLogin as Field).checkMatches(target.value, this.refs.regLogin, loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                    },
                },
                {
                    name: 'first_name',
                    label: 'Имя',
                    ref: 'regFirst',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regFirst as Field).checkMatches(target.value, this.refs.regFirst, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    name: 'second_name',
                    label: 'Фамилия',
                    ref: 'regSecond',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regSecond as Field).checkMatches(target.value, this.refs.regSecond, nameRegExp, 'введите корректную фамилию');
                    },
                },
                {
                    name: 'phone',
                    label: 'Телефон',
                    ref: 'regPhone',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regPhone as Field).checkMatches(target.value, this.refs.regPhone, phoneRegExp, 'введите корректную фамилию');
                    },
                },
                {
                    name: 'password',
                    label: 'Пароль',
                    ref: 'regPass',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regPass as Field).checkMatches(target.value, this.refs.regPass, passRegExp, 'пароль длиною 8-40 символов, содержит заглавную и цифру');
                    },
                },
                {
                    name: 'password2',
                    label: 'Пароль (ещё раз)',
                    ref: 'regPass2',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.regPass2 as Field).checkMatches(target.value, this.refs.regPass2, passRegExp, 'пароль длиною 8-40 символов, содержит заглавную и цифру');
                    },
                },
            ]
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
