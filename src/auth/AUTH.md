# 🔐 Auth Module — Hướng dẫn Test API

> **Base URL:** `http://localhost:8000/api/v1`  
> **Swagger UI:** `http://localhost:8000/swagger`

---

## Tổng quan

Module Auth xử lý xác thực người dùng gồm 3 endpoint:

| Method | Endpoint        | Cần JWT? | Mô tả                                   |
| ------ | --------------- | -------- | --------------------------------------- |
| POST   | `/auth/login`   | ❌ Không | Đăng nhập, lấy access_token             |
| POST   | `/auth/refresh` | ❌ Không | Làm mới access_token bằng refresh_token |
| POST   | `/auth/logout`  | ✅ Có    | Đăng xuất, xóa refresh_token            |

---

## 1. POST `/auth/login` — Đăng nhập

### Mô tả

- Nhận email + password, xác thực qua Local Strategy (Passport)
- Trả về `access_token` (hết hạn sau **24h**) và `refresh_token` (hết hạn sau **7 ngày**)
- **Không cần Bearer Token**

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

| Field      | Kiểu   | Bắt buộc | Mô tả                                                   |
| ---------- | ------ | -------- | ------------------------------------------------------- |
| `email`    | string | ✅       | Email đã đăng ký qua `POST /users`                      |
| `password` | string | ✅       | Mật khẩu dạng plain text (hệ thống tự so sánh với hash) |

### Response thành công (201)

```json
{
  "statusCode": 201,
  "message": "",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "69fab8ea8889109f47996923",
      "name": "Nguyen Van A",
      "email": "user@gmail.com",
      "role": "USER"
    }
  }
}
```

### Lỗi thường gặp

| Status | Message                  | Nguyên nhân                |
| ------ | ------------------------ | -------------------------- |
| 401    | `Invalid credentials`    | Sai email hoặc password    |
| 400    | `email must be an email` | Email không đúng định dạng |

### Test trên Swagger

1. Vào section **auth** → `POST /auth/login`
2. Click **Try it out**
3. Điền body như trên — dùng đúng email đã đăng ký
4. Click **Execute**
5. Copy giá trị `access_token` trong response để dùng cho bước Authorize

---

## 2. POST `/auth/refresh` — Làm mới Access Token

### Mô tả

- Khi `access_token` hết hạn, dùng endpoint này để lấy `access_token` mới
- Cần gửi `userId` + `refresh_token` nhận được từ bước Login
- `refresh_token` được lưu dạng **bcrypt hash** trong DB để bảo mật

### Request Body

```json
{
  "userId": "69fab8ea8889109f47996923",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field           | Kiểu   | Bắt buộc | Lấy ở đâu                                        |
| --------------- | ------ | -------- | ------------------------------------------------ |
| `userId`        | string | ✅       | Lấy từ `data.user._id` trong response Login      |
| `refresh_token` | string | ✅       | Lấy từ `data.refresh_token` trong response Login |

### Response thành công (201)

```json
{
  "statusCode": 201,
  "message": "",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

> ⚠️ Chỉ trả về `access_token` mới, **không** cấp lại `refresh_token`.

### Lỗi thường gặp

| Status | Message        | Nguyên nhân                                                 |
| ------ | -------------- | ----------------------------------------------------------- |
| 401    | `Unauthorized` | `userId` không tồn tại hoặc `refresh_token` sai / đã logout |
| 400    | Bad Request    | Thiếu `userId` hoặc `refresh_token`                         |

---

## 3. POST `/auth/logout` — Đăng xuất

### Mô tả

- Xóa `refresh_token` của user trong DB (set về `null`)
- Sau khi logout, gọi `/auth/refresh` sẽ thất bại
- **Bắt buộc gửi Bearer Token trong Header**

### Request Header

```
Authorization: Bearer <access_token>
```

### Request Body

Không cần body.

### Response thành công (201)

```json
{
  "statusCode": 201,
  "message": "",
  "data": {
    "message": "Logout successful"
  }
}
```

### Test trên Swagger

1. Phải **Authorize** trước (xem hướng dẫn bên dưới)
2. Vào `POST /auth/logout` → **Try it out** → **Execute**

---

## 🔑 Cách Authorize trong Swagger

Đây là bước **quan trọng nhất** để test các endpoint có `🔒`:

1. Gọi `POST /auth/login` lấy `access_token`
2. Click nút **Authorize** (góc phải trên cùng trang Swagger)
3. Trong ô **Value**, nhập: `<access_token>` (chỉ dán token, **không** cần gõ "Bearer")
4. Click **Authorize** → **Close**
5. Từ đây tất cả request sẽ tự động gắn `Authorization: Bearer <token>`

---

## 📋 Flow đầy đủ khi test

```
1. POST /users        → Đăng ký tài khoản (nếu chưa có)
2. POST /auth/login   → Đăng nhập → lưu access_token + refresh_token + _id
3. [Dùng các API khác với access_token]
4. POST /auth/refresh → Khi access_token hết hạn → lấy token mới
5. POST /auth/logout  → Đăng xuất
```
