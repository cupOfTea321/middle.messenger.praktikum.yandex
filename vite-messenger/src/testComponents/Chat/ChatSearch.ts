import Block from '../../utils/Block';


interface ChatItems {
    name: string
    you: boolean
    message: string
    time: string
    newMessage: boolean | number
}
const chatItems: ChatItems[] = [
    {name: 'Андрей', you: false, message: 'Изображение', time: '10:49', newMessage: 2},
    {name: 'Киноклуб', you: true, message: 'стикер', time: '10:49', newMessage: false},
    {
        name: 'Илья',
        you: false,
        message: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '15:12',
        newMessage: 4
    },
    {
        name: 'Вадим',
        you: true,
        message: 'Круто!',
        time: 'Пт',
        newMessage: false
    },
    {
        name: 'тет-а-теты',
        you: false,
        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        time: 'Ср',
        newMessage: false
    },
    {
        name: '1, 2, 3',
        you: false,
        message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
        time: 'Пн',
        newMessage: false
    },
];
// import styles from '../../components/Button/button.css'
interface ChatPageProps {
    title: string;
}

export class ChatSearch extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
        this.element!.classList.add('Chat-search')

    }
    render() {
        return this.compile(`
                <a href="/profile">Профиль ></a>
            
            
                <input class="chat-search__input" type="text" placeholder="Поиск" />
            
                <div class="chat-search__dialogs" id="chat-search__dialogs">
                ${chatItems.map(item => (`
                    <hr>
                        <div class="dialogs-item">
                    <div class="dialogs-item__left">
                    <img class="dialogs-item__ava" src="assets/Ellipse.png" alt="photo">
                    <div>
                        <p class="bold">${item.name}</p>
                        ${item.you ? `<p class="second">Вы: ${item.message}</p>` : `<p class="user__message">${item.message}</p>`}
                                            </div>

                                        </div>

                                        <div>
                                            <p class="dialogs-item__time">${item.time}</p>
                                            ${item.newMessage ? `<p class="dialogs-item__new">${item.newMessage}</p>` : `<p></p>`}

                                        </div>
                                    </div>`
        )).join('')}
                </div>
    `, this.props);
    }
}
