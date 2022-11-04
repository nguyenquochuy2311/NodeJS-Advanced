/**
 * Kiểm tra các scope của biến
 * 
 * Có 3 cách sử dụng "use strict";
 * - Sử dụng ngay đầu file .js
 * - Sử dụng thành global đặt thẻ script xuống dười cùng của cấu trúc thư mục chứa các file js <script>"use strict"</script>
 * - Sử dụng trong hàm function test() { "use strict"; }
*/

'use strict'

const student = {}

// Thuoc tinh freeze

/**C1:
 * const student = Object.freeze({
 *      fullName: 'Nguyen B'
 * })
 */ 

// C2
Object.defineProperty(student, 'fullName', {
    value: 'Nguyen A',
    writable: false //read only
})

student.fullName = 'Nguyen B' // Error

console.log(fullName);