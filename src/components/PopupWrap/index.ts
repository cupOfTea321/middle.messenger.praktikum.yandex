import Block from "../../utils/Block";
import template from "./popupWrap.hbs";

interface PopupWrapProps{
    isOpenPopup: boolean;
}

export class PopupWrap extends Block{
    constructor(props: PopupWrapProps) {
        super({
            ...props,
            isOpenPopup: props.isOpenPopup,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
