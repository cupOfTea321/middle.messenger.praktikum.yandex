
import template from "./card.hbs";
import Block from "../../utils/Block";

export default class Card extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
