
import template from "./field.hbs";
import Block from "../../utils/Block";

interface FieldProps {
    label: string;
    onClick?: () => void;
    onChange?: () => void;
    onFocusOut?: () => void;
    onBlur?: () => void;
    onFocusIn?: () => void;
    // req?: boolean,
    events: {
        click: () => void;
        focusOut: () => void;
        blur: () => void;
        focusIn: () => void;
        change: () => void;
    };
}
interface BlockInterface {
    setProps(props: any): void;
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
                // focusout:  () => {props.onFocusout()}
                focusout:  props.onFocusOut,
                focusin:  props.onFocusIn,
                onblur:  props.onBlur,
                change: props.onChange
            }
        });
    }
    checkMatches(val:string, ref: BlockInterface, reg: any, mes:string) {
        // console.log(val)
        if (!reg.test(val)) {
        // if (val.length <= 3) {
            ref.setProps({
                fieldValue: val,
                error: mes,
                req: true,
            })
            console.log(val)
        } else {
            ref.setProps({
                fieldValue: val,
                req: false
            })
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}
