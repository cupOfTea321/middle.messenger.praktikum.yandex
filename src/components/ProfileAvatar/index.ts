import Block from '../../utils/Block';
import template from './profileAvatar.hbs';

export class ProfileAvatar extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
