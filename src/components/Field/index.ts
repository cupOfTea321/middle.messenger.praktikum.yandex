
import template from "./field.hbs";
import Block from "../../utils/Block";

interface FieldProps {
    label: string;
    onClick?: () => void;
    onChange?: () => void;
    onFocusOut?: () => void;
    onBlur?: () => void;
    onFocusIn?: () => void;
    value: string;
    // req?: boolean,
    events: {
        click: () => void;
        focusOut: () => void;
        blur: () => void;
        focusIn: () => void;
        change: () => void;
    };
}
export default class Field extends Block {
    constructor(props: FieldProps) {
        super({
            ...props,
            // req: props.req,
            req: false,
            showPass: false,
            fieldValue: props.value || '',
            events: {
                click: props.onClick,
                focusout:  props.onFocusOut,
                focusin:  props.onFocusIn,
                onblur:  props.onBlur,
                change: props.onChange
            }
        });
    }
    checkMatches(val: string, reg: any, mes: string) {
        if (!reg.test(val)) {
            this.setProps({
                second: val,
                error: mes,
                req: true,
            })
        } else {
            this.setProps({
                second: val,
                req: false
            })
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}
