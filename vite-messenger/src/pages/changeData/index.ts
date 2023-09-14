import Block from '../../utils/Block';
import template from "./change.hbs";
import asideLine from '../../../assets/asideLine.png'
import profileImg from '../../../assets/profileImg.png'
import {render} from "../../utils/render";
import Field from "../../components/Field";
import store, {withStore} from "../../utils/Store";
import MutateController from "../../controllers/MutateController";

interface ChangeItems {
    first: string;
    second: string;
    name: string
}
export interface UserData {
    id?: number;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
}
export interface UserPassword {
    oldPassword: string;
    newPassword: string;
}
export class ChangeDataPage extends Block {

    constructor() {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/
        const nameRegExp = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/
        const phoneRegExp =  /^\+?\d{10,15}$/
        super({
            asideLine,
            profileImg,
            onClickProfile: () => {
                // render('profile')
            },
            onSubmit: (e: MouseEvent) => {
                console.log('onSubmit')
                e.preventDefault();
                const fieldsName = this.props.fields;
                let hasErrors = false
                myValue.display_name = myValue.first_name + " " + myValue.second_name
                for (let i = 0; i < fieldsName.length; i++) {
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

                console.log(myValue)
                MutateController.mutate(myValue as UserData);

            },
            fields: [
                {
                    first: 'Почта',
                    second: 'pochta@yandex.ru',
                    name: 'email',
                    ref: 'changeEmail',

                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.changeEmail as Field).checkMatches(target.value,   emailRegExp, 'введите корректную почту');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.email = target.value;
                    },
                },
                {
                    first: 'Логин',
                    second: 'ivanivanov',
                    name: 'login',
                    ref: 'changeLog',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.changeLog as Field).checkMatches(target.value,  loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                    },
                },
                {
                    first: 'Имя',
                    second: 'Иван',
                    name: 'first_name',
                    ref: 'firstName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.firstName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    first: 'Фамилия',
                    second: 'Иванов',
                    name: 'second_name',
                    ref: 'lastName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.lastName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    first: 'Имя в чате',
                    second: 'Иван',
                    name: 'display_name',
                    ref: 'chatName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.chatName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                },
                {
                    first: 'Телефон',
                    second: '+7 (999) 999 99 99',
                    name: 'phone',
                    class: 'lastField',
                    ref: 'phoneRef',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        target && (this.refs.phoneRef as Field).checkMatches(target.value, phoneRegExp, 'введите корректный телефон');
                    },
                },
            ],
        });
        const myValue: Record<string, string> = {

            email:  this.props.fields[0].value,
            login: this.props.fields[1].value,
            first_name: this.props.fields[2].value,
            second_name: this.props.fields[3].value,
            display_name: this.props.fields[2].value + " " + this.props.fields[3].value,
            phone: this.props.fields[5].value,
        };
        (this.props.fields.map((item)=>{
            const tagName = item.name;
            if (store.getState().user.hasOwnProperty(tagName)) {
                this.refs[item.ref].setProps({ second: store.getState().user[tagName] });
            }
            if(myValue.hasOwnProperty(tagName)){
                myValue[tagName] = store.getState().user[tagName]
            }
        }))
    }
    render() {
        return this.compile(template, this.props);
    }
}
const withData = withStore((state) => ({ ...state.user }))

export const ChangeData = withData(ChangeDataPage);
