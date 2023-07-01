import Block from '../../utils/Block';
import {Button} from '../../components/Button';

// import styles from '../../components/Button/button.css'
interface AuthPageProps {
    title: string;
}

export class AuthPage extends Block<AuthPageProps> {
    constructor(props: AuthPageProps) {
        super('div', props);
    }

    // создание экземпляра кнопки
    init() {
        this.children.button = new Button({
            label: 'Click me',
            events: {
                click: () => console.log('clicked'),
            },
        });
    }

    render() {
        return this.compile(`
        <main class="auth">
            <form class="form">
                <h1>
                    Вход
                </h1>
                <span>
                    <label for="login">Логин</label>
                <input name="login" type="text">
        
                <label for="password">Пароль</label>
                <input name="password" type="text">
                </span>
        
        
                <button type="submit" class="first-button">
                    <a href="registration">
                        Авторизоваться
                    </a>
                </button>
        
      
                <button type="submit" class="second-button">
                    <a href="pages/chat/chatPage.hbs">
                        Войти
                    </a>
                </button>
            </form>
        </main>

    `, this.props);
    }
}
