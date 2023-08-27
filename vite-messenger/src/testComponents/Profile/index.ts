
import template from "./profileAside.hbs";
import template2 from "./profileMain.hbs";
import template3 from "./profileItem.hbs";
import Block from "../../utils/Block";
 import asideLine from "../../../assets/asideLine.png"
 import profileImg from "../../../assets/profileImg.png"
import {render} from "../../utils/render";
export  class ProfileAside extends Block {
    constructor(props) {
        super({
            ...props,
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
    constructor(props) {
        super({
            ...props,
            profileImg,
            fields: [
                {first: 'Почта', second: 'pochta@yandex.ru'},
                {first: 'Логин', second: 'ivanivanov'},
                {first: 'Имя', second: 'Иван'},
                {first: 'Фамилия', second: 'Иванов'},
                {first: 'Имя в чате', second: 'Иван'},
            ]
        })
    }
    render() {
        return this.compile(template2, this.props);
    }
}
export  class ProfileItem extends Block {
    constructor(props) {
        super({
            ...props,
            profileImg,
        })
    }
    render() {
        return this.compile(template3, this.props);
    }
}
