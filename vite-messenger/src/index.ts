import {render} from "./utils/render";
import {Button} from "./components/Button";
import Card from "./components/Card";
import {registerComponent} from "./utils/resgiterComponent";
import Field from "./components/Field";
import Form from "./components/Form";
import {ChatItem, ChatMain, ChatSearch} from "./components/Chat";
import {ChangeItem, ProfileAside, ProfileItem, ProfileMain} from "./components/Profile";


registerComponent('Button', Button);
registerComponent('Field', Field);
registerComponent('Form', Form);
registerComponent('ChatMain', ChatMain);
registerComponent('ChatSearch', ChatSearch);
registerComponent('ChatItem', ChatItem);
registerComponent('ProfileAside', ProfileAside);
registerComponent('ProfileMain', ProfileMain);
registerComponent('ProfileItem', ProfileItem);
registerComponent('ChangeItem', ChangeItem);

window.addEventListener('DOMContentLoaded', () => {
    render('auth')
});
