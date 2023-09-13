
import template from "./profileAside.hbs";
import template2 from "./profileMain.hbs";
import template3 from "./profileItem.hbs";
import template4 from "./changeItem.hbs";
import Block from "../../utils/Block";
 import asideLine from "../../../assets/asideLine.png"
 import profileImg from "../../../assets/profileImg.png"
import {render} from "../../utils/render";
import AuthController from "../../controllers/AuthController";
import store from "../../utils/Store";
interface BlockInterface {
    setProps(props: any): void;
}
export  class ProfileAside extends Block {
    constructor() {
        super({
            asideLine,
            onBackClick: () => {
                render('chat')
            }
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
export  class ProfileMain extends Block {
    constructor() {
        super({
            profileImg,
            logout: ()=> {
                console.log('onExit')
                AuthController.logout();
            },
            onClickChange: () => {
                render('change')
            },
            fields: [
                {ref: "mailRef", tagName: "email", first: 'Почта', second: 'pochta@yandex.ru'},
                {ref: "loginRef", tagName: "login", first: 'Логин', second: 'ivanivanov'},
                {ref: "nameRef", tagName: "first_name", first: 'Имя', second: 'Иван'},
                {ref: "nameSecRef", tagName: "second_name", first: 'Фамилия', second: 'Иванов'},
                {ref: "nameChatRef",tagName: "display_name", first: 'Имя в чате', second: 'Иван'},
            ]
        });
        (this.props.fields.map((item)=>{
            const tagName = item.tagName;

            if (store.getState().user?.hasOwnProperty(tagName)) {
                console.log(this)
                this.refs[item.ref].setProps({ second: store.getState()?.user[tagName] });
            }
        }))
        // this.refs.avatarRef?.setProps({profileName: store.getState().user.first_name })
    }
    render() {
        return this.compile(template2, this.props);
    }
}
export  class ProfileItem extends Block {
    constructor(props) {
        super({
            profileImg,
            ...props
        })
    }
    render() {
        return this.compile(template3, this.props);
    }
}
export  class ChangeItem extends Block {
    constructor(props) {
        super({
            profileImg,
            req: false,
            ...props,
            // fieldValue: props.value || '',
            events: {
                focusout:  props.onFocusOut,
            }
        })
    }
    checkMatches(val:string, ref: BlockInterface, reg: any, mes:string) {
        if (!reg.test(val)) {
            ref.setProps({
                fieldValue: val,
                error: mes,
                req: true,
            })
        } else {
            ref.setProps({
                fieldValue: val,
                req: false
            })
        }
    }
    render() {
        return this.compile(template4, this.props);
    }
}
