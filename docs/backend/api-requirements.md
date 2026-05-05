# API Requirements for E-commerce System

Tài liệu này mô tả các API cần xây dựng cho hệ thống e-commerce dựa trên Prisma schema hiện có.

## 1. Phạm vi

Các model đã có trong schema:

- `User`, `SocialAccount`, `RefreshToken`
- `Role`, `Permission`, `UserRole`, `RolePermission`
- `Category`, `Brand`, `Product`, `ProductOption`, `OptionValue`, `ProductVariant`, `VariantOptionValue`, `ProductImage`
- `Cart`, `CartItem`
- `Wishlist`, `WishlistItem`
- `Address`
- `Order`, `OrderItem`
- `Payment`
- `ShippingMethod`, `OrderShipping`
- `Voucher`, `UserVoucher`
- `Review`, `ReviewImage`
- `Notification`

Mục tiêu của tài liệu này là mô tả các endpoint cần có để vận hành đầy đủ flow mua sắm, quản trị sản phẩm, đặt hàng và chăm sóc người dùng.

## 2. Quy ước chung

- Base URL: `/api/v1`
- Auth: `Authorization: Bearer <access_token>`
- Refresh token: lưu trong cookie `refreshToken` dạng `httpOnly`
- Response thành công nên thống nhất:

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

- Response lỗi nên thống nhất:

```json
{
  "success": false,
  "status": "fail|error",
  "message": "string",
  "errors": {}
}
```

- Pagination nên dùng:
  - `page`
  - `limit`
  - `total`
  - `totalPages`

## 3. Nhóm API bắt buộc theo module

### 3.1 Auth

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/auth/register` | No | `username`, `email`, `password`, `phone?`, `fullName?` | Đăng ký tài khoản mới | Đã có / cần chuẩn hóa |
| `POST` | `/auth/login` | No | `email`, `password` | Đăng nhập bằng email/password | Đã có / cần chuẩn hóa |
| `POST` | `/auth/login/google` | No | `idToken?`, `accessToken?` | Đăng nhập Google | Đã có / cần chuẩn hóa |
| `POST` | `/auth/refresh` | No | `refreshToken?` hoặc cookie | Làm mới access token | Đã có / cần chuẩn hóa |
| `POST` | `/auth/logout` | No | `refreshToken?` hoặc cookie | Đăng xuất, thu hồi refresh token | Đã có / cần chuẩn hóa |
| `GET` | `/auth/me` | Yes | - | Lấy thông tin user hiện tại | Đã có / cần chuẩn hóa |

#### Ràng buộc dữ liệu

- `username`: 3 - 50 ký tự
- `email`: đúng định dạng email
- `password`: tối thiểu 6 ký tự
- `phone`: tùy chọn, unique
- `fullName`: tùy chọn

#### Ghi chú

- `accessToken` nên tồn tại ngắn hạn.
- `refreshToken` nên được rotate khi refresh.

### 3.2 User profile

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/users/me` | Yes | - | Lấy hồ sơ người dùng | Cần tạo |
| `PATCH` | `/users/me` | Yes | `username?`, `phone?`, `fullName?`, `avatarUrl?` | Cập nhật hồ sơ | Cần tạo |
| `PATCH` | `/users/me/password` | Yes | `currentPassword`, `newPassword` | Đổi mật khẩu | Cần tạo |
| `GET` | `/users/:id` | Admin | - | Xem user theo id | Cần tạo |
| `PATCH` | `/users/:id/status` | Admin | `status` | Khóa/mở khóa tài khoản | Cần tạo |

### 3.3 Category

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/categories` | No | `parentId?`, `page?`, `limit?` | Danh sách danh mục | Cần tạo |
| `GET` | `/categories/tree` | No | - | Lấy cây danh mục | Cần tạo |
| `GET` | `/categories/:slug` | No | - | Chi tiết danh mục | Cần tạo |
| `POST` | `/categories` | Admin | `name`, `slug?`, `parentId?`, `imageUrl?`, `description?` | Tạo danh mục | Cần tạo |
| `PATCH` | `/categories/:id` | Admin | Các field của category | Cập nhật danh mục | Cần tạo |
| `DELETE` | `/categories/:id` | Admin | - | Xóa danh mục | Cần tạo |

#### Ràng buộc dữ liệu

- `slug` unique
- `parentId` dùng cho danh mục cha/con

### 3.4 Brand

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/brands` | No | `page?`, `limit?` | Danh sách thương hiệu | Cần tạo |
| `GET` | `/brands/:slug` | No | - | Chi tiết thương hiệu | Cần tạo |
| `POST` | `/brands` | Admin | `name`, `slug?`, `logoUrl?` | Tạo brand | Cần tạo |
| `PATCH` | `/brands/:id` | Admin | Các field của brand | Cập nhật brand | Cần tạo |
| `DELETE` | `/brands/:id` | Admin | - | Xóa brand | Cần tạo |

### 3.5 Product catalog

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/products/filter` | No | - | Lấy dữ liệu filter: brand, category, color, size | Đã có / cần chuẩn hóa |
| `GET` | `/products` | No | `category?`, `brand?`, `color?`, `size?`, `minPrice?`, `maxPrice?`, `page?`, `limit?` | Danh sách sản phẩm | Đã có / cần chuẩn hóa |
| `GET` | `/products/:slug` | No | - | Chi tiết sản phẩm | Đã có / cần chuẩn hóa |
| `POST` | `/products` | Admin | Xem payload bên dưới | Tạo sản phẩm | Đã có / cần chuẩn hóa |
| `PATCH` | `/products/:id` | Admin | Xem payload bên dưới | Cập nhật sản phẩm | Đã có / cần chuẩn hóa |
| `DELETE` | `/products/:id` | Admin | - | Xóa hoặc ngưng bán sản phẩm | Cần tạo |

#### Payload tạo/cập nhật product

```json
{
  "categoryId": 1,
  "brandId": 2,
  "name": "Áo thun basic",
  "slug": "ao-thun-basic",
  "description": "Mô tả sản phẩm",
  "basePrice": 199000,
  "isActive": true,
  "images": [
    { "url": "https://...", "isPrimary": true }
  ],
  "options": [
    {
      "name": "Color",
      "values": [
        { "value": "Black", "metadata": { "hexCode": "#000000" } }
      ]
    }
  ],
  "variants": [
    {
      "sku": "TSHIRT-BLACK-M",
      "price": 199000,
      "stockQuantity": 100,
      "attributes": { "Color": "Black", "Size": "M" },
      "images": [
        { "url": "https://...", "isPrimary": true }
      ]
    }
  ]
}
```

#### Ràng buộc dữ liệu

- `categoryId` bắt buộc
- `brandId` có thể null
- `name` tối đa 255 ký tự
- `basePrice` > 0
- `variants` bắt buộc và phải có ít nhất 1 phần tử
- `variant.sku` unique
- `variant.price` > 0
- `variant.stockQuantity` >= 0
- `attributes` của variant phải khớp với `options` đã khai báo
- `images[].url` là URL hợp lệ

#### Ghi chú nghiệp vụ

- Nếu không truyền `slug`, hệ thống nên tự sinh slug từ `name`.
- Khi đổi `name` mà không truyền `slug`, nên sinh slug mới duy nhất.
- `GET /products` nên chỉ trả các sản phẩm `isActive = true`.
- Filter theo `color` và `size` dựa trên `OptionValue.value`.

### 3.6 Cart

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/cart` | Yes | - | Lấy giỏ hàng hiện tại | Đã có / cần chuẩn hóa |
| `POST` | `/cart` | Yes | `variantId`, `quantity` | Thêm sản phẩm vào giỏ | Đã có / cần chuẩn hóa |
| `PATCH` | `/cart/item` | Yes | `variantId`, `quantity` | Cập nhật số lượng item | Đã có / cần chuẩn hóa |
| `DELETE` | `/cart` | Yes | `variantId` | Xóa item khỏi giỏ | Đã có / cần chuẩn hóa |
| `DELETE` | `/cart/clear` | Yes | - | Xóa toàn bộ giỏ hàng | Cần tạo |

#### Ràng buộc dữ liệu

- `variantId` bắt buộc
- `quantity` phải là số nguyên dương
- Một user chỉ có một cart
- `cart_item` unique theo `(cartId, variantId)`

### 3.7 Wishlist

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/wishlist` | Yes | - | Lấy danh sách wishlist | Cần tạo |
| `POST` | `/wishlist` | Yes | `productId` | Thêm sản phẩm vào wishlist | Cần tạo |
| `DELETE` | `/wishlist` | Yes | `productId` | Xóa sản phẩm khỏi wishlist | Cần tạo |
| `DELETE` | `/wishlist/clear` | Yes | - | Xóa toàn bộ wishlist | Cần tạo |

#### Ràng buộc dữ liệu

- Mỗi user chỉ có một wishlist
- `wishlist_item` unique theo `(wishlistId, productId)`

### 3.8 Address

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/addresses` | Yes | - | Lấy danh sách địa chỉ | Cần tạo |
| `GET` | `/addresses/:id` | Yes | - | Chi tiết địa chỉ | Cần tạo |
| `POST` | `/addresses` | Yes | `fullName`, `phone`, `province`, `district`, `ward`, `addressLine`, `isDefault?` | Tạo địa chỉ | Cần tạo |
| `PATCH` | `/addresses/:id` | Yes | Các field của address | Cập nhật địa chỉ | Cần tạo |
| `DELETE` | `/addresses/:id` | Yes | - | Xóa địa chỉ | Cần tạo |
| `PATCH` | `/addresses/:id/default` | Yes | - | Đặt địa chỉ mặc định | Cần tạo |

### 3.9 Order

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/orders` | Yes | `shippingAddressId`, `voucherId?`, `note?`, `paymentMethod`, `shippingMethodId` | Tạo đơn hàng từ cart | Cần tạo |
| `GET` | `/orders` | Yes | - | Lấy danh sách đơn hàng của user hiện tại | Đã có / cần chuẩn hóa |
| `GET` | `/orders/:id` | Yes | - | Xem chi tiết đơn hàng | Cần tạo |
| `PATCH` | `/orders/:id/cancel` | Yes | - | Hủy đơn hàng | Cần tạo |
| `PATCH` | `/orders/:id/status` | Admin | `status` | Cập nhật trạng thái đơn hàng | Cần tạo |

#### Ràng buộc dữ liệu

- `status` dùng enum `OrderStatus`
- `totalAmount`, `discountAmount`, `shippingFee` là decimal
- `order_item` phải lưu snapshot `sku`, `name`, `options` để bảo toàn lịch sử

### 3.10 Payment

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/payments` | Yes | `orderId`, `paymentMethod`, `amount` | Tạo bản ghi thanh toán | Cần tạo |
| `GET` | `/payments/:orderId` | Yes | - | Xem trạng thái thanh toán theo đơn | Cần tạo |
| `PATCH` | `/payments/:orderId/confirm` | Admin / webhook | `transactionId`, `status`, `paidAt` | Xác nhận thanh toán | Cần tạo |
| `PATCH` | `/payments/:orderId/refund` | Admin | `transactionId?` | Hoàn tiền | Cần tạo |

#### Ràng buộc dữ liệu

- `paymentMethod` theo enum `PaymentMethod`
- `status` theo enum `PaymentStatus`

### 3.11 Shipping

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/shipping-methods` | No | - | Danh sách phương thức vận chuyển | Cần tạo |
| `POST` | `/shipping-methods` | Admin | `name`, `estimatedDays`, `baseFee` | Tạo phương thức ship | Cần tạo |
| `PATCH` | `/shipping-methods/:id` | Admin | Các field của shipping method | Cập nhật shipping method | Cần tạo |
| `DELETE` | `/shipping-methods/:id` | Admin | - | Xóa shipping method | Cần tạo |
| `GET` | `/orders/:id/shipping` | Yes | - | Xem thông tin vận chuyển của đơn | Cần tạo |
| `PATCH` | `/orders/:id/shipping` | Admin / warehouse | `shippingMethodId`, `trackingNumber?`, `status?`, `shippedAt?`, `deliveredAt?` | Cập nhật trạng thái vận chuyển | Cần tạo |

#### Ràng buộc dữ liệu

- `status` theo enum `ShippingStatus`

### 3.12 Voucher

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/vouchers/validate/:code` | Yes | - | Kiểm tra mã giảm giá | Cần tạo |
| `GET` | `/vouchers` | Admin | `page?`, `limit?` | Danh sách voucher | Cần tạo |
| `POST` | `/vouchers` | Admin | `code`, `description?`, `discountType`, `discountValue`, `minOrderAmount?`, `maxDiscountAmount?`, `usageLimit?`, `startsAt`, `expiresAt`, `isActive?` | Tạo voucher | Cần tạo |
| `PATCH` | `/vouchers/:id` | Admin | Các field của voucher | Cập nhật voucher | Cần tạo |
| `DELETE` | `/vouchers/:id` | Admin | - | Xóa voucher | Cần tạo |
| `POST` | `/vouchers/:id/claim` | Yes | - | Người dùng claim voucher | Cần tạo |

#### Ràng buộc dữ liệu

- `code` unique
- `discountType` theo enum `DiscountType`
- `startsAt` phải nhỏ hơn `expiresAt`
- `usedCount` không vượt `usageLimit`

### 3.13 Review

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/products/:productId/reviews` | No | `page?`, `limit?` | Danh sách review theo sản phẩm | Cần tạo |
| `POST` | `/reviews` | Yes | `productId`, `orderItemId?`, `rating`, `comment?`, `images?` | Tạo review | Cần tạo |
| `PATCH` | `/reviews/:id` | Yes | `rating?`, `comment?`, `images?` | Cập nhật review của chính mình | Cần tạo |
| `DELETE` | `/reviews/:id` | Yes / Admin | - | Xóa review | Cần tạo |
| `PATCH` | `/reviews/:id/approve` | Admin | - | Duyệt review nếu có moderation | Cần tạo |

#### Ràng buộc dữ liệu

- `rating` từ 1 đến 5
- `orderItemId` nên là duy nhất nếu dùng để chứng minh đã mua hàng
- `review_image` lưu nhiều ảnh cho một review

### 3.14 Notification

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/notifications` | Yes | `page?`, `limit?`, `isRead?` | Danh sách notification của user | Cần tạo |
| `PATCH` | `/notifications/:id/read` | Yes | - | Đánh dấu đã đọc | Cần tạo |
| `PATCH` | `/notifications/read-all` | Yes | - | Đánh dấu toàn bộ đã đọc | Cần tạo |
| `DELETE` | `/notifications/:id` | Yes | - | Xóa notification | Cần tạo |
| `POST` | `/notifications` | Admin / system | `userId`, `type`, `title`, `content` | Tạo notification | Cần tạo |

### 3.15 RBAC

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/roles` | Admin | - | Danh sách role | Cần tạo |
| `POST` | `/roles` | Admin | `name` | Tạo role | Cần tạo |
| `PATCH` | `/roles/:id` | Admin | `name` | Cập nhật role | Cần tạo |
| `DELETE` | `/roles/:id` | Admin | - | Xóa role | Cần tạo |
| `GET` | `/permissions` | Admin | - | Danh sách permission | Cần tạo |
| `POST` | `/permissions` | Admin | `name` | Tạo permission | Cần tạo |
| `POST` | `/roles/:id/permissions` | Admin | `permissionIds[]` | Gán permission cho role | Cần tạo |
| `POST` | `/users/:id/roles` | Admin | `roleIds[]` | Gán role cho user | Cần tạo |

### 3.16 Upload

| Method | Endpoint | Auth | Body / Query | Mục đích | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/upload` | No / optional | `multipart/form-data`, field `images[]` | Upload ảnh sản phẩm, banner, review | Đã có / cần chuẩn hóa |

## 4. Dữ liệu cần trả về cho từng nhóm

### 4.1 Product list

Nên trả:

- `id`
- `name`
- `slug`
- `basePrice`
- `brand`
- `thumbnail`
- `variants`
- `pagination`

### 4.2 Product detail

Nên trả:

- thông tin `product`
- `category`
- `brand`
- `images`
- `options`
- `variants`
- `variant.images`
- `variant.optionValues`

### 4.3 Cart

Nên trả:

- `cartId`
- `items[]`
- `quantity`
- `variant`
- `product`
- `subtotal`

### 4.4 Order

Nên trả:

- `order`
- `items[]`
- `shippingAddress`
- `voucher`
- `payment`
- `shipping`
- `status`
- `totalAmount`
- `discountAmount`
- `shippingFee`

## 5. Ưu tiên triển khai

### Phase 1

- Auth
- Category
- Brand
- Product catalog
- Cart
- Address

### Phase 2

- Order
- Payment
- Shipping
- Voucher

### Phase 3

- Wishlist
- Review
- Notification
- RBAC

## 6. Ghi chú triển khai

- Các endpoint quản trị nên tách rõ middleware phân quyền theo `Role` và `Permission`.
- Các API public nên hạn chế trả dữ liệu thừa, đặc biệt là `password`, token, và metadata nhạy cảm.
- Các endpoint tạo/cập nhật product cần chạy transaction để đồng bộ:
  - product
  - images
  - options
  - variants
  - variant option mappings
- `OrderItem` nên lưu snapshot để giữ nguyên lịch sử ngay cả khi variant hoặc product thay đổi sau này.
- `Payment`, `Shipping`, `Notification` có thể được tạo từ service nội bộ hoặc webhook bên thứ ba.

