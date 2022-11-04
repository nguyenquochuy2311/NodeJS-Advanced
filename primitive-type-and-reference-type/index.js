let a = 1 // Tao ra mot o nho, luu 1 vao o nho
let b = a // Tao ra o nho cho b, sao chep gia tri cua a vao o nho cua b

a = 2 // Thay doi gia tri tai o nho

console.log(b) // Output 1

/////////////////// Reference Type: Object, Array, Function
let c = {
    name: 'ABC',
    other: {
        last: 'DEF'
    }
} // Tao ra dia chi moi cho c, luu object vao o nho, (se tao dia chi (o nho) tu trong ra ngoai)

let d = c // Tao d, tro toi cung dia chi cua c

c.name = '123'// khi thay doi c vi d tro toi dia chi cua c nen d  thay doi

console.log(d) // Change c => d change


const v1 = {
    name: 'ABC'
}

const v2 = {
    name: 'ABC'
}

console.log(v1 === v2);