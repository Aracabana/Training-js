// const http = require("http");
// http.createServer(function(request, response) {
//     response.end('Hello, Node JS!');
// }).listen(3000, '127.0.0.1', function () {
//     console.log('Сервер начал прослушивание запроса на порту 3000')
// });
const db = require('./db');
db.connect();
//подключение переменной из отдельного модуля
// const user = require('./user'); (если подключено через просто exports)
const User = require('./user'); //(если подключено через module.exports)
function run() {
    // let vasya = new user.User('Вася'); (если подключено через просто exports)
    // let petya = new user.User('Петя'); (если подключено через просто exports)
    let vasya = new User('Вася'); //(если подключено через module.exports)
    let petya = new User('Петя'); //(если подключено через module.exports)
    vasya.sayHello(petya);
    
    console.log(db.getPhrase('Run successful'));
}

//глобальная переменная
// require('./user.js');
// let vasya = new User('Вася');
// let petya = new User('Петя');
// vasya.sayHello(petya);

if (module.parent) {
    exports.run = run;
} else {
    run();
}
