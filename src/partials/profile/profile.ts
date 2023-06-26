
interface ProfileItems {
    first: string;
    second: string;
}
const profileItems: ProfileItems[] = [
    {first: 'Почта', second: 'pochta@yandex.ru'},
    {first: 'Логин', second: 'ivanivanov'},
    {first: 'Имя', second: 'Иван'},
    {first: 'Фамилия', second: 'Иванов'},
    {first: 'Имя в чате', second: 'Иван'},
];

const profileComponentItems = profileItems.map(item => {

    return `
        <div class="profile-data__row" id="profile-data">
            <label class="bold">${item.first}</label>
            <p class="second">${item.second}</p>
        </div>
        <hr>
    `;
});

if (typeof window !== 'undefined') {
    document.getElementById('profile-data').innerHTML = profileComponentItems.join('');
}



