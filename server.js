const express = require('express');

const PORT = 3000;
const app = express();
app.use(express.static(`${__dirname}/dist`));
// app.use(express.static(__dirname + '/dist'));

app.listen(PORT, () => {
  // console.log(`Мой текст в логе после запуска ${PORT}!`);
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
