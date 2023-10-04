import Block from '../../utils/Block';
import template from "./error.hbs";

interface ChatPageProps {
    title: string;
}

export class ErrorPage extends Block {

    render() {
        return this.compile(template, this.props);
    }
}