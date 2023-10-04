import Block from '../../utils/Block';
import template from "./change.hbs";
import asideLine from '../../../assets/asideLine.png'
import avatar from '../../../assets/profileAva.png'
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

    constructor(props) {
        const loginRegExp = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/
        const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/
        const nameRegExp = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/
        const phoneRegExp =  /^\+?\d{10,15}$/

        super({
            asideLine,
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
                MutateController.mutateUserInfo(myValue as UserData);

            },
            fields: [
                {
                    first: 'Почта',
                    second: props.email,
                    name: 'email',
                    ref: 'changeEmail',

                    onFocusOut: (t: FocusEvent) => {
                        console.log(this.refs)
                        console.log('onFocusOut ', props.email)
                        const target = t.target as HTMLInputElement;
                         (this.refs.changeEmail as Field).checkMatches(target.value,   emailRegExp, 'введите корректную почту');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.email = target.value;
                    },
                },
                {
                    first: 'Логин',
                    second: props.login,
                    name: 'login',
                    ref: 'changeLog',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                         (this.refs.changeLog as Field).checkMatches(target.value,  loginRegExp, 'логин должен быть длиннее 3 символов и начинаться с буквы');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.login = target.value;
                    },
                },
                {
                    first: 'Имя',
                    second: props.first_name,
                    name: 'first_name',
                    ref: 'firstName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        (this.refs.firstName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.first_name = target.value;
                    },
                },
                {
                    first: 'Фамилия',
                    second: props.second_name,
                    name: 'second_name',
                    ref: 'lastName',
                    onFocusOut: (e: FocusEvent) => {
                        console.log(this.refs)
                        const target = e.target as HTMLInputElement;
                         (this.refs.lastName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.second_name = target.value;
                    },
                },
                {
                    first: 'Имя в чате',
                    second: props.display_name,
                    name: 'display_name',
                    ref: 'chatName',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        (this.refs.chatName as Field).checkMatches(target.value, nameRegExp, 'введите корректное имя');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.display_name = target.value;
                    },
                },
                {
                    first: 'Телефон',
                    second: props.phone,
                    name: 'phone',
                    class: 'last-field',
                    ref: 'phoneRef',
                    onFocusOut: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                         (this.refs.phoneRef as Field).checkMatches(target.value, phoneRegExp, 'введите корректный телефон');
                    },
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.phone = target.value;
                    },
                },
            ],
        });
        const myValue: Record<string, string> = {

            email:  props.email,
            login: props.login,
            first_name: props.first_name,
            second_name: props.second_name,
            display_name: props.display_name,
            phone: props.phone,
        };

        // (this.props.fields.map((item)=>{
        //     const tagName = item.name;
        //     if (store.getState().user.hasOwnProperty(tagName)) {
        //         this.refs[item.ref].setProps({ second: store.getState().user[tagName] });
        //     }
        //     if(myValue.hasOwnProperty(tagName)){
        //         myValue[tagName] = store.getState().user[tagName]
        //     }
        // }))
    }
    render() {
        return this.compile(template, this.props);
    }
}
const withInfo = withStore((state) => ({
    ...state.user,
    avatarImg: state.user.avatar ? `https://ya-praktikum.tech/api/v2/resources/${state.user.avatar}` : avatar,
}))

export const ChangeData = withInfo(ChangeDataPage);
