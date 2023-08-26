import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import template from "./auth.hbs";
import {render} from "../../utils/render";

// import styles from '../../components/Button/button.css'
interface AuthPageProps {
    title: string;
}

export class AuthPage extends Block<AuthPageProps> {
    constructor(props) {
        let myValue = {
            login: '',
            pass: '',
        }
        super({
                type: 'button',
                ...props,
                onBtnClick: (e) => {
                    console.log(myValue)
                    render('reg');
                },
                form: {
                    onSubmit: (event) => {
                        // event.preventDefault()
                        // console.log(event.currentTarget)
                    },
                },
                buttons: [
                    {
                        label: 'Авторизоваться',
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
                        name: 'login',
                        label: 'Логин',
                        ref: 'authLog',
                        onChange: (e) => {
                            myValue.login = e.target.value
                        },
                        onFocusOut: (e) => {
                            myValue.login = e.currentTarget?.value
                            // console.log(e.currentTarget?.value)
                        },
                    },
                    {
                        name: 'password',
                        label: 'Пароль',
                        ref: 'authPass',
                        onFocusOut: (e) => {
                            myValue.pass = e.currentTarget?.value
                            // console.log(e.currentTarget?.value)
                        },
                    },
                ]
            },
        );
    }
    render() {
        return this.compile(template, this.props);
    }
}
