import {render} from "./utils/render";
import {Button} from "./testComponents/Button";
import Card from "./testComponents/Card";
import {registerComponent} from "./utils/resgiterComponent";
import Field from "./testComponents/Field";
import Form from "./testComponents/Form";
import {ChatItem, ChatMain, ChatSearch} from "./testComponents/Chat";


registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Card', Card);
registerComponent('Form', Form);
registerComponent('ChatMain', ChatMain);
registerComponent('ChatSearch', ChatSearch);
registerComponent('ChatItem', ChatItem);

window.addEventListener('DOMContentLoaded', () => {
    render('auth')
});
