import Block from '../../utils/Block';
import {Button} from '../../components/Button';

// import styles from '../../components/Button/button.css'
interface RegistrationPageProps {
    title: string;
}

export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
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
        <link rel="stylesheet" href="../../styles/styles.pcss"/>
        <main class="login">
            <form class="form">
                <h1>
                    Регистрация
                </h1>
        
                <span class="login-form__items" id="login-form__items">
        
                </span>
        
        
                <button class="first-button" name="Sign up">
                    <a href="/">
                        Зарегистрироваться
                    </a>
                </button>
        
        
                <button name="Sign in" class="second-button">
                    <a href="../chat/chatPage.hbs">
                        Войти
                    </a>
                </button>
        
        
            </form>
        
        </main>
        <script defer type="module" src="registration.ts"></script>


    `, this.props);
    }
}
