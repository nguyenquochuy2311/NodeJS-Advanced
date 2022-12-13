/**
 *  Là một hàm có thể ghi nhớ nơi nó được tạo và truy cập được biến bên ngoài phạm vi của nó
 * 
 * 
 * 
 * 
 * 
*/

function createCounter() {
    let counter = 0

    function increase() {
        return ++counter
    }

    return increase
}

const countF = createCounter();

console.log(countF());
console.log(countF());
console.log(countF());