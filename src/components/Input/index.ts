import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
    onChange?: () => void;
    events: {
        change: () => void,
    };
}


export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                change: props.onChange,
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
