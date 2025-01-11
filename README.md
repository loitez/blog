# Начало работ

Проект был создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Скрипты для запуска

### `npm i`

Установка всех необходимых зависимостей.

### `npm start`

Запускает проект в режиме разработчика. \
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

Больше информации про [деплой](https://facebook.github.io/create-react-app/docs/deployment).

### `npx json-server db.json --port 3001`

Далее необходимо запустить JSON Server, порт 3001.

## Описание ролей
### Администратор
__Логин__: admin

__Пароль__: blog

Доступный функционал:
* назначение ролей
* создание, редактирование и удаление статей
* чтение статей
* добавление комментариев
* чтение комментариев
* удаление комментариев

### Модератор
__Логин__: moderator

__Пароль__: blog

Доступный функционал:
* чтение статей
* добавление комментариев
* удаление комментариев

### Читатель
__Логин__: reader

__Пароль__: blog

Доступный функционал:
* чтение статей
* добавление комментариев

### Гость
Неавторизованный пользователь.

Доступный функционал:
* чтение статей

## Используемые технологии
* React, React Redux, Redux Thunk
* JSON Server 
* React Hook Form, Yup 
* React Router
* Styled Components
* ESLint, Prettier


## Больше

[Документация по Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

