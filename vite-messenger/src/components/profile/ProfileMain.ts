import Block from '../../utils/Block';

// import styles from '../../components/Button/button.css'
interface ChatPageProps {
    title: string;
}

interface ProfileItems {
    first: string;
    second: string;
}
const profileItems: ProfileItems[] = [
    {first: 'Почта', second: 'pochta@yandex.ru'},
    {first: 'Логин', second: 'ivanivanov'},
    {first: 'Имя', second: 'Иван'},
    {first: 'Фамилия', second: 'Иванов'},
    {first: 'Имя в чате', second: 'Иван'},
];

export class ProfileMain extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
        this.element!.classList.add('profile-main')
    }

    render() {
        return this.compile(`
            <div class="profile-main__img">

        <img name="avatar" src="../../../assets/profileImg.png" alt="">
    </div>
    <p class="user__name">Иван</p>

    <div class="profile-data">
        ${profileItems.map(item => (`
            <div class="profile-data__row" id="profile-data">
                <label class="bold">${item.first}</label>
                <p class="second">${item.second}</p>
            </div>
            <hr>`
        )).join('')}
        <div class="profile-data__row profile-data__last">
            <p class="bold">Телефон</p>
            <p class="second">+7 (909) 967 30 30</p>

        </div>
    </div>


    <div class="profile-main__buttons">

        <button>
            <a href="/change">
                Изменить данные
            </a>

        </button>
        <hr>
        <button>Изменить пароль</button>
        <hr>
        <button class="profile-main__buttons-exit">Выйти</button>
    </div>



    `, this.props);
    }
}
