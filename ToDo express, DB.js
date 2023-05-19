// ! Как поднять проект с нуля:
// todo Инициализируем проект, создаём package.json
// * npm init -y

// todo Устанавливаем eslint:
// * npx eslint --init
// ? настройки:
// * 3, 2, 3, No, Node, 1, 1, 3, Yes
// ? настройки eslint для работы с react:
/*
  rules: {
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
*/

// todo Создаем gitignore файл:
// * npx create-gitignore node
_______________________________________________________________________________________________

// ! Как поднять сервер express:
// * npm i express morgan
// * npm i -D nodemon
// ? package.json :
// * "dev": "nodemon app.js --ext js,jsx --ignore sessions"


// ! создаём app.js
// * импортим экспресс (const express = require('express');)
// * импортим морган (const morgan = require('morgan');)
// * создаём экземпляр сервера (const app = express();)
// * подключаем морган (app.use(morgan('dev'));)
// * прописываем порт (const PORT = 3000;)
// * и поднимаем сервер (app.listen(PORT, () => {});)
// * пишем ручку, проверяем что сервер работает
/*
  app.get('/', (req, res) => {
    res.send('Привет!');
  });
*/

// ! делаем отображение реакт-компонентов
// * установим React(ssr) Babel
// * npm i react react-dom @babel/core @babel/preset-env @babel/preset-react @babel/register
// * создаём конфиг для бабеля (touch .babelrc)
/*
  {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
*/
// * импортим бабель в app.js (require('@babel/register');)

_______________________________________________________________________________________________

// ! записываем данные в базу
// * подключаем миддлвары для того, чтобы уметь работать с JSON
/*
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
*/

// ! подключим базу
// * установим зависимости (npm i sequelize sequelize-cli pg pg-hstore)
// * создадим конфиг (touch .sequelizerc)
/*
    require('dotenv').config() -------- если используем env(!!!!)

    const path = require('path');
    module.exports = {
      'config': path.resolve('db', 'config', 'database.json'),
      'models-path': path.resolve('db', 'models'),
      'seeders-path': path.resolve('db', 'seeders'),
      'migrations-path': path.resolve('db', 'migrations'),
    };
*/
// * создаём структуру базы в проекте (npx sequelize init)
// * подправим конфиги под нашу базу
// * npx sequelize db:create
// * создадим модель (npx sequelize model:generate --name Todo --attributes title:string,text:string)
// * накатим миграции (npx sequelize db:migrate)

_______________________________________________________________________________________________

// ! вынесем переменные в .env
// * устанавливаем пакет (npm i dotenv)
// * создаём файл .env
// * переносим в файл порт
// * реквайрим библиотеку в app.js (require('dotenv').config();)
// * заменяем порт на process.env.PORT
// * можем вынести подключение к БД, в конфиге пишем следующее:
/*
    "development": {
      "use_env_variable": "DATABASE"
    },
*/
// * а в .env помещаем строку подключения к БД со своими данными
// * DATABASE = "postgres://user:pass@example.com:5432/dbname"
// * добавляем COOKIE_SECRET, если используем куки

_______________________________________________________________________________________________

// ! Подключим пользовательские скрипты
// * создаём в корне папку public
// * импортим в app.js библиотеку path (const path = require('path');)
// * пишем миддлвару, чтобы указать приложению путь до папки (app.use(express.static(path.join(__dirname, 'public/')));)
// * создаём в паблике папку js
// * создаём любой файл .js, пишем в нём скрипт
// * подключаем скрипт на страницу, проверяем

_______________________________________________________________________________________________

// ! делаем функцию для отображения
// * создаём папку lib, в ней файл renderTemplate.js
// * импортим бабель (require('@babel/register');)
// * импортим реакт и реакт-дом
// * const React = require('react');
// * const ReactDOMServer = require('react-dom/server');
// * пишем функцию:
/*
  const renderTemplate = (reactElement, properties, response) => {
    const reactEl = React.createElement(reactElement, properties);

    const html = ReactDOMServer.renderToStaticMarkup(reactEl);

    response.write('<!DOCTYPE html>');
    response.write(html);
    response.end();
  };
*/
// * пробуем отрендерить Main
// * импортим бабель в app.js (require('@babel/register');)
// * импортим renderTemplate и компонент Main в app.js
/*
  const renderTemplate = require('./lib/renderTemplate');
  const Main = require('./views/Main');
*/
// * вызываем renderTemplate в ручке (renderTemplate(Main, null, res);)

// ? Или создаём папку middleware, в ней ssr.js:
/*
const renderTemplate = require('../lib/renderTemplate');

function ssr(req, res, next) {
    res.render = (reactComponent, props) => {
        renderTemplate(reactComponent, { ...props, user: req.session?.user }, res);
    };
    next();
}

module.exports = ssr;

*/

// * const ssr = require('./middleware/ssr');
// * в app.js добавляем middleware: (app.use(ssr);)



// ? Cookies:
// * npm i express-session session-file-store bcrypt

// ! Важно для экзамена !
// * Добавь в скрипт
// * "dev": "nodemon app.js --ignore sessions --ext js,jsx",

// ! Важно для экзамена !
// * Добавь  папку sessions в gitignore

// * require всего необходимого
/*
const session = require('express-session')
const FileStore = require('session-file-store')(session)
*/ 

// * Конфиг для куки в виде файла сессий
const sessionConfig = {
  name: 'WhalesCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  }
}
// * Подключи сессии как мидлу
app.use(session(sessionConfig))
