### Overview about Apollo Server

![image](https://user-images.githubusercontent.com/52172667/191038373-e6b97e2e-1a17-4ac8-8be5-3fad82ad8458.png)

- Apollo Server là một open source, tuân thủ các quy tắc của GraphQL.
- Apollo Server như là:
+ Cổng đồ thị siêu liên hợp (federated supergraph)
+ Máy chủ GraphQL độc lập, bao gồm cả môi trường không có máy chủ
+ Giống như một middleware cho ứng dụng nodejs

- Apollo Server cung cấp:
+ Thiết lập đơn giản, nạp dữ liệu nhanh chóng
+ Khả năng phát triển, cho phép phát triển tính năng khi cần
+ Tính bao quát, với các nguồn dữ liệu, bất kỳ tool nào và GraphQL client nào
+ Sẵn sàng lên production, cho phép làm các tính năng nhan hơn


# Create Apollo Server
- Step 1: Create new project
```sh
mkdir graphql-server-example
cd graphql-server-example
```

```sh
npm init --yes
```

- Step 2: Install dependencies
---Ứng dụng Apollo Server yêu cầu 2 lớp dependencies:
+ apollo-server: thư viện core của Apollo Server, điều này giúp nạp dữ liệu và nạp nó.
+ graphql: thư viện để build dạng GraphQL Schema và thực hiện các queries của chúng.

```sh
npm install apollo-server graphql
```

```sh
touch index.js
```

- Step 3: Định nghĩa GraphQL Schema
