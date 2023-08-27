import {render} from "./utils/render";
import {Button} from "./testComponents/Button";
import Card from "./testComponents/Card";
import {registerComponent} from "./utils/resgiterComponent";
import Field from "./testComponents/Field";
import Form from "./testComponents/Form";
import {ChatItem, ChatMain, ChatSearch} from "./testComponents/Chat";
import {ProfileAside, ProfileItem, ProfileMain} from "./testComponents/Profile";


registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Card', Card);
registerComponent('Form', Form);
registerComponent('ChatMain', ChatMain);
registerComponent('ChatSearch', ChatSearch);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileAside', ProfileAside);
registerComponent('ProfileMain', ProfileMain);
registerComponent('ProfileItem', ProfileItem);

window.addEventListener('DOMContentLoaded', () => {
    render('auth')
});
