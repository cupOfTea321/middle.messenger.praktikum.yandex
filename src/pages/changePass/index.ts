import Block from '../../utils/Block';
import template from "./pass.hbs";
import asideLine from '../../../assets/asideLine.png'
import profileImg from '../../../assets/profileImg.png'
import Field from "../../components/Field";
import store, {withStore} from "../../utils/Store";
import MutateController from "../../controllers/MutateController";


export interface UserPassword {
    oldPassword: string;
    newPassword: string;
}
export class ChangePassPage extends Block {

    constructor() {
        const passRegExp = /^(?=.*[A-Z])(?=.*\d).{8,40}$/i;
        const myValue: Record<string, string> = {
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: '',
        };
        super({
            asideLine,
            profileImg,
            onClickProfile: () => {
                // render('profile')
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
                if(myValue.newPassword !== myValue.newPasswordAgain){
                    this.refs.passRefAgain.setProps({
                        error: 'пароли не совпадают',
                        req: true,
                    })
                    return;
                }
                if (hasErrors || myValue.newPassword !== myValue.newPasswordAgain ) {
                    return;
                }
                const dataValue: Record<string, string> = {};

                const keysToCopy = Object.keys(myValue).slice(0, 2);

                keysToCopy.forEach((key) => {
                    dataValue[key] = myValue[key];
                });
                console.log('onSubmit')
                MutateController.mutatePassword(dataValue as UserPassword)
            },
            fields: [
                {
                    name: "oldPassword",
                    first: "Старый пароль",
                    ref: "oldPass",
                    fieldType: "text",

                    showPass: true,
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.oldPassword = target.value;
                    },
                    onFocusOut: (t: FocusEvent)=>{
                        const target = t.target as HTMLInputElement;
                        (this.refs.oldPass as Field).checkMatches(target.value, passRegExp,"от 8 до 40 символов, хотя бы одна заглавная буква и цифра." );
                    }
                },
                {
                    name: "newPassword",
                    first: "Новый пароль",
                    ref: "newPass",
                    fieldType: "text",
                    showPass: true,
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.newPassword = target.value;
                    },
                    onFocusOut: (t: FocusEvent)=>{
                        const target = t.target as HTMLInputElement;
                        (this.refs.newPass as Field).checkMatches(target.value, passRegExp,"от 8 до 40 символов, хотя бы одна заглавная буква и цифра." );
                    }
                },
                {
                    name: "newPasswordAgain",
                    first: "Повторите новый пароль",
                    ref: "passRefAgain",
                    fieldType: "text",
                    showPass: true,
                    onChange: (e: FocusEvent) => {
                        const target = e.target as HTMLInputElement;
                        myValue.newPasswordAgain = target.value;
                    },
                    onFocusOut: (t: FocusEvent)=>{
                        const target = t.target as HTMLInputElement;
                        (this.refs.passRefAgain as Field).checkMatches(target.value, passRegExp,"от 8 до 40 символов, хотя бы одна заглавная буква и цифра." );
                    }
                },
            ],
        });
        (this.props.fields.map((item)=>{
            const tagName = item.name;
            if (store.getState().user.hasOwnProperty(tagName)) {
                this.refs[item.ref].setProps({ second: store.getState().user[tagName] });
            }
            if(myValue.hasOwnProperty(tagName)){
                myValue[tagName] = store.getState().user[tagName]
            }
            return true
        }))
    }
    render() {
        return this.compile(template, this.props);
    }
}
const withData = withStore((state) => ({ ...state.user }))

export const ChangePass = withData(ChangePassPage);
