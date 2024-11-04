# G-Score

G-Score là một ứng dụng web cho phép người dùng tra cứu điểm thi THPT và xem thống kê mức điểm theo từng môn.

## Nội dung

- [Yêu cầu](#yêu-cầu)
- [Cài đặt](#cài-đặt)
- [Chạy ứng dụng bằng Docker](#chạy-ứng-dụng-bằng-docker)
- [Chạy ứng dụng bằng npm](#chạy-ứng-dụng-bằng-npm)
- [Cách sử dụng](#cách-sử-dụng)
## Yêu cầu

- Docker
- Docker Compose

## Cài đặt

Để cài đặt dự án, bạn có thể clone nó từ GitHub:

```bash
git clone https://github.com/MtLuth/g-score.git
cd g-score
```

## Chạy ứng dụng bằng docker
Mở terminal ở thư mục gốc
```bash
docker compose-up --build
```

## Cách chạy ứng dụng bằng npm
## 1. Chạy server
- Mở terminal ở thư mục gốc
- Di chuyển đến thư mục backend (server):

 ```bash
 cd server
npm run dev
```

## 2.Chạy client
- Mở terminal mới tại thư mục gốc
- Di chuyển đến thưc mục frontend (client)

```bash
cd client
npm run dev
```
