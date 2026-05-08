# 🏢 Companies Module — Hướng dẫn Test API

> **Base URL:** `http://localhost:8000/api/v1`  
> **Swagger UI:** `http://localhost:8000/swagger`

---

## Tổng quan

Module Companies quản lý thông tin công ty tuyển dụng với đầy đủ CRUD + soft-delete.  
Mọi thao tác đều **ghi lại audit trail** (ai tạo, ai sửa, ai xóa).

| Method | Endpoint         | Cần JWT? | Mô tả                              |
| ------ | ---------------- | -------- | ---------------------------------- |
| POST   | `/companies`     | ✅ Có    | Tạo công ty mới                    |
| GET    | `/companies`     | ✅ Có    | Lấy danh sách công ty (phân trang) |
| GET    | `/companies/:id` | ✅ Có    | Lấy thông tin 1 công ty            |
| PATCH  | `/companies/:id` | ✅ Có    | Cập nhật thông tin công ty         |
| DELETE | `/companies/:id` | ✅ Có    | Xóa mềm công ty                    |

> ⚠️ **Tất cả endpoint** đều yêu cầu **Bearer Token**.  
> Phải đăng nhập (`POST /auth/login`) và Authorize trước khi test.

---

## 1. POST `/companies` — Tạo công ty mới

### Mô tả

- Tạo company mới, tự động gán `createdBy` từ JWT của người đang đăng nhập
- **Yêu cầu Bearer Token**

### Request Body

```json
{
  "name": "FPT Software",
  "address": "Ha Noi",
  "description": "Leading IT company in Vietnam",
  "logo": "https://fpt.com/logo.png"
}
```

| Field         | Kiểu         | Bắt buộc | Mô tả                                  |
| ------------- | ------------ | -------- | -------------------------------------- |
| `name`        | string       | ✅       | Tên công ty (phải có)                  |
| `address`     | string       | ❌       | Địa chỉ công ty                        |
| `description` | string       | ❌       | Mô tả ngắn về công ty                  |
| `logo`        | string (URL) | ❌       | Link URL đến logo (phải là URL hợp lệ) |

> ⚠️ Nếu điền `logo` thì phải là URL đầy đủ: `https://...`  
> Ví dụ sai: `"fpt-logo.png"` → lỗi validation

### Response thành công (201)

```json
{
  "statusCode": 201,
  "message": "Create a new company",
  "data": {
    "_id": "69fab4d8119e4ad19cddf820",
    "name": "FPT Software",
    "address": "Ha Noi",
    "description": "Leading IT company in Vietnam",
    "logo": "https://fpt.com/logo.png",
    "createdBy": {
      "_id": "69fab8ea8889109f47996923",
      "email": "user@gmail.com"
    },
    "isDeleted": false,
    "createdAt": "2026-05-06T03:26:16.364Z",
    "updatedAt": "2026-05-06T03:26:16.364Z",
    "__v": 0
  }
}
```

| Field trong response | Mô tả                                    |
| -------------------- | ---------------------------------------- |
| `_id`                | ID của company, dùng cho các request sau |
| `createdBy._id`      | ID của user đang đăng nhập (lấy từ JWT)  |
| `createdBy.email`    | Email của user đang đăng nhập            |
| `isDeleted`          | Luôn là `false` khi mới tạo              |

### Lỗi thường gặp

| Status | Message                      | Nguyên nhân                  |
| ------ | ---------------------------- | ---------------------------- |
| 401    | `Unauthorized`               | Chưa gửi Bearer Token        |
| 400    | `name should not be empty`   | Thiếu trường `name`          |
| 400    | `logo must be a URL address` | `logo` không phải URL hợp lệ |

---

## 2. GET `/companies` — Danh sách công ty (phân trang)

### Mô tả

- Trả về danh sách công ty chưa bị xóa với phân trang
- Hỗ trợ lọc theo các field bất kỳ qua query params
- **Yêu cầu Bearer Token**

### Query Parameters

| Param      | Mô tả                            | Ví dụ                              |
| ---------- | -------------------------------- | ---------------------------------- |
| `current`  | Trang hiện tại (mặc định: 1)     | `current=1`                        |
| `pageSize` | Số item mỗi trang (mặc định: 10) | `pageSize=5`                       |
| `name`     | Lọc theo tên công ty             | `name=FPT`                         |
| `address`  | Lọc theo địa chỉ                 | `address=Ha Noi`                   |
| `sort`     | Sắp xếp                          | `sort=-createdAt` (mới nhất trước) |

### URL ví dụ

```
GET /api/v1/companies?current=1&pageSize=10
GET /api/v1/companies?current=1&pageSize=5&sort=-createdAt
GET /api/v1/companies?current=1&pageSize=10&name=FPT
```

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "Fetch list companies with paginate",
  "data": {
    "meta": {
      "current": 1,
      "pageSize": 10,
      "pages": 1,
      "total": 3
    },
    "result": [
      {
        "_id": "69fab4d8119e4ad19cddf820",
        "name": "FPT Software",
        "address": "Ha Noi",
        "description": "Leading IT company in Vietnam",
        "logo": "https://fpt.com/logo.png",
        "createdBy": {
          "_id": "69fab8ea8889109f47996923",
          "email": "user@gmail.com"
        },
        "isDeleted": false,
        "createdAt": "2026-05-06T03:26:16.364Z",
        "updatedAt": "2026-05-06T03:26:16.364Z"
      }
    ]
  }
}
```

### Test trên Swagger

1. Vào `GET /companies` → **Try it out**
2. Điền `current = 1`, `pageSize = 10`
3. Click **Execute**

---

## 3. GET `/companies/:id` — Lấy thông tin 1 công ty

### Mô tả

- Lấy chi tiết 1 công ty theo MongoDB `_id`
- **Yêu cầu Bearer Token**

### Path Parameter

| Param | Mô tả            | Lấy từ đâu                                                |
| ----- | ---------------- | --------------------------------------------------------- |
| `id`  | MongoDB ObjectId | `_id` từ response `POST /companies` hoặc `GET /companies` |

### Ví dụ URL

```
GET /api/v1/companies/69fab4d8119e4ad19cddf820
```

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "Fetch a company by id",
  "data": {
    "_id": "69fab4d8119e4ad19cddf820",
    "name": "FPT Software",
    "address": "Ha Noi",
    "description": "Leading IT company in Vietnam",
    "logo": "https://fpt.com/logo.png",
    "createdBy": {
      "_id": "69fab8ea8889109f47996923",
      "email": "user@gmail.com"
    },
    "isDeleted": false,
    "createdAt": "2026-05-06T03:26:16.364Z",
    "updatedAt": "2026-05-06T03:26:16.364Z"
  }
}
```

### Lỗi thường gặp

| Status | Nguyên nhân                                     |
| ------ | ----------------------------------------------- |
| 404    | ID không tồn tại hoặc đã bị soft-delete         |
| 400    | ID không đúng định dạng ObjectId (24 ký tự hex) |

---

## 4. PATCH `/companies/:id` — Cập nhật công ty

### Mô tả

- Cập nhật một hoặc nhiều field của công ty
- Tự động gán `updatedBy` từ JWT của người đang đăng nhập
- **Yêu cầu Bearer Token**

### Path Parameter

| Param | Mô tả                                     |
| ----- | ----------------------------------------- |
| `id`  | MongoDB ObjectId của công ty cần cập nhật |

### Request Body

Chỉ cần gửi các field muốn cập nhật (partial update):

```json
{
  "name": "FPT Software Vietnam",
  "address": "Hoa Lac Hi-Tech Park, Ha Noi",
  "description": "Updated description",
  "logo": "https://fpt.com/new-logo.png"
}
```

| Field         | Kiểu         | Mô tả                             |
| ------------- | ------------ | --------------------------------- |
| `name`        | string       | Tên công ty mới                   |
| `address`     | string       | Địa chỉ mới                       |
| `description` | string       | Mô tả mới                         |
| `logo`        | string (URL) | Logo URL mới (phải là URL hợp lệ) |

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "Update a company",
  "data": {
    "_id": "69fab4d8119e4ad19cddf820",
    "name": "FPT Software Vietnam",
    "address": "Hoa Lac Hi-Tech Park, Ha Noi",
    "description": "Updated description",
    "logo": "https://fpt.com/new-logo.png",
    "createdBy": {
      "_id": "69fab8ea8889109f47996923",
      "email": "user@gmail.com"
    },
    "updatedBy": {
      "_id": "69fab8ea8889109f47996923",
      "email": "user@gmail.com"
    },
    "isDeleted": false,
    "createdAt": "2026-05-06T03:26:16.364Z",
    "updatedAt": "2026-05-06T04:30:00.000Z"
  }
}
```

> 💡 Sau khi update, response có thêm field `updatedBy` ghi lại ai đã sửa.

---

## 5. DELETE `/companies/:id` — Xóa mềm công ty

### Mô tả

- **Soft delete**: không xóa thật, chỉ set `isDeleted: true` và gán `deletedBy`
- Công ty bị xóa sẽ **biến mất** khỏi `GET /companies`
- **Yêu cầu Bearer Token**

### Path Parameter

| Param | Mô tả                                |
| ----- | ------------------------------------ |
| `id`  | MongoDB ObjectId của công ty cần xóa |

### Response thành công (200)

```json
{
  "statusCode": 200,
  "message": "Delete a company",
  "data": {
    "deleted": 1
  }
}
```

| Field     | Mô tả                                                  |
| --------- | ------------------------------------------------------ |
| `deleted` | `1` = thành công, `0` = không tìm thấy hoặc đã xóa rồi |

---

## 🔑 Cách Authorize trong Swagger

1. Gọi `POST /auth/login` với `{ "email": "user@gmail.com", "password": "123456" }`
2. Copy `data.access_token`
3. Click **Authorize** (góc phải trên trang Swagger)
4. Dán token → Click **Authorize** → **Close**
5. Tất cả request sẽ tự gắn `Authorization: Bearer <token>`

---

## 📋 Flow test đầy đủ Companies

```
Bước 1: POST /auth/login           → Lấy access_token
         Body: { email, password }
         Lưu: access_token

Bước 2: Authorize trên Swagger với access_token

Bước 3: POST /companies            → Tạo công ty
         Body: { name, address, description, logo }
         Lưu: _id từ data._id

Bước 4: GET /companies             → Xem danh sách (current=1, pageSize=10)

Bước 5: GET /companies/:id         → Xem chi tiết (dùng _id từ bước 3)

Bước 6: PATCH /companies/:id       → Cập nhật
         Body: { name: "Tên mới" }
         Kiểm tra: response có trường updatedBy

Bước 7: DELETE /companies/:id      → Xóa mềm

Bước 8: GET /companies             → Verify công ty đã biến mất
```

---

## 💡 Lưu ý về Audit Trail

Mỗi document Company có các trường audit:

| Field       | Được gán khi     | Lưu gì                        |
| ----------- | ---------------- | ----------------------------- |
| `createdBy` | POST (tạo mới)   | `{ _id, email }` của user tạo |
| `updatedBy` | PATCH (cập nhật) | `{ _id, email }` của user sửa |
| `deletedBy` | DELETE (xóa)     | `{ _id, email }` của user xóa |

> Dữ liệu này lấy trực tiếp từ **JWT token** của người đang đăng nhập, không cần truyền thêm trong body.
