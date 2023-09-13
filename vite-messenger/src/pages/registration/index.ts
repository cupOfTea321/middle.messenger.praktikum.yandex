import Block from '../../utils/Block';
import template from "./reg.hbs";
import {render} from "../../utils/render";
import Field from "../../components/Field";
import {SigninData, SignupData} from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";

interface RegistrationPageProps {
    title: string;
}
export class RegistrationPage extends Block {
    constructor() {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/
        const nameRegExp = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/
        const passRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
        const phoneRegExp =  /^\+?\d{10,15}$/

        const myValue:  Record<string, string> = {
            email:  '',
            login: '',
            first_name: '',
            second_name:'',
            phone: '',
            password: '',
            password2: '',
        }

        super({
            type: 'button',
            onSubmit: (e: MouseEvent) => {
                e.preventDefault();
                const fieldsName = this.props.fields;
                let hasErrors = false

                for(let i = 0;  i < fieldsName.length; i++ ){
                    const nameRef = this.props.fields[i].ref;
                    const fieldName = fieldsName[i].name;
                    if (!myValue[fieldName]?.length) {
                        this.refs[nameRef].setProps({
                            error: 'пустое поле',
                            req: true,
                        });
                        hasErrors = true;
                    }
                }
                if (hasErrors) {
                    return;
                }

                AuthController.signup(myValue as SignupData);
            },
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.email = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.login = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.first_name = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.second_name = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.phone = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.password = target.value;
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
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement
                        myValue.password2 = target.value;
                    },
                },
            ]
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
