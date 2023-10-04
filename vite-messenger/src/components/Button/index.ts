import template from './button.hbs';
import Block from "../../utils/Block.ts";
import {withRouter} from "../../helpers/withRouter.ts";

interface ButtonProps {
    to?: string;
    label: string;
    type?: 'submit' | 'button',
    onClick?: () => void;
    onSubmit?: () => void;
    events: {
        click: () => void;
        submit: () => void;
    };
}

class BaseButton extends Block {
    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
                submit: (e) => {
                    e.preventDefault()
                    // this.navigate();
                    props.onSubmit
                }
            }
        });
    }

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const Button = withRouter(BaseButton);
