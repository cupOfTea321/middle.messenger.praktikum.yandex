import Block from '../../utils/Block';
import template from "./auth.hbs";
import {render} from "../../utils/render";
import Field from "../../components/Field";
import AuthController from "../../controllers/AuthController";
import {SigninData} from "../../api/AuthAPI";
import Router from "../../utils/Router";



export class AuthPage extends Block {

    constructor() {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const passRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/

        const myValue:Record<string, string> = {
            login: '',
            password: '',
        }
        super({

                onBtnClick: () => {
                    render('reg');
                    Router.go('/chat')
                },
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

                    AuthController.signin(myValue as SigninData);


                    // render('chat')
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
                            if(target) (this.refs.authLog as Field).checkMatches(target.value, loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                        },
                    },
                    {
                        name: 'password',
                        label: 'Пароль',
                        ref: 'authPass',
                        onChange: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement;
                            myValue.password = target.value
                        },
                        onFocusOut: (e: FocusEvent) => {
                            const target = e.target as HTMLInputElement;
                            if(target) (this.refs.authPass as Field).checkMatches(target.value,  passRegExp, 'пароль длиною 8-40 символов, содержит заглавную и цифру');
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
