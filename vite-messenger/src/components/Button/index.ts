import Block from '../../utils/Block';
import styles from './button.css'

interface ButtonProps {
  label: string;
  events: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
    // НАВЕШИВАЕМ КЛАСС НА КНОПКУ
    this.element!.classList.add(styles.btn)
  }


  render() {
    return this.compile(`{{label}}`, this.props);
  }
}
