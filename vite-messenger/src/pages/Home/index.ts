import Block from '../../utils/Block';
import template from './home.hbs';
import {render} from "../../utils/render";
import {Button} from "../../testComponents/Button";


export class HomePage extends Block {
    constructor(props) {
        super({
                type: 'button',
                ...props,
                // myBtn: {
                //     label: 'myBtn',
                // },
                btnLabel: 'myBtn',
                onBtnClick: () => {
                    console.log('ds')
                    this.refs.button.setProps({
                        label: 'Update'
                    })
                },
                buttons: [
                    {
                        label: 'Login', onClick: () => {
                            render('login');
                            console.log('login')
                        }
                    },
                    {
                        label: 'Button 2'
                    },
                ]
            },
        );
    }

    // init() {
    //   this.children.button = new Button({
    //     label: 'Click me',
    //     events: {
    //       click: () => {
    //         this.children.button.setProps({
    //           label: 'Click'
    //         });
    //       },
    //     },
    //   });
    // }

    render() {
        return this.compile(template, this.props);
    }
}
