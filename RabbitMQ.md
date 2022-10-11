# RabbitMQ

Các thuật ngữ
### Messsage - Tin nhắn:
Đối tượng trung tâm trong hệ thống tin nhắn. Có định dạng XML, JSON, Binary data, ...)
### Message broker - Đường ống tin nhắn: 
- Đối tượng trung gian giữa Producer và Consumer vai trò quản trị, định tuyến các tin nhắn, 
trung tâm chuyển giao, phân phát các tin nhắn.
Producer <-------> BROKER <----------> Consumer
https://lacoski.github.io/media/enterprise-messaging-system.jpg

- Message Queue - Hàng đợi tin nhắn: Theo cấu trúc queue. Giải pháp cho các tiến trình đồng bộ, bất đồng bộ trong ứng dụng lớn.
- Message Producer: Nơi sản sinh, tạo ra các sự kiện
- Message Consumer: Nơi nhận các sự kiện, điểm cuối của các tin nhắn. Hỗ trợ xử lý các sự kiện bât đồng bộ hoặc đồng bộ

=> RabbitMQ là một message broker (message-oriented middleware) sử dụng giao thức AMQP - Advanced Message Queue Protocol. RabbitMQ sẽ nhận 
message đến từ các thành phần khác nhau trong hệ thống, lưu trữ chúng an toàn trước khi đẩy đến đích.

- Giao thức AMQP: Mục đích của giao thức là chuẩn hóa việc gửi tin nhắn giữa các hệ thống, tổ chức.
- Kiến trúc AMQ: gồm 4 thành phần:
    + Message Flow: Luống xử lý message
    + Exchange: Nơi tiếp nhận message (từ publisher), định tuyến tới các Message Queue
    + Message Queue: Nơi lưu trữ các message, chuyển giao message tới consumers
    + Binding: quan hệ giữa Exchange và Message Queue, mô tả cách định tuyến message tới chính xác Message Queue

- Message Flow
    -> Bắt đầu khi Producer tạo message -> gửi tin nhắn tới Exchange
    -> Exchange định tuyến tới Message Queue bằng Bindings -> Consumer nhận được message
Tại đó:
    - Message: Tạo ra bởi Publisher, sử dụng giao thức AMQP Client, Message chứa thông tin (Content, Properties, Routing Information)
    - Exchange: Nhận Message được gửi từ Producer định tuyến tới Queue mong muốn (định tuyến dựa trên thông tin Queue),
        message có thể được gửi tới 1 hoặc nhiều queue dựa theo Binding
    - Message Queue: Nhận Message, đặt vào hàng chờ. Tới thời điểm, Message Queue sẽ gửi message tới consumer. Nếu quá trình truyền có vấn đề, 
        MQ sẽ lưu thông tin vào disk or ram, lưu trữ phục vụ mục đích tái gửi.
    - Consumer: Nơi message được gửi tới (callback function)

- Exchange(EX): thành phần chịu trách nhiệm định tuyến message tới đích mong muốn, 0 hoặc 1 hoặc nhiều queue
Các thuộc tính quan trọng trong exchange:
    + Tên định danh: Exchange có định danh độc nhất
    + Tính bền vững (Durable): nếu thiết lập, EX lưu trữ hàng đợi tin nhắn (tạm thời hoặc luôn luôn)
    + Tính làm sạch (Auto-delete): nếu thiết lập, EX tự xóa khi hoàn thành tác vụ

- Message queue (MQ): nơi lưu giữ Message (cơ chế FIFO). Khác với kiểu dữ liệu Queue, Message Queue có thể được sử dụng với nhiều
    consumer và publisher
Các thuộc tính quan trọng trong Message Queue:
    + Tên định danh: Message queues có định danh độc nhất (có thể được random)
    + Tên bền vững (Durable): lưu giữ hàng đợi tin nhắn (tạm thời hoặc luôn luôn)
    + Tính chuyển dụng (Exclusive): Nếu thiết lập, MQ sẽ tự động xóa khi ngắt kết nối
    + Tính làm sạch (Auto-delete): Nếu thiết lập, MQ tự xóa khi consumer hủy liên kết

- Binding: Thông số, chỉ số hỗ trợ EX định tuyến message giữ các queue. Các thông số, chỉ số được gọi là routing keyAMQ hỗ trợ nhiều loại
routing key phục vụ các bài toán khác nhau.

- Các loại Exchange cơ bản
+ Direct Exchange: định tuyến message tới một queue phù hợp bằng routing key. Khi đó routing key có định danh
giống với queue chỉ định. Message sẽ được gửi tới queue duy nhất theo khóa định danh.

+ Fanout Exchange: định tuyến message tới tất cả các queue có sẵn

+ Topic Exchange: định tuyến tới nhiều queue phù hợp bằng routing key. Khi đó routing key có định danh
giống 0 hoặc 1 hoặc nhiều queue. Khớp routing key bằng phương pháp regex

+ Headers Exchange: 

