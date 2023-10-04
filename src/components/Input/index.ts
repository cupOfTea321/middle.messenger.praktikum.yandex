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
    public setValue(value: string) {
        return (this.element as HTMLInputElement).value = value;
    }

    public getName() {
        return (this.element as HTMLInputElement).name;
    }

    public getValue() {
        return (this.element as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}
