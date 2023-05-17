

const items = [
    {first: 'Почта', second: 'pochta@yandex.ru'},
    {first: 'Логин', second: 'ivanivanov'},
    {first: 'Имя', second: 'Иван'},
    {first: 'Фамилия', second: 'Иванов'},
    {first: 'Имя в чате', second: 'Иван'},
];

const componentItems = items.map(item => {

    return `
        <div class="profile-data__row" id="profile-data">
            <p class="bold">${item.first}</p>
            <p class="second">${item.second}</p>
        </div>
        <hr>
    `;
});

if (typeof window !== 'undefined') {
    document.getElementById('profile-data').innerHTML = componentItems.join('');
}



