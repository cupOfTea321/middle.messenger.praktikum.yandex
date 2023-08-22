import Block from '../../utils/Block';
import {Button} from '../../components/Button';

// import styles from '../../components/Button/button.css'
interface RegistrationPageProps {
    title: string;
}
interface LoginItems {
    name: string;
    label: string;
}
const myItems: LoginItems[] = [
    {name: 'email',label: 'Почта'},
    {name: 'login',label: 'Логин'},
    {name: 'first_name',label: 'Имя'},
    {name: 'second_name',label: 'Фамилия'},
    {name: 'phone',label: 'Телефон'},
    {name: 'password',label: 'Пароль'},
    {name: 'password2',label: 'Пароль (ещё раз)'},

];
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

        <span class="registration-form__items" id="registration-form__items">

        
        ${myItems.map(item => (`
            <label for="password">${item.label}</label>
                <input name=${item.name} type="text">`
        )).join('')}
        </span>
        <button class="first-button" name="Sign up">
            <a href="/">
                Зарегистрироваться
            </a>
        </button>


        <button name="Sign in" class="second-button">
            <a href="/chat">
                Войти
            </a>
        </button>


    </form>

</main>
<script defer type="module" src="registration.ts"></script>


    `, this.props);
    }
}
