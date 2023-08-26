import Block from '../../utils/Block';
import styles from './button.css'

interface ButtonProps {
  label: string;
  type?: 'submit' | 'button',
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class Form extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
    // НАВЕШИВАЕМ КЛАСС НА КНОПКУ
    // this.element!.classList.add(styles.btn)
  }


  render() {
    return this.compile(`{{label}}`, this.props);
  }
}
