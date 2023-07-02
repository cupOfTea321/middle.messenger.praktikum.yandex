import Block from '../../utils/Block';

// import styles from '../../components/Button/button.css'
interface ChatPageProps {
    title: string;
}

export class ChatMain extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
        this.element!.classList.add('chat-main')
    }

    render() {
        return this.compile(`
            <div class="chat-main__user">
                <div>
                    <img src="assets/Ellipse%2019.png" alt="avatar">
                    <p class="user__name">Вадим</p>
                </div>
                <img class="chat-main__img" src="assets/pointsIcon.png" alt="">
            </div>

            <hr>    
            <p class="chat-main__time">19 июня</p>
        
            <div class="chat-messages">
                <div class="chat-messages__text">
                    <p>
                        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                        <br>
                        <br>
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                    </p>
                    <span class="chat-messages__time">11:56</span>
                </div>
                <img class="camera" src="../../assets/camera.png" alt="photo">
                <div class="chat-messages__photo">
        
                    <span class="chat-messages__text-photo">11:56</span>
                </div>
        
        
            </div>
            <div class="chat-my">
                <p class="chat-my__text">
                    Круто!
                </p>
                <img src="../../assets/sawIcon.png" alt="">
                <p class="chat-my__time">12:00</p>
        
            </div>


            <footer class="chat-footer">
                <hr class="chat-footer__hr">
                <div class="chat-footer__wrapper">
                    <img src="../../assets/addIcon.png" alt="">
                    <input name="message" placeholder="Сообщение" type="text">
                    <img src="../../assets/sandIcon.png" alt="">
                </div>
            </footer>



    `, this.props);
    }
}
