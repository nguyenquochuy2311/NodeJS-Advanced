# RabbitMQ

## Các thuật ngữ
#### Messsage - Tin nhắn:
Đối tượng trung tâm trong hệ thống tin nhắn. Có định dạng XML, JSON, Binary data, ...)
#### Message broker - Đường ống tin nhắn: 
Đối tượng trung gian giữa Producer và Consumer vai trò quản trị, định tuyến các tin nhắn, trung tâm chuyển giao, phân phát các tin nhắn.
. Producer <-------> BROKER <----------> Consumer
![image](https://user-images.githubusercontent.com/52172667/195022457-8475192b-319e-4b10-98fe-2dfe92b5fd7b.png)

#### Message Queue - Hàng đợi tin nhắn: 
Theo cấu trúc queue. Giải pháp cho các tiến trình đồng bộ, bất đồng bộ trong ứng dụng lớn.
#### Message Producer: 
Nơi sản sinh, tạo ra các sự kiện
#### Message Consumer: 
Nơi nhận các sự kiện, điểm cuối của các tin nhắn. Hỗ trợ xử lý các sự kiện bât đồng bộ hoặc đồng bộ

=> RabbitMQ là một message broker (message-oriented middleware) sử dụng giao thức AMQP - Advanced Message Queue Protocol. RabbitMQ sẽ nhận 
message đến từ các thành phần khác nhau trong hệ thống, lưu trữ chúng an toàn trước khi đẩy đến đích.

#### Giao thức AMQP: Mục đích của giao thức là chuẩn hóa việc gửi tin nhắn giữa các hệ thống, tổ chức.
#### Kiến trúc AMQ: gồm 4 thành phần:
    - Message Flow: Luống xử lý message
    - Exchange: Nơi tiếp nhận message (từ publisher), định tuyến tới các Message Queue
    - Message Queue: Nơi lưu trữ các message, chuyển giao message tới consumers
    - Binding: quan hệ giữa Exchange và Message Queue, mô tả cách định tuyến message tới chính xác Message Queue

#### Message Flow
    - Bắt đầu khi Producer tạo message -> gửi tin nhắn tới Exchange
    - Exchange định tuyến tới Message Queue bằng Bindings -> Consumer nhận được message
###### Tại đó:
    - Message: Tạo ra bởi Publisher, sử dụng giao thức AMQP Client, Message chứa thông tin (Content, Properties, Routing Information)
    - Exchange: Nhận Message được gửi từ Producer định tuyến tới Queue mong muốn (định tuyến dựa trên thông tin Queue),
        message có thể được gửi tới 1 hoặc nhiều queue dựa theo Binding
    - Message Queue: Nhận Message, đặt vào hàng chờ. Tới thời điểm, Message Queue sẽ gửi message tới consumer. Nếu quá trình truyền có vấn đề, 
        MQ sẽ lưu thông tin vào disk or ram, lưu trữ phục vụ mục đích tái gửi.
    - Consumer: Nơi message được gửi tới (callback function)

#### Exchange(EX): thành phần chịu trách nhiệm định tuyến message tới đích mong muốn, 0 hoặc 1 hoặc nhiều queue
Các thuộc tính quan trọng trong exchange:
    - Tên định danh: Exchange có định danh độc nhất
    - Tính bền vững (Durable): nếu thiết lập, EX lưu trữ hàng đợi tin nhắn (tạm thời hoặc luôn luôn)
    - Tính làm sạch (Auto-delete): nếu thiết lập, EX tự xóa khi hoàn thành tác vụ

#### Message queue (MQ): 
Nơi lưu giữ Message (cơ chế FIFO). Khác với kiểu dữ liệu Queue, Message Queue có thể được sử dụng với nhiều consumer và publisher
##### Các thuộc tính quan trọng trong Message Queue:
    - Tên định danh: Message queues có định danh độc nhất (có thể được random)
    - Tên bền vững (Durable): lưu giữ hàng đợi tin nhắn (tạm thời hoặc luôn luôn)
    - Tính chuyển dụng (Exclusive): Nếu thiết lập, MQ sẽ tự động xóa khi ngắt kết nối
    - Tính làm sạch (Auto-delete): Nếu thiết lập, MQ tự xóa khi consumer hủy liên kết
![image](https://user-images.githubusercontent.com/52172667/195022821-2261455b-d02c-4f34-9624-4f835328819c.png)

#### Binding: 
Thông số, chỉ số hỗ trợ EX định tuyến message giữ các queue. Các thông số, chỉ số được gọi là routing keyAMQ hỗ trợ nhiều loại
routing key phục vụ các bài toán khác nhau.

##### Các loại Exchange cơ bản
- Direct Exchange: định tuyến message tới một queue phù hợp bằng routing key. Khi đó routing key có định danh
giống với queue chỉ định. Message sẽ được gửi tới queue duy nhất theo khóa định danh.
![image](https://user-images.githubusercontent.com/52172667/195023060-64fa8682-aa78-4f7a-9146-2f30d4ebbdae.png)

- Fanout Exchange: định tuyến message tới tất cả các queue có sẵn
![image](https://user-images.githubusercontent.com/52172667/195023079-a9371bcd-b70a-4058-9441-0b3838ce7007.png)

- Topic Exchange: định tuyến tới nhiều queue phù hợp bằng routing key. Khi đó routing key có định danh
giống 0 hoặc 1 hoặc nhiều queue. Khớp routing key bằng phương pháp regex
![image](https://user-images.githubusercontent.com/52172667/195023115-810ca602-d98a-4443-a2c9-81be1b2b72bf.png)

- Headers Exchange: 
![image](https://user-images.githubusercontent.com/52172667/195023153-ee818d92-9c76-4c4f-9024-9a77da19e3c1.png)

#### Rabbit MQ Management
![image](https://user-images.githubusercontent.com/52172667/197665400-38b4842e-e5f1-43a7-abb2-a27acf754bd6.png)

#### Dead Letter Exchange 
Là một tin nhắn không thể gửi đến người nhận. Dead Letter Queue (DLQ), là hàng đợi chưa tin nhắn chưa được gửi, khôgn thể gửi đến đích của chúng vì lý do khác.
- Tin nhắn bị từ chối (rejected) bởi một Queue Exchange
- Message hết hạn (expire) do Time to live (TTL)
- Vượt quá giới hạn chiều dài hàng đợi (length limit).
- Dead Letter Exchange là một Exchange bình thường, có thể là một trong 4 loại Exchange (Direct, Fanout, Topic, Headers)

- Chức năng với Dead Letter Message:
+ Gửi tới một Dead Letter Exchange
+ Thêm một số thông tin vào header của Message trước khi gửi đến Dead Letter Exchange

![image](https://user-images.githubusercontent.com/52172667/197666304-a1a5da52-1f19-49fc-9c86-1a9d47737e8b.png)

=> Xem thêm : https://topdev.vn/blog/su-dung-dead-letter-exchange-trong-rabbitmq/

## Cách cài đặt
- Instal ErLang language
- Download: https://www.rabbitmq.com/install-windows.html
- Config env: 
![image](https://user-images.githubusercontent.com/52172667/195038352-04b94287-22c2-44f0-a5c4-d051edacb5d9.png)

![image](https://user-images.githubusercontent.com/52172667/195038404-24b37b62-ca2a-4e0f-b5ad-09cc94a90201.png)
 - Open search by name "RabbitMQ Service"

```sh
rabbitmq-plugins enable rabbitmq_management
```

- Access local management of rabbit mq with port 15672

