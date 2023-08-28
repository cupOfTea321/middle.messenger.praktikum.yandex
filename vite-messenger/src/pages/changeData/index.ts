import Block from '../../utils/Block';
import template from "./change.hbs";
import asideLine from '../../../assets/asideLine.png'
import profileImg from '../../../assets/profileImg.png'
import {render} from "../../utils/render";

interface ChangeItems {
    first: string;
    second: string;
    name: string
}
export class ChangeData extends Block {
    constructor() {
        super({
            asideLine,
            profileImg,
            onClickProfile: () => {
                render('profile')
            },
            fields: [
                {first: 'Почта', second: 'pochta@yandex.ru', name: 'email'},
                {first: 'Логин', second: 'ivanivanov', name: 'login'},
                {first: 'Имя', second: 'Иван', name: 'first_name'},
                {first: 'Фамилия', second: 'Иванов', name: 'second_name'},
                {first: 'Имя в чате', second: 'Иван', name: 'display_name'},
            ],
        });

    }
    render() {
        return this.compile(template, this.props);
    }
}
