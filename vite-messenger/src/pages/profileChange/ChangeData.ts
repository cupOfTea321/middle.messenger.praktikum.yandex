import Block from '../../utils/Block';


interface ChangeItems {
    first: string;
    second: string;
    name: string
}
const changeItems: ChangeItems[] = [
    {first: 'Почта', second: 'pochta@yandex.ru', name: 'email'},
    {first: 'Логин', second: 'ivanivanov', name: 'login'},
    {first: 'Имя', second: 'Иван', name: 'first_name'},
    {first: 'Фамилия', second: 'Иванов', name: 'second_name'},
    {first: 'Имя в чате', second: 'Иван', name: 'display_name'},
];

export class ChangeData extends Block {
    constructor(props) {
        super('main', props);
        this.element!.classList.add('profile')

    }
    render() {
        return this.compile(`
        <aside class="profile-aside">
        <a href="../chat/chatPage.hbs">
            <img src="../../../assets/asideLine.png" alt="">
        </a>

    </aside>

    <div class="profile-main">
        <div class="profile-main__img">

            <img name="avatar" src="../../../assets/profileImg.png" alt="">
        </div>

        <form class="profile-data">
        ${changeItems.map(item => (`
        <div class="profile-data__row" id="profile-data">
            <label class="bold">${item.first}</label>
            <input name=${item.name} class="second"  value=${item.second} />
        </div>
        <hr>`
        )).join('')}
            <div class="profile-data__row profile-data__last">
                <p class="bold">Телефон</p>
                <input name="phone" class="second" value="+7 (909) 967 30 30" />

            </div>

            <div>
                <button class="first-button">
                    <a href="/profile">
                        Сохранить
                    </a>

                </button>
            </div>

        </form>




    </div>
    `, this.props);
    }
}
