
import template from "./field.hbs";
import Block from "../../utils/Block";

interface FieldProps {
    label: string;
    onClick?: () => void;
    onFocusOut?: () => void;
    events: {
        click: () => void;
        focusOut: () => void;
    };
}

export default class Field extends Block {
    constructor(props: FieldProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
                // focusout:  () => {props.onFocusout()}
                focusout:  props.onFocusOut
            }
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
