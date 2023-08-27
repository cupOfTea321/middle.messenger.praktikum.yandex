import Block from '../../utils/Block';

// import styles from '../../components/Button/button.css'
interface ChatPageProps {
    title: string;
}

export class ProfileAside extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super('aside', props);
        this.element!.classList.add('profile-aside')
    }

    render() {
        return this.compile(`
            <a href="/chat">
                <img src="../../../assets/asideLine.png" alt="">
            </a>
    `, this.props);
    }
}
