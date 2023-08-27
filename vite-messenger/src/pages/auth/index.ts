import Block from '../../utils/Block';
import template from "./auth.hbs";
import {render} from "../../utils/render";
import Field from "../../testComponents/Field";

interface AuthPageProps {
    title: string;
}

export class AuthPage extends Block<AuthPageProps> {

    constructor(props) {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const passRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/

        let myValue = {
            login: '',
            pass: '',
        }
        super({

                ...props,
                onBtnClick: (e) => {
                    render('reg');
                },
                onSubmit: (e: MouseEvent) => {
                    e.preventDefault();
                    let fieldsName = this.props.fields;
                    let hasErrors = false

                    for (let i = 0; i < fieldsName.length; i++) {
                        for (let key in myValue) {
                            let nameRef = this.props.fields[i].ref;

                            if (key === fieldsName[i].name && myValue[key].length === 0) {

                                this.refs[nameRef].setProps({
                                    error: 'пустое поле',
                                    req: true,
                                })

                                hasErrors = true;
                            }
                        }
                    }
                    if (hasErrors) {
                        return;
                    }
                    console.log(myValue);
                    render('chat')
                },
                fields: [
                    {
                        name: 'login',
                        label: 'Логин',
                        // error: 'Ошибка',
                        ref: 'authLog',
                        onChange: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement
                            myValue.login = target.value;
                        },
                        onFocusOut: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement;
                            target && (this.refs.authLog as Field).checkMatches(target.value, this.refs.authLog, loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                        },
                    },
                    {
                        name: 'password',
                        label: 'Пароль',
                        ref: 'authPass',
                        onChange: (e) => {
                            const target = e.target as HTMLInputElement;
                            myValue.pass = target.value
                        },
                        onFocusOut: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement;
                            target && (this.refs.authPass as Field).checkMatches(target.value, this.refs.authPass, passRegExp, 'пароль длиною 8-40 символов, содержит заглавную и цифру');
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
