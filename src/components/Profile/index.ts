
import template from "./profileAside.hbs";
import template2 from "./profileMain.hbs";
import template3 from "./profileItem.hbs";
import template4 from "./changeItem.hbs";
import Block from "../../utils/Block";
 import asideLine from "../../../assets/asideLine.png"
 import profileImg from "../../../assets/profileImg.png"
import AuthController from "../../controllers/AuthController";
import store, {withStore} from "../../utils/Store";
import MutateController from "../../controllers/MutateController";
import avatar from "../../../assets/profileAva.png";

export  class ProfileAside extends Block {
    constructor() {
        super({
            asideLine,
            onBackClick: () => {
                // render('messenger')
            },
            events: {
                click: () => {
                    this.navigate();
                }
            },
        })

    }
    navigate() {
        this.props.router.go(this.props.to);
    }
    render() {
        return this.compile(template, this.props);
    }
}
class ProfileMainBase extends Block {
    constructor(props: any) {
        super({
            profileImg,
            logout: ()=> {
                console.log('onExit')
                AuthController.logout();
            },
            avatarRef:"avatarRef",
            avatarImg: props.avatarImg,
            profileName: props.first_name,
            uploadAvatar: (e: Event)=>{
                const fileInput = e.target as HTMLInputElement;
                const files = fileInput.files;
                if (files && files.length > 0) {
                    const selectedFile = files[0];

                    MutateController.mutateAvatar(selectedFile);
                } else {
                    console.error('Не выбран файл');
                }
            },
            fields: [
                {ref: "mailRef", tagName: "email", first: 'Почта', second: 'pochta@yandex.ru'},
                {ref: "loginRef", tagName: "login", first: 'Логин', second: 'ivanivanov'},
                {ref: "nameRef", tagName: "first_name", first: 'Имя', second: 'Иван'},
                {ref: "nameSecRef", tagName: "second_name", first: 'Фамилия', second: 'Иванов'},
                {ref: "nameChatRef",tagName: "display_name", first: 'Имя в чате', second: 'Иван'},
                {ref: "phoneRef", tagName: "phone", first: 'Телефон', second: '+7 (999) 999 99 99', class: 'lastField'},
            ]
        });
        (this.props.fields.map((item: any)=>{
            const tagName = item.tagName;

            if (store.getState().user?.hasOwnProperty(tagName)) {
                this.refs[item.ref].setProps({ second: store.getState()?.user[tagName] });
            }
            return true
        }))
    }
    render() {
        return this.compile(template2, this.props);
    }
}
const withUser  = withStore((state) => ({
    ...state.user,
    avatarImg: state.user.avatar ? `https://ya-praktikum.tech/api/v2/resources/${state.user.avatar}` : avatar,
}))
export const ProfileMain = withUser(ProfileMainBase);
export  class ProfileItem extends Block {
    constructor(props: any) {
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
    constructor(props: any) {
        super({
            profileImg,
            req: false,
            ...props,
            // fieldValue: props.value || '',
            events: {
                focusout:  props.onFocusOut,
                change: props.onChange,
            }
        })
    }
    checkMatches( val:string,   reg: any, mes:string) {
        if (!reg.test(val)) {
            this.setProps({
                second: val,
                error: mes,
                req: true,
            })
        } else {
            this.setProps({
                second: val,
                req: false
            })
        }
    }
    render() {
        return this.compile(template4, this.props);
    }
}
