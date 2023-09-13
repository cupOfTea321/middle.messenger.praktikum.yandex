import Block from '../../utils/Block';
import template from './link.hbs';
import {PropsWithRouter, withRouter} from "../../helpers/withRouter";

interface LinkProps extends PropsWithRouter {
    to: string;
    label: string;
    events?: {
        click: () => void;
    };
}

class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.navigate();
                }
            },
        });
    }

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export const Link = withRouter(BaseLink);
