Описание
---
Приложение мессенджера, написанное на ets + pcss. Собирается с помощью vite, запускается на express, задеплоено в netlify. Также в проекте используются шаблоны handlebars.
Присутствует система регистрации, авторизации. Пользователь может изменять свои данные. Чаты реализованы с помощью протокола WebSocket, есть возможность создания чата. удаления и добавления туда участников. Часть приложения покрыта тестами macha + chai. Реализована функция pre-commit (husky), запускающая тесты

Команды для запуска
---
### npm i - установка зависимостей (важно перейти в папку vite-messenger) 
### npm run dev - запуск приложения в режиме разработки
### npm run build - запустить сборку статики 
### npm start - запустить express-сервер для раздачи статики
### npm run test - запустить тесты
### npm run prepare - установить husky 

Макет
---
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?type=design&node-id=0-1&t=pPsZUF0o4i9ZsnBW-0

Ссылка на pull-request
---
[#1](https://github.com/cupOfTea321/middle.messenger.praktikum.yandex/pull/6)

Ссылка на опубликованное приложение
--- 
https://ymess.netlify.app/
