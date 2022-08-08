/*
Observer pattern là một design pattern nơi mà một object (thường được gọi là subject) có nhiệm vụ duy trì một danh sách các object dựa vào nó, tự động thông báo đến các object đó nếu có bất kì sự thay đổi nào về trạng thái.
*/

class Subject {
    constructor() {
        this.observers = []
    }
    // Dùng để đăng ký
    subscribe(func) {
        this.observers.push(func)
    }
    // Dùng để hủy đăng ký
    unsubscribe(func) {
        this.observers = this.observers.filter((subscriber) => subscriber !== func)
    }
    // Gửi 1 thông báo đến mọi
    fire(data) {
        this.observers.forEach((observer) => observer(data))
    }
}

//intial class
const $gun = new Subject()
const func = (value) => {
    console.log(value)
}
$gun.subscribe(func)
$gun.fire('boom')
$gun.unsubscribe(func)