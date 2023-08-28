
import template from "./form.hbs";
import Block from "../../utils/Block";

export default class Form extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
