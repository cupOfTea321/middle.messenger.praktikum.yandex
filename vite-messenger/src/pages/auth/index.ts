import Block from '../../utils/Block';
import {Button} from '../../components/Button';
import template from "./auth.hbs";
import {render} from "../../utils/render";
import Field from "../../testComponents/Field";

// import styles from '../../components/Button/button.css'
interface AuthPageProps {
    title: string;
}

export class AuthPage extends Block<AuthPageProps> {

    constructor(props) {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
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
                        error: 'Ошибка',
                        ref: 'authLog',
                        // req: true,
                        onChange: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement
                            // myValue.login = target.value
                            console.log('onChange')
                            myValue.login = target.value;
                        },
                        onFocusOut: (e: FocusEvent) => {
                            // myValue.login = e.currentTarget?.value
                            const target = e.target as HTMLInputElement;
                            // myValue.login = target?.value
                            target && (this.refs.authLog as Field).checkMatches(target.value, this.refs.authLog, loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                        },
                        onFocusIn: () => {
                            this.loginValid(myValue.login , 'authLog')
                            console.log(this.refs.authLog)
                            console.log('onFocusIn')
                        }
                    },
                    {
                        name: 'password',
                        label: 'Пароль',
                        ref: 'authPass',
                        onChange: (e) => {
                            const target = e.target as HTMLInputElement;
                            myValue.pass = target.value
                            console.log('onChange')
                        },
                    },
                ]
            },
        );
    }
    loginValid(val, ref){
        // console.log(val.length, ', val')
        // if (val?.length < 3){
        //     ref.setProps({
        //         error: "Error",
        //         req: false,
        //         label: 'err',
        //     })
        //     console.log('val < 3')
        // }
    }
    render() {
        return this.compile(template, this.props);
    }
}
