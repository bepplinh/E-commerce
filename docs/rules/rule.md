# 📐 Ecommerce Project — Coding Rules (Index)

> Bộ quy tắc bắt buộc cho toàn bộ dự án. AI **phải** tuân thủ 100%.  
> Các quy tắc chi tiết được tách riêng theo layer:

| File                                       | Phạm vi                                                     |
| ------------------------------------------ | ----------------------------------------------------------- |
| **[rule-backend.md](./rule-backend.md)**   | `backend/` — Node.js, Express, Sequelize, Zod               |
| **[rule-frontend.md](./rule-frontend.md)** | `frontend/` — Next.js, React, TypeScript, Tailwind, Zustand |

---

## Nguyên tắc tổng quát (áp dụng cho cả 2 layer)

- **Đọc file trước khi sửa.** Không bao giờ giả định nội dung file.
- **Chỉ sửa những gì được yêu cầu.** Không tự ý refactor, đổi tên, thêm feature ngoài scope.
- **Không xóa code đang hoạt động** nếu không được cho phép rõ ràng.
- **Không dùng placeholder** như `// TODO`, `// ...`, `/* implementation */`. Luôn viết code hoàn chỉnh.
- Nếu không chắc, **hỏi** thay vì đoán.

---

## Tech Stack

| Layer    | Ngôn ngữ   | Runtime / Framework     |
| -------- | ---------- | ----------------------- |
| Frontend | TypeScript | Next.js 16 (App Router) |
| Backend  | JavaScript | Node.js + Express       |
| Database | SQL        | MySQL (Sequelize / raw) |
| Cache    | —          | Redis                   |

---

## Git & Commit (chung toàn dự án)

Commit message theo **Conventional Commits**:

```bash
# ✅ Đúng
git commit -m "feat(auth): add refresh token support"
git commit -m "fix(cart): prevent duplicate items on add"
git commit -m "style(product): refine card hover animation"

# ❌ Sai
git commit -m "update code"
git commit -m "fix"
```

| Prefix      | Khi nào dùng                    |
| ----------- | ------------------------------- |
| `feat:`     | Thêm tính năng mới              |
| `fix:`      | Sửa bug                         |
| `refactor:` | Refactor không thêm/sửa feature |
| `style:`    | Thay đổi UI, styling            |
| `chore:`    | Cập nhật config, dependencies   |
| `docs:`     | Cập nhật tài liệu / rule        |

---

## Những thứ tuyệt đối không làm (toàn dự án)

| ❌ Cấm                                     | ✅ Thay bằng                |
| ------------------------------------------ | --------------------------- |
| Hardcode secret / API key / password       | Dùng biến môi trường `.env` |
| `console.log()` trong production code      | Xóa trước commit            |
| Commit code bị lỗi TypeScript / ESLint     | Fix lỗi trước khi commit    |
| Placeholder `// TODO`, `// ...` trong code | Viết code hoàn chỉnh ngay   |
