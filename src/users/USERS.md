# 👤 Users Module — Hướng dẫn Test API

> **Base URL:** `http://localhost:8000/api/v1`  
> **Swagger UI:** `http://localhost:8000/swagger`

---

## Tổng quan

Module Users quản lý tài khoản người dùng với đầy đủ CRUD + soft-delete.

| Method | Endpoint     | Cần JWT? | Mô tả                            |
| ------ | ------------ | -------- | -------------------------------- |
| POST   | `/users`     | ❌ Không | Đăng ký tài khoản mới            |
| GET    | `/users`     | ✅ Có    | Lấy danh sách users (phân trang) |
| GET    | `/users/:id` | ✅ Có    | Lấy thông tin 1 user theo ID     |
| PUT    | `/users/:id` | ✅ Có    | Cập nhật thông tin user          |
| DELETE | `/users/:id` | ✅ Có    | Xóa mềm user (soft-delete)       |

> ⚠️ Tất cả endpoint trừ `POST /users` đều yêu cầu **Bearer Token**.  
> Xem hướng dẫn Authorize ở cuối file.

---

## 1. POST `/users` — Đăng ký tài khoản

### Mô tả

- Tạo user mới trong hệ thống
- Password được **hash bằng bcrypt** trước khi lưu vào DB
- **Không cần đăng nhập** (public endpoint)

### Request Body

```json
{
  "name": "Nguyen Van A",
  "email": "user@gmail.com",
  "password": "123456",
  "age": 22,
  "gender": "male",
  "address": "Ha Noi",
  "role": "USER"
}
```

| Field      | Kiểu   | Bắt buộc | Mô tả                                   |
| ---------- | ------ | -------- | --------------------------------------- |
| `name`     | string | ✅       | Họ tên đầy đủ                           |
| `email`    | string | ✅       | Email hợp lệ, phải là duy nhất trong DB |
| `password` | string | ✅       | Mật khẩu plain text, hệ thống tự hash   |
| `age`      | number | ❌       | Tuổi (số nguyên)                        |
| `gender`   | string | ❌       | Giới tính: `"male"` / `"female"`        |
| `address`  | string | ❌       | Địa chỉ                                 |
| `role`     | string | ❌       | `"USER"` (mặc định) hoặc `"ADMIN"`      |

### Response thành công (201)

```json
{
  "statusCode": 201,
  "message": "",
  "data": {
    "_id": "69fab8ea8889109f47996923",
    "name": "Nguyen Van A",
    "email": "user@gmail.com",
    "age": 22,
    "gender": "male",
    "address": "Ha Noi",
    "role": "USER",
    "isDeleted": false,
    "createdAt": "2026-05-06T03:43:38.455Z",
    "updatedAt": "2026-05-06T03:43:38.455Z"
  }
}
```

> ✅ Response **không** trả về `password` hoặc `refreshToken` vì lý do bảo mật.

### Lỗi thường gặp

| Status | Message                         | Nguyên nhân                |
| ------ | ------------------------------- | -------------------------- |
| 400    | `email must be an email`        | Email sai định dạng        |
| 400    | `name should not be empty`      | Thiếu trường bắt buộc      |
| 400    | `property xyz should not exist` | Gửi trường không được phép |
| 500    | `E11000 duplicate key`          | Email đã tồn tại trong DB  |

---

## 2. GET `/users` — Danh sách users (phân trang)

### Mô tả

- Trả về danh sách users với phân trang
- Hỗ trợ lọc nâng cao qua query params (thư viện `api-query-params`)
- **Yêu cầu Bearer Token**

### Query Parameters

| Param      | Mô tả                            | Ví dụ                        |
| ---------- | -------------------------------- | ---------------------------- |
| `current`  | Trang hiện tại (mặc định: 1)     | `current=1`                  |
| `pageSize` | Số item mỗi trang (mặc định: 10) | `pageSize=5`                 |
| `role`     | Lọc theo role                    | `role=ADMIN`                 |
| `name`     | Lọc theo tên (chứa)              | `name=Nguyen`                |
| `sort`     | Sắp xếp                          | `sort=-createdAt` (giảm dần) |

### Ví dụ URL

```
GET /api/v1/users?current=1&pageSize=5
GET /api/v1/users?current=1&pageSize=10&role=ADMIN
GET /api/v1/users?current=2&pageSize=5&sort=-createdAt
```

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "",
  "data": {
    "meta": {
      "current": 1,
      "pageSize": 5,
      "pages": 2,
      "total": 9
    },
    "result": [
      {
        "_id": "69fab8ea8889109f47996923",
        "name": "Nguyen Van A",
        "email": "user@gmail.com",
        "role": "USER",
        "isDeleted": false,
        "createdAt": "2026-05-06T03:43:38.455Z"
      }
    ]
  }
}
```

| Field trong `meta` | Mô tả                      |
| ------------------ | -------------------------- |
| `current`          | Trang hiện tại             |
| `pageSize`         | Số item mỗi trang          |
| `pages`            | Tổng số trang              |
| `total`            | Tổng số user (chưa bị xóa) |

> 💡 Soft-deleted users (`isDeleted: true`) **không xuất hiện** trong danh sách.

### Test trên Swagger

1. Vào `GET /users` → **Try it out**
2. Nhập `current = 1`, `pageSize = 10`
3. Click **Execute**

---

## 3. GET `/users/:id` — Lấy thông tin 1 user

### Mô tả

- Lấy thông tin chi tiết của 1 user theo MongoDB ObjectId
- **Yêu cầu Bearer Token**

### Path Parameter

| Param | Mô tả                     | Ví dụ                      |
| ----- | ------------------------- | -------------------------- |
| `id`  | MongoDB ObjectId của user | `69fab8ea8889109f47996923` |

> ⁉️ **Lấy `_id` ở đâu?**
>
> - Từ response của `POST /users` (đăng ký)
> - Từ `data.user._id` trong response `POST /auth/login`
> - Từ danh sách trong `GET /users`

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "",
  "data": {
    "_id": "69fab8ea8889109f47996923",
    "name": "Nguyen Van A",
    "email": "user@gmail.com",
    "age": 22,
    "gender": "male",
    "address": "Ha Noi",
    "role": "USER",
    "isDeleted": false,
    "createdAt": "2026-05-06T03:43:38.455Z",
    "updatedAt": "2026-05-06T03:43:38.455Z"
  }
}
```

### Lỗi thường gặp

| Status | Message                      | Nguyên nhân                             |
| ------ | ---------------------------- | --------------------------------------- |
| 404    | `User with id ... not found` | ID không tồn tại hoặc đã bị soft-delete |
| 400    | `CastError`                  | ID không đúng định dạng ObjectId        |

---

## 4. PUT `/users/:id` — Cập nhật user

### Mô tả

- Cập nhật thông tin user (trừ email và password)
- **Yêu cầu Bearer Token**
- Sử dụng `whitelist: true` → chỉ các field trong DTO mới được chấp nhận

### Path Parameter

| Param | Mô tả                                  |
| ----- | -------------------------------------- |
| `id`  | MongoDB ObjectId của user cần cập nhật |

### Request Body

```json
{
  "name": "Nguyen Van B",
  "age": 25,
  "gender": "female",
  "address": "Ho Chi Minh"
}
```

| Field     | Kiểu   | Bắt buộc | Mô tả                   |
| --------- | ------ | -------- | ----------------------- |
| `name`    | string | ❌       | Tên mới                 |
| `age`     | number | ❌       | Tuổi mới                |
| `gender`  | string | ❌       | Giới tính mới           |
| `address` | string | ❌       | Địa chỉ mới             |
| `role`    | string | ❌       | `"USER"` hoặc `"ADMIN"` |

> ⚠️ **Không thể** đổi `email` hoặc `password` qua endpoint này.

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "",
  "data": {
    "_id": "69fab8ea8889109f47996923",
    "name": "Nguyen Van B",
    "email": "user@gmail.com",
    "age": 25,
    "gender": "female",
    "address": "Ho Chi Minh",
    "role": "USER",
    "isDeleted": false,
    "createdAt": "2026-05-06T03:43:38.455Z",
    "updatedAt": "2026-05-06T04:00:00.000Z"
  }
}
```

---

## 5. DELETE `/users/:id` — Xóa mềm user (Soft Delete)

### Mô tả

- **Soft delete**: không xóa thật khỏi DB, chỉ set `isDeleted: true`
- User bị xóa sẽ **biến mất** khỏi `GET /users` nhưng vẫn còn trong MongoDB
- **Yêu cầu Bearer Token**

### Path Parameter

| Param | Mô tả                             |
| ----- | --------------------------------- |
| `id`  | MongoDB ObjectId của user cần xóa |

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "",
  "data": {
    "deleted": 1
  }
}
```

| Field     | Mô tả                                                                  |
| --------- | ---------------------------------------------------------------------- |
| `deleted` | Số lượng document bị đánh dấu xóa (1 = thành công, 0 = không tìm thấy) |

> 💡 Sau khi xóa, `GET /users/:id` với ID đó sẽ trả về **404**.

---

## 🔑 Cách Authorize trong Swagger

1. Gọi `POST /auth/login` với `email` + `password` đã đăng ký
2. Copy giá trị `access_token` trong `data`
3. Click **Authorize** (góc phải trên trang Swagger)
4. Dán `access_token` vào ô **Value** (chỉ token, không gõ "Bearer")
5. Click **Authorize** → tất cả `🔒` endpoint sẽ tự gắn token

---

## 📋 Flow test đầy đủ Users

```
Bước 1: POST /users           → Tạo user mới
         Body: { name, email, password }
         Lưu lại: _id từ response

Bước 2: POST /auth/login      → Lấy token
         Body: { email, password }
         Lưu lại: access_token

Bước 3: Authorize trên Swagger với access_token

Bước 4: GET /users            → Xem danh sách (current=1, pageSize=10)

Bước 5: GET /users/:id        → Xem chi tiết (dùng _id từ bước 1)

Bước 6: PUT /users/:id        → Cập nhật
         Body: { name, age, gender, address }

Bước 7: DELETE /users/:id     → Xóa mềm

Bước 8: GET /users            → Verify user đã biến mất khỏi danh sách
```
