import Block from '../../utils/Block';

interface ChatPageProps {
    title: string;
}

export class ErrorPage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('div', props);
    }

    render() {
        return this.compile(`
            <main>
                <h1>500</h1>
                <p>Мы уже фиксим</p>
                <a href="chat">Назад к чатам</a>
            </main>
        

    `, this.props);
    }
}
