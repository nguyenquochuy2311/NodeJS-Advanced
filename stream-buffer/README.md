# Stream

### Stream có thể hiểu là 1 chuỗi những mảnh dữ liệu được lắp ghép lại với nhau để tạo ra dòng chảy dữ liệu và chúng được tách ra vận chuyển với một đoạn dữ liệu gọi là chunk. Chunk là 1 đoạn dữ liệu được truyền qua 1 stream, diữ liệu được cắt ra thành những mảng chunks và chuyển đi.
Ví dụ, ta có 1 file có kích thước 128MB sẽ được tách ra thành 4 mảnh 32MB và chuyển đi



### Chúng ta sẽ có 4 loại stream:
- Readable stream: Tạo ra một stream để đọc
- Writeable stream: Tạo ra một stream để ghi
- Duplex stream: Tạo ra stream vừa để đọc và ghi trong cùng một thời điểm
- Transform stream: Giống như duplex nhwung dữ liệu có thể được thay đổi trong quá trình đọc và ghi

### Thao tác với stream
Streams là một chức năng rất mạnh trong Nodejs, tưởng tượng khi bạn làm việc với dữ liệu lớn trực tiếp bạn cần phải có một vùng nhớ đủ lớn để lưu trữ nó. Giả sử chúng ta có một file text 10GB mà trong khi đó server của bạn chỉ có 1GB Ram, để đọc file này ngay thì server sẽ không thể thực hiên được vì thiếu bộ nhớ. Streams cho phép chúng ta đọc các dữ liệu lớn bằng cách chia nhỏ dữ liệu ra và đọc giá trị theo từng phần.

- Đọc dữ liệu với streams
```sh
const fs = require("fs");
let data = '';
// Đọc file bằng streams bằng phương thức createReadStream
const readerStream = fs.createReadStream('input.txt');
// Kiểu mã hóa dùng là UTF8
readerStream.setEncoding('UTF8');
// Sự kiện khi đọc data
readerStream.on('data', function(chunk) {
   data += chunk;
});
//Khi kết thúc đọc data và in ra nội dung đã đọc
readerStream.on('end',function(){
   console.log(data)
});
//Khi xảy ra lỗi in ra lỗi
readerStream.on('error', function(err){
   console.log(err.stack);
});
```
### Ghi dữ liệu với Streams
Với NodeJS, để ghi một file từ streams chúng ta sử dụng phương thức createWriteStream() trong module fs. Tạo file writeStreams.js

```sh
const fs = require("fs");
let data = 'hocweb.vn';
//Sử dụng phương thức createWriteStream
const writerStream = fs.createWriteStream('output.txt');
// Ghi dữ liệu vào file
writerStream.write(data);
// Đánh dấu đây là cuối file
writerStream.end();
// Bắt sự kiện finish của Streams
writerStream.on('finish', function() {
    console.log("Write done.");
});
// Bắt sự kiện error khi xảy ra lỗi
writerStream.on('error', function(err){
   console.log(err.stack);
});
```

### Kỹ thuật Piping Stream trong Nodejs
Trong Streams ta còn có một khái niệm khác nữa đó là Piping (đường ống) cho phép chúng ta lấy dữ liệu đầu ra từ một stream làm đầu vào trong streams khác. Nó hoạt động như một đường ống giúp chuyển dữ liệu giữa các streams với nhau.

- Trong ví dụ này chúng ta lấy dữ liệu của file input.txt làm dữ liệu đầu vào cho file output.txt bằng cách tạo 2 streams và nối với nhau bằng phương thức pipe :

```sh
const fs = require("fs");
// Đọc stream đầu vào là file input bằng phương thức createReadStream
let readerStream = fs.createReadStream('input.txt');
// Ghi stream đầu ra là file input bằng phương thức createWriteStream
let writerStream = fs.createWriteStream('output.txt');
//Sử dụng khái niệm về Pipping để dùng dữ liệu đầu ra của readerStream làm giá trị đầu ra của writerStream
readerStream.pipe(writerStream);
```

### Kỹ thuật Piping Chaning trong Nodejs
Piping Chaining là kĩ thuật để kết nối đầu ra của các streams lại với nhau, nối đầu ra của streams này với streams khác tạo thành một chuỗi bao gồm nhiều các streams. Nó được sử dụng với cách hoạt động của piping. Chúng ta dùng kỹ thuật này để lấy đầu ra của một file, nén nó lại sau đó tiến hành ghi file nén đó ra trong NodeJS

```sh
//Sử dụng thư viện fs
const fs = require("fs");
//Sử dụng thư viện zlib dùng để nén file
const zlib = require('zlib')
//Phương thức có nhiệm vụ nén file
const gzip = zlib.createGzip()
//Đọc streams để lấy kết quả đầu ra
const readStream = fs.createReadStream('input.txt', 'utf8')
//Ghi streams ra file mới
const writeStream = fs.createWriteStream('output.txt.gz')
//Sử dụng kỹ thuật piping Chaining
readStream.pipe(gzip).pipe(writeStream)
```

Khi chạy chương trình trên, chương trình sẽ lấy đầu ra của file input.txt để nén file sau đó sẽ tạo ra một file nén mới có tên output.txt.gz. Đây là một kỹ thuật được sử dụng khá nhiều.

### Ghi file dữ liệu lớn sử dụng Streams
Đối với việc ghi một file lớn một cách thông thường bạn cần phải sử dụng rất nhiều bộ nhớ để xử lý việc ghi file. Nhưng đối với streams việc ghi file dữ liệu lớn không tốn quá nhiều bộ nhớ.

```sh
const fs = require('fs');
const file = fs.createWriteStream('bigfile.txt');
for(let i=0; i<= 1e6; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}
file.end();
```

Khi bạn ghi file bằng streams nó sẽ ghi vào file theo từng mảnh (chunk).

### Đọc file dữ liệu lớn sử dụng Streams

Chúng ta có một file vài GB, nếu bạn đọc thông thường thì server sẽ quá tải. Cách thức hoạt động của streams trong đọc file lớn là sẽ chia đọc theo từng phần. Khái niệm highWaterMark là kích cỡ của dữ liệu của mỗi chunk khi trong streams.

- Giả sử dung lượng của filebigText.txt là 40GB, nếu ta đọc file theo cách thông thường mất khá nhiều vùng nhớ :

```sh
const fs = require("fs");
fs.readFile("bigFile.txt","utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

- còn đây là đọc file sử dụng streams :
```sh
const fs = require("fs");
// Đọc file bằng streams bằng phương thức createReadStream
const readerStream = fs.createReadStream('bigFile.txt');
// Kiểu mã hóa dùng là UTF8
readerStream.setEncoding('UTF8');
// Sự kiện khi đọc data
readerStream.on('data', function(chunk) {
   console.log(chunk)
});
```
# Buffer