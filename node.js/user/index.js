const db = require('../db');
const log = require('../logger')(module);

function User(name) {
    this.name = name;
}
User.prototype.sayHello = function(who) {
    // console.log(phrases.Hello + ", " + who.name);
    log(console.log(db.getPhrase('Hello') + ', ' + who.name));
}
// console.log("user.js is required!");

// exports.User = Index;
module.exports = User;
// global.User = User;
// console.log(module);
