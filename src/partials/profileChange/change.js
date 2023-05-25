

const items = [
    {first: 'Почта', second: 'pochta@yandex.ru', name: 'email'},
    {first: 'Логин', second: 'ivanivanov', name: 'login'},
    {first: 'Имя', second: 'Иван', name: 'first_name'},
    {first: 'Фамилия', second: 'Иванов', name: 'second_name'},
    {first: 'Имя в чате', second: 'Иван', name: 'display_name'},
];

const componentItems = items.map(item => {

    return `
        <div class="profile-data__row" id="profile-data">
            <label class="bold">${item.first}</label>
            <input name=${item.name} class="second"  value=${item.second} />
        </div>
        <hr>
    `;
});

if (typeof window !== 'undefined') {
    document.getElementById('profile-data').innerHTML = componentItems.join('');
}



