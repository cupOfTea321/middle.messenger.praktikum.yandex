import Block from '../../utils/Block';
import template from "./error.hbs";



export class ErrorPage extends Block {

    render() {
        return this.compile(template, this.props);
    }
}
