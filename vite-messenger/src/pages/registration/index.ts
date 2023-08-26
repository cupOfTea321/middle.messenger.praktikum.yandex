import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import {Form} from "../../components/Form";
import template from "./reg.hbs";
import {render} from "../../utils/render";
// import styles from '../../components/Button/button.css'
interface RegistrationPageProps {
    title: string;
}
interface LoginItems {
    name: string;
    label: string;
}
export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props) {
        super({
            type: 'button',
            ...props,
            // myBtn: {
            //     label: 'myBtn',
            // },

            onBtnClick: () => {
                console.log('ds')
                this.refs.authBtn.setProps({
                    label: 'Update'
                })
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
                {name: 'email',label: 'Почта'},
                {name: 'login',label: 'Логин'},
                {name: 'first_name',label: 'Имя'},
                {name: 'second_name',label: 'Фамилия'},
                {name: 'phone',label: 'Телефон'},
                {name: 'password',label: 'Пароль'},
                {name: 'password2',label: 'Пароль (ещё раз)'},
            ]
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
