# G-Score

G-Score là một ứng dụng web cho phép người dùng tra cứu điểm thi THPT và xem thống kê mức điểm theo từng môn.

## Nội dung

- [Yêu cầu](#yêu-cầu)
- [Cài đặt](#cài-đặt)
- [Seed dữ liệu thô](#Seed-dữ-liệu)
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
## Seed dữ liệu
1. Truy cập thư mục server/seeders
2. Thêm dữ liệu thô cần seed với tệp csv. Sau đó đổi tên tệp thành data.csv (Lưu ý: Tệp phải đúng định dạng dữ liệu theo ảnh)
![image](https://github.com/user-attachments/assets/6c563d8e-a06f-4c1b-85f4-5e3f597d75e3)



## Chạy ứng dụng bằng docker
Mở terminal ở thư mục gốc
```bash
docker compose up --build
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
## Cách sử dụng
## a. Tại trang home sẽ hiển thị bảng Top 10 học sinh khối A.
![Screenshot 2024-11-04 120415](https://github.com/user-attachments/assets/d15fdb10-8c52-42da-824b-7c59a14432be)

## b. Tại trang Search Score: Người dùng thực hiện tra cứu điểm bằng Số báo danh.
- Ở thẻ user registramtion: Người dùng nhập số báo danh cần tra cứu.(Lưu ý: Số báo danh có 8 chữ số) sau đó ấn "Submit"
  ![image](https://github.com/user-attachments/assets/316815b5-9d4e-4fcb-8552-f078f57ec85b)
- Kết quả sẽ hiển thị ở thẻ Detailed Score
  ![image](https://github.com/user-attachments/assets/1bf5eecd-bff4-4ab9-9afa-2b00ec247088)

## c. Tại trang Report: Người dùng có thể xem thống kê 4 mức điểm mà học sinh đạt được theo từng môn.
![image](https://github.com/user-attachments/assets/0f6bb0b3-2892-41bc-9a06-ed38036e8e57)

## d. Ngoài ra có thêm tính năng import kết quả thi bằng file .csv
- Người dùng truy cập trang import. Nhấn vào nút UploadFile sau đó chọn tệp cần import. (Lưu ý: Tệp csv có định dạng ![image](https://github.com/user-attachments/assets/7249fce1-9150-4aad-8135-9c089f2f23ab)
- Sau khi upload file người dùng nhấn nút Nhập dữ liệu thì tất cả thông tin điểm thi sẽ được thêm vào server.
  ![image](https://github.com/user-attachments/assets/2663b54f-4b7d-4942-9d21-bbdd3f6daa68)



