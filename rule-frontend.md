# 🎨 Frontend Coding Rules — Next.js / React

> Áp dụng cho toàn bộ code trong `frontend/`. AI **phải** tuân thủ 100%.

---

## 0. Nguyên tắc tổng quát

- **Đọc file trước khi sửa.** Không bao giờ giả định nội dung file.
- **Chỉ sửa những gì được yêu cầu.** Không tự ý refactor, đổi tên ngoài scope.
- **Không dùng placeholder** như `// TODO`, `// ...`. Luôn viết code hoàn chỉnh.
- Nếu không chắc, **hỏi** thay vì đoán.

---

## 1. Ngôn ngữ & Stack

- **Ngôn ngữ**: TypeScript (strict)
- **Framework**: Next.js 16 — App Router
- **Styling**: Tailwind CSS v4
- **State**: Zustand v5
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **UI primitives**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Notifications**: Sonner (toast)

---

## 2. Cấu trúc thư mục

```
frontend/
  app/                  # Next.js App Router — pages & layouts
    (auth)/             # Route group
    (shop)/
    layout.tsx
  components/
    ui/                 # Primitive components (shadcn/radix) — không chứa business logic
    <feature>/          # Feature-specific components (ProductCard, CartItem, ...)
  hooks/                # Custom React hooks (use*.ts)
  stores/               # Zustand stores (<feature>.store.ts)
  schema/               # Zod schemas (<feature>.schema.ts)
  types/                # TypeScript types & interfaces
  lib/                  # Utility functions (utils.ts, cn, ...)
```

---

## 3. Quy tắc đặt tên

| Loại                 | Convention                     | Ví dụ                           |
| -------------------- | ------------------------------ | ------------------------------- |
| File / Thư mục       | `kebab-case`                   | `product-card.tsx`              |
| React Component      | `PascalCase`                   | `ProductCard`                   |
| Hook                 | `camelCase` + `use`            | `useCartStore`, `useAuth`       |
| Hàm / biến           | `camelCase`                    | `addToCart`, `isLoading`        |
| Constant             | `UPPER_SNAKE_CASE`             | `MAX_CART_ITEMS`                |
| Zod schema           | `PascalCase` + Schema          | `LoginSchema`, `RegisterSchema` |
| Zustand store hook   | `use` + `PascalCase` + `Store` | `useCartStore`                  |
| TypeScript type      | `PascalCase`                   | `Product`, `ApiResponse<T>`     |
| TypeScript interface | `PascalCase`                   | `UserProfile`, `CartItem`       |

---

## 4. TypeScript

### Quy tắc cứng

- **Cấm `any`**. Thay bằng `unknown` + type guard, hoặc kiểu cụ thể.
- Luôn khai báo kiểu trả về cho hàm public / exported.
- Dùng `interface` cho object shape; `type` cho union, intersection, mapped type.

```tsx
// ✅ Đúng
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// ❌ Sai
const fetchProduct = async (id): any => { ... };
```

### Infer type từ Zod schema

```ts
import { z } from "zod";
import { LoginSchema } from "@/schema/auth.schema";

// Luôn infer từ schema — không khai báo type trùng lặp
type LoginInput = z.infer<typeof LoginSchema>;
```

---

## 5. Server Component vs Client Component

### Nguyên tắc

- **Mặc định là Server Component.** Không thêm `"use client"` nếu không cần.
- Chỉ thêm `"use client"` khi component cần: event handler, hook, browser API, Zustand store.
- `"use client"` phải ở **dòng đầu tiên** của file, trước mọi import.
- **Đẩy `"use client"` xuống leaf component** nhỏ nhất — không làm cả page thành Client Component chỉ vì một nút bấm.

```tsx
// ✅ Đúng — ProductPage là Server Component
// app/shop/[id]/page.tsx
export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.id); // Server-side fetch
  return (
    <div>
      <ProductInfo product={product} />
      <AddToCartButton productId={product.id} /> {/* Client Component riêng */}
    </div>
  );
}

// ✅ Đúng — chỉ button cần "use client"
// components/product/add-to-cart-button.tsx
("use client");
export function AddToCartButton({ productId }: { productId: number }) {
  const addItem = useCartStore((s) => s.addItem);
  return <button onClick={() => addItem(productId)}>Add to Cart</button>;
}
```

---

## 6. Zod + React Hook Form

### File schema

```ts
// schema/auth.schema.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
```

### Dùng trong form

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@/schema/auth.schema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    // data đã được validate bởi Zod
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### Quy tắc

- Schema đặt trong `schema/<feature>.schema.ts`.
- Không viết validation bằng `if/else` thủ công trong component.
- Luôn dùng `zodResolver` — không `validate` thủ công trong `onSubmit`.

---

## 7. Zustand Store

### Cấu trúc store

```ts
// stores/cart.store.ts
import { create } from "zustand";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (productId) =>
    set((state) => ({
      items: [...state.items, { productId, quantity: 1 }],
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  clearCart: () => set({ items: [] }),
}));
```

### Quy tắc

- Mỗi store trong `stores/<feature>.store.ts`.
- **Subscribe selector nhỏ nhất** — không subscribe toàn bộ store.

```ts
// ✅ Đúng — chỉ re-render khi items.length thay đổi
const itemCount = useCartStore((s) => s.items.length);

// ❌ Sai — re-render mỗi khi bất kỳ state nào thay đổi
const store = useCartStore();
```

---

## 8. Styling — Tailwind CSS v4

### Quy tắc

- **Không** dùng `style={{}}` inline nếu có Tailwind class tương đương.
- Dùng `cn()` từ `@/lib/utils` để merge class có điều kiện.
- Không hardcode màu hex — dùng CSS variable đã định nghĩa trong design system.
- Class sắp xếp theo thứ tự: layout → spacing → typography → color → effect → state.

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Dùng trong component
<button
  className={cn(
    "flex items-center px-4 py-2 text-sm font-medium border border-black",
    isActive && "bg-black text-white",
    isDisabled && "opacity-50 cursor-not-allowed",
  )}
/>;
```

---

## 9. Data Fetching

### Server Component

```tsx
// ✅ Fetch trực tiếp trong Server Component
export default async function ProductsPage() {
  const res = await fetch(`${process.env.API_URL}/products`, {
    cache: "no-store",
  });
  const { data } = await res.json();
  return <ProductList products={data} />;
}
```

### Client Component

```tsx
// ✅ Dùng axios trong custom hook hoặc Zustand action
// hooks/use-products.ts
"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.data))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, isLoading };
}
```

### Quy tắc

- **Không** gọi API trực tiếp trong JSX / render function.
- Server Component dùng `fetch()` với cache policy rõ ràng.
- Client Component dùng `axios` trong hook hoặc Zustand action.

---

## 10. Error Handling

```tsx
"use client";
import { toast } from "sonner";
import axios from "axios";

const onSubmit = async (data: LoginInput) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    toast.success("Đăng nhập thành công!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message ?? "Đã có lỗi xảy ra");
    } else {
      toast.error("Không thể kết nối đến server");
    }
  }
};
```

### Quy tắc

- Dùng **Sonner toast** để thông báo lỗi — không dùng `alert()`.
- Luôn kiểm tra `axios.isAxiosError(error)` để lấy message từ response.
- Có fallback message khi server không trả về message.

---

## 11. Component Architecture

- **Không** định nghĩa component con bên trong component cha (gây re-mount mỗi render).
- Hoist static JSX ra ngoài component khi không phụ thuộc vào props/state.
- Components trong `components/ui/` là primitive — không chứa business logic.

```tsx
// ❌ Sai — Inner component tái tạo mỗi lần render
export function ProductList({ products }) {
  const ProductItem = ({ product }) => <div>{product.name}</div>; // ❌
  return products.map((p) => <ProductItem key={p.id} product={p} />);
}

// ✅ Đúng — tách ra file/component riêng
export function ProductItem({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
```

---

## 12. Những thứ tuyệt đối không làm

| ❌ Cấm                                           | ✅ Thay bằng                                |
| ------------------------------------------------ | ------------------------------------------- |
| `any` trong TypeScript                           | `unknown` + type guard hoặc kiểu cụ thể     |
| `"use client"` ở page-level khi không cần        | Chỉ dùng ở leaf component cần interactivity |
| `style={{}}` inline khi có Tailwind tương đương  | Tailwind class + `cn()`                     |
| Gọi API trong JSX / render function              | Hook hoặc Server Component                  |
| `alert()` / `confirm()` cho thông báo            | Sonner toast                                |
| Validate form bằng `if/else` thủ công            | Zod + zodResolver                           |
| Subscribe toàn bộ Zustand store                  | Subscribe selector cụ thể                   |
| Khai báo type trùng lặp với Zod schema           | `z.infer<typeof Schema>`                    |
| Định nghĩa component con bên trong component cha | Tách ra file hoặc khai báo ngoài            |
| Commit code có lỗi TypeScript / ESLint           | Fix lỗi trước khi commit                    |
