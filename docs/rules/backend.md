# 🖥️ Backend Coding Rules — Node.js / Express

> Áp dụng cho toàn bộ code trong `backend/`. AI **phải** tuân thủ 100%.

---

## 0. Nguyên tắc tổng quát

- **Đọc file trước khi sửa.** Không bao giờ giả định nội dung file.
- **Chỉ sửa những gì được yêu cầu.** Không tự ý refactor ngoài scope.
- **Không dùng placeholder** như `// TODO`, `// ...`, `/* implementation */`. Luôn viết code hoàn chỉnh.
- Nếu không chắc, **hỏi** thay vì đoán.
- Không được tự ý thay đổi schema trong folder prisma, phải luôn hỏi trước khi thực hiện.

---

## 1. Ngôn ngữ & Runtime

- **Ngôn ngữ**: JavaScript (không dùng TypeScript)
- **Module system**: ESM — luôn dùng `import/export`, **cấm** `require/module.exports`
- **Runtime**: Node.js + Express
- **Database**: MySQL (qua Prisma hoặc raw query)
- **Cache**: Redis

---

## 2. Cấu trúc thư mục

```
backend/src/
  modules/
    <module>/
      <module>.controller.js   # Nhận request → validate → gọi service → trả response
      <module>.service.js      # Business logic thuần
      <module>.repository.js   # Tương tác DB duy nhất
      <module>.validation.js   # Zod schemas
      <module>.routes.js       # Express router
  config/
  middlewares/
```

### Quy tắc phân layer (bắt buộc)

```
Request → Controller → Service → Repository → Database
```

| Layer          | Được làm                                  | Không được làm                       |
| -------------- | ----------------------------------------- | ------------------------------------ |
| **Controller** | Validate input, gọi service, trả response | Chứa business logic, query DB        |
| **Service**    | Business logic, throw Error               | Dùng `req`/`res`, query DB trực tiếp |
| **Repository** | Query DB, trả dữ liệu thô                 | Chứa business logic                  |

---

## 3. Quy tắc đặt tên

| Loại           | Convention           | Ví dụ                           |
| -------------- | -------------------- | ------------------------------- |
| File / Thư mục | `kebab-case`         | `auth.service.js`               |
| Hàm / biến     | `camelCase`          | `getUserById`, `hashedPwd`      |
| Constant       | `UPPER_SNAKE_CASE`   | `MAX_LOGIN_ATTEMPTS`            |
| Zod schema     | `camelCase` + Schema | `loginSchema`, `registerSchema` |

---

## 4. Controller

### Pattern chuẩn

```js
import * as authService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { z } from "zod";

const login = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data.email, data.password);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    return res.status(401).json({ success: false, message: error.message });
  }
};

export { login };
```

### Quy tắc

- Luôn `return` trước `res.json()` — tránh lỗi "headers already sent".
- Validate input bằng Zod **trước** khi gọi service.
- Không chứa business logic — chỉ: validate → gọi service → trả response.

### Response format chuẩn

```js
// Thành công
{ success: true, message: "...", data: { ... } }

// Lỗi validation
{ success: false, errors: [...] }

// Lỗi business
{ success: false, message: "..." }
```

---

## 5. Service

### Pattern chuẩn

```js
import authRepository from "./auth.repository.js";
import bcrypt from "bcrypt";

const register = async (userData) => {
  const { username, email, password } = userData;

  const existing = await authRepository.findUserByEmailOrUsername(
    email,
    username,
  );
  if (existing) throw new Error("User with email or username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await authRepository.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return { id: newUser.id, username: newUser.username, email: newUser.email };
};

export { register };
```

### Quy tắc

- **Không** dùng `req`, `res`, `next` trong service.
- **Không** import trực tiếp model Sequelize — chỉ qua repository.
- Throw `AppError` hoặc các biến thể chuyên biệt (từ `@/utils/app-error.js`) với message tiếng Anh và statusCode phù hợp:
  - `BadRequestError` (400)
  - `UnauthorizedError` (401)
  - `ForbiddenError` (403)
  - `NotFoundError` (404)
  - `UnprocessableEntityError` (422)
  - `InternalServerError` (500)
- Trả về object sạch, không trả toàn bộ row DB (loại bỏ `password`, `__v`, v.v.).

---

## 6. Repository

### Pattern chuẩn

```js
import { User } from "../../config/database.js";

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const createUser = async (userData) => {
  return User.create(userData);
};

export default { findUserByEmail, createUser };
```

### Quy tắc

- Chỉ làm nhiệm vụ CRUD thuần — không có `if/else` business logic.
- Export dạng `default` object chứa các hàm.

---

## 7. Validation (Zod)

```js
// auth.validation.js
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export { registerSchema, loginSchema };
```

### Quy tắc

- Tất cả schema đặt trong `<module>.validation.js`.
- Export bằng **named export**.
- Không validate thủ công bằng `if/else` — luôn dùng Zod.

---

## 8. HTTP Status Codes

| Tình huống                        | Status |
| --------------------------------- | ------ |
| GET thành công / POST trả data    | 200    |
| POST tạo resource mới             | 201    |
| Validation error (Zod)            | 400    |
| Chưa đăng nhập / sai credentials  | 401    |
| Đã đăng nhập nhưng không có quyền | 403    |
| Resource không tìm thấy           | 404    |
| Lỗi server không mong đợi         | 500    |

---

## 9. Error Handling

```js
// Controller — try/catch chuẩn
try {
  // ...
} catch (error) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ success: false, errors: error.errors });
  }
  const statusCode = error.statusCode || 500;
  return res
    .status(statusCode)
    .json({ success: false, message: error.message });
}
```

- Không dùng `console.log()` trong production — xóa trước khi commit.
- Không `throw` string, luôn `throw new Error("message")`.

---

## 10. Những thứ tuyệt đối không làm

| ❌ Cấm                                | ✅ Thay bằng                   |
| ------------------------------------- | ------------------------------ |
| `require()` / `module.exports`        | `import` / `export`            |
| Business logic trong controller       | Đưa vào service                |
| DB query trong service                | Đưa vào repository             |
| Import Sequelize model trong service  | Gọi qua repository             |
| Hardcode JWT secret / DB password     | Dùng `process.env.*`           |
| `console.log()` trong production code | Xóa trước commit               |
| Validate bằng `if/else` thủ công      | Dùng Zod schema                |
| Trả response mà không `return`        | Luôn `return res.json(...)`    |
| Commit code gây crash server          | Test thủ công trước khi commit |
