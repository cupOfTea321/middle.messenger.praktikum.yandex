// const express = require('express');
//
// const PORT = 3000;
// const app = express();
// app.use(express.static(`${__dirname}/dist`));
// // app.use(express.static(__dirname + '/dist'));
//
// app.listen(PORT, () => {
//   // console.log(`Мой текст в логе после запуска ${PORT}!`);
// });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/dist/'));


app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

// const express = require('express')
// const app = express()
// const port = 3000
//
// app.get('/', (request, response) => {
//     response.send('Hello from Express!')
// })
//
// app.listen(port, (err) => {
//     if (err) {
//         return console.log('something bad happened', err)
//     }
//
//     console.log(`server is listening on ${port}`)
// })
