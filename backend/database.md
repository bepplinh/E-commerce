erDiagram
%% MODULE: USER & AUTH & RBAC
users {
int id PK
string username UK
string email UK
string phone UK
string password
string status
string full_name
string avatar_url
datetime created_at
datetime updated_at
}
social_accounts {
int id PK
int user_id FK
string provider
string provider_id
}
refresh_tokens {
int id PK
int user_id FK
string token
datetime expires_at
}
roles {
int id PK
string name
}
permissions {
int id PK
string name
}
user_roles {
int user_id FK
int role_id FK
}
role_permissions {
int role_id FK
int permission_id FK
}
addresses {
int id PK
int user_id FK
string full_name
string phone
string province
string district
string ward
string address_line
bool is_default
datetime created_at
}
%% MODULE: PRODUCT CATALOG
categories {
int id PK
int parent_id FK
string name
string slug
string image_url
string description
}
brands {
int id PK
string name
string slug
string logo_url
}
products {
int id PK
int category_id FK
int brand_id FK
string name
string slug
string description
decimal base_price
bool is_active
datetime created_at
datetime updated_at
}
product_options {
int id PK
int product_id FK
string name
}
option_values {
int id PK
int option_id FK
string value
}
product_variants {
int id PK
int product_id FK
string sku UK
decimal price
int stock_quantity
}
variant_option_values {
int variant_id FK
int option_value_id FK
}
product_images {
int id PK
int product_id FK
int variant_id FK
string image_url
bool is_primary
int sort_order
}
%% MODULE: ORDER & PAYMENT
orders {
int id PK
int user_id FK
int shipping_address_id FK
int voucher_id FK
decimal total_amount
decimal discount_amount
decimal shipping_fee
string status
string note
datetime created_at
datetime updated_at
}
order_items {
int id PK
int order_id FK
int variant_id FK
int quantity
decimal price
}
payments {
int id PK
int order_id FK
string payment_method
string status
decimal amount
string transaction_id
datetime paid_at
}
%% MODULE: CART
carts {
int id PK
int user_id FK
datetime created_at
datetime updated_at
}
cart_items {
int id PK
int cart_id FK
int variant_id FK
int quantity
datetime added_at
}
%% MODULE: WISHLIST
wishlists {
int id PK
int user_id FK
datetime created_at
}
wishlist_items {
int id PK
int wishlist_id FK
int product_id FK
datetime added_at
}
%% MODULE: VOUCHER / COUPON
vouchers {
int id PK
string code UK
string description
string discount_type
decimal discount_value
decimal min_order_amount
decimal max_discount_amount
int usage_limit
int used_count
datetime starts_at
datetime expires_at
bool is_active
datetime created_at
}
user_vouchers {
int id PK
int user_id FK
int voucher_id FK
datetime used_at
}
%% MODULE: REVIEW & RATING
reviews {
int id PK
int user_id FK
int product_id FK
int order_item_id FK
int rating
string comment
datetime created_at
datetime updated_at
}
review_images {
int id PK
int review_id FK
string image_url
}
%% MODULE: SHIPPING
shipping_methods {
int id PK
string name
int estimated_days
decimal base_fee
}
order_shipping {
int id PK
int order_id FK
int shipping_method_id FK
string tracking_number
string status
datetime shipped_at
datetime delivered_at
}
%% MODULE: NOTIFICATIONS
notifications {
int id PK
int user_id FK
string type
string title
string content
bool is_read
datetime created_at
}
%% RELATIONSHIPS: USER & AUTH
users ||--o{ social_accounts : "has"
users ||--o{ refresh_tokens : "has"
users ||--o{ user_roles : "has"
roles ||--o{ user_roles : "assigned_to"
roles ||--o{ role_permissions : "has"
permissions ||--o{ role_permissions : "granted_to"
users ||--o{ addresses : "has"
users ||--o| carts : "has"
users ||--o| wishlists : "has"
users ||--o{ user_vouchers : "claims"
users ||--o{ notifications : "receives"
%% RELATIONSHIPS: PRODUCT CATALOG
categories ||--o{ categories : "parent_of"
categories ||--o{ products : "contains"
brands ||--o{ products : "brands"
products ||--o{ product_options : "has"
product_options ||--o{ option_values : "contains"
products ||--o{ product_variants : "has"
product_variants ||--o{ variant_option_values : "has"
option_values ||--o{ variant_option_values : "mapped_to"
products ||--o{ product_images : "has"
product_variants ||--o{ product_images : "has_specific"
%% RELATIONSHIPS: ORDER & PAYMENT
users ||--o{ orders : "places"
orders ||--o{ order_items : "contains"
product_variants ||--o{ order_items : "included_in"
orders ||--o| payments : "paid_via"
orders ||--o{ addresses : "delivered_to"
orders ||--o| vouchers : "applied_to"
orders ||--o| shipping_methods : "uses"
orders ||--o{ order_shipping : "shipped_via"
shipping_methods ||--o{ order_shipping : "used_in"
%% RELATIONSHIPS: CART
carts ||--o{ cart_items : "contains"
product_variants ||--o{ cart_items : "added_to"
%% RELATIONSHIPS: WISHLIST
wishlists ||--o{ wishlist_items : "contains"
products ||--o{ wishlist_items : "wishlisted"
%% RELATIONSHIPS: VOUCHER
vouchers ||--o{ user_vouchers : "claimed_by"
%% RELATIONSHIPS: REVIEW
users ||--o{ reviews : "writes"
products ||--o{ reviews : "reviewed_by"
order_items ||--o| reviews : "reviewed_in"
reviews ||--o{ review_images : "has"
