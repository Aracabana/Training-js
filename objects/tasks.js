//let user = {};
//user.name = 'John';
//user.surname = 'Smith';
//user.name = 'Pete';
//delete user.name;
//console.log(user.name);

//let user = {};
//
//function isEmpty(obj) {
//    for (let key in obj) {
//        return false;
//    }
//    return true;
//}
//alert(isEmpty(user));
//user.name = 'John';
//alert(isEmpty(user));


//let salaries = {
//    John: 100,
//    Ann: 160,
//    Pete: 130
//};
//function sumSalaries(obj) {
//    let sum = 0;
//    for (let key in obj) {
//        sum += obj[key];
//    }
//    return sum;
//}
//alert(sumSalaries(salaries));

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};
function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            obj[key] *= 2;
        }
    }
    console.log(obj);
}
multiplyNumeric(menu);

