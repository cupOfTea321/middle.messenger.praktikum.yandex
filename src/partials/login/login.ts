
interface LoginItems {
    name: string;
    label: string;
}
const myItems: LoginItems[] = [
    {name: 'email',label: 'Почта'},
    {name: 'login',label: 'Логин'},
    {name: 'first_name',label: 'Имя'},
    {name: 'second_name',label: 'Фамилия'},
    {name: 'phone',label: 'Телефон'},
    {name: 'password',label: 'Пароль'},
    {name: 'password2',label: 'Пароль (ещё раз)'},

];

const myComponentItems = myItems.map(item => {

    return `
        <label for="password">${item.label}</label>
        <input name=${item.name} type="text">  
    `;
});

if (typeof window !== 'undefined') {
    document.getElementById('login-form__items').innerHTML = myComponentItems.join('');

}

