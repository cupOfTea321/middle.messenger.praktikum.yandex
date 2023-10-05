import Block from '../../utils/Block';
import template from './message.hbs';

interface MessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props});
  }
}
