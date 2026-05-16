const COLOR_HEX_MAP = {
  White: "#F8F8F8",
  Black: "#111111",
  Grey: "#9CA3AF",
  Gray: "#9CA3AF",
  Navy: "#1E3A8A",
  Blue: "#2563EB",
  Red: "#DC2626",
  Green: "#16A34A",
  Olive: "#6B8E23",
  Beige: "#D6C19B",
  Cream: "#F5E9D4",
  Pink: "#EC4899",
  Brown: "#7C4A2D",
  Tan: "#C08B5C",
  Khaki: "#B7A16A",
  Yellow: "#EAB308",
  Silver: "#D1D5DB",
  Gold: "#D4AF37",
  Burgundy: "#7B1E3A",
  Purple: "#7E22CE",
  Camel: "#B08968",
  Denim: "#3B82F6",
};

const makeColorOption = (...values) => ({
  name: "Color",
  values: values.map((value) => ({
    value,
    metadata: { hexCode: COLOR_HEX_MAP[value] ?? "#999999" },
  })),
});

const makeValueOption = (name, ...values) => ({
  name,
  values: values.map((value) => ({ value })),
});

const image = (...urls) => urls;

export const productsData = [
  {
    slug: "nike-air-force-1-07",
    name: "Nike Air Force 1 '07",
    description: "Classic basketball-inspired sneakers with clean lines and everyday comfort.",
    basePrice: 110,
    brandSlug: "nike",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Black"), makeValueOption("Size", "39", "40", "41", "42", "43")],
  },
  {
    slug: "nike-air-max-pulse",
    name: "Nike Air Max Pulse",
    description: "Street-ready cushioning and a bold silhouette for daily wear.",
    basePrice: 135,
    brandSlug: "nike",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Grey", "Black"), makeValueOption("Size", "40", "41", "42", "43", "44")],
  },
  {
    slug: "nike-pegasus-41",
    name: "Nike Pegasus 41",
    description: "Responsive running shoe with lightweight comfort and a smooth ride.",
    basePrice: 145,
    brandSlug: "nike",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Blue", "Black"), makeValueOption("Size", "39", "40", "41", "42", "43", "44")],
  },
  {
    slug: "nike-dri-fit-challenger-tee",
    name: "Nike Dri-FIT Challenger Tee",
    description: "Lightweight training tee with breathable, sweat-wicking fabric.",
    basePrice: 38,
    brandSlug: "nike",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "White", "Olive"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "nike-club-fleece-jogger",
    name: "Nike Club Fleece Jogger",
    description: "Relaxed fleece jogger made for layering, lounging, and travel.",
    basePrice: 55,
    brandSlug: "nike",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Grey", "Black", "Navy"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "adidas-ultraboost-22",
    name: "Adidas Ultraboost 22",
    description: "Comfort-first running shoe with springy energy return.",
    basePrice: 190,
    brandSlug: "adidas",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Grey"), makeValueOption("Size", "40", "41", "42", "43", "44")],
  },
  {
    slug: "adidas-samba-og",
    name: "Adidas Samba OG",
    description: "Retro indoor-inspired sneaker with a timeless profile.",
    basePrice: 120,
    brandSlug: "adidas",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Black"), makeValueOption("Size", "39", "40", "41", "42", "43")],
  },
  {
    slug: "adidas-gazelle-indoor",
    name: "Adidas Gazelle Indoor",
    description: "Low-profile suede sneaker with vintage sport styling.",
    basePrice: 115,
    brandSlug: "adidas",
    categorySlug: "womens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Cream", "Green", "Blue"), makeValueOption("Size", "36", "37", "38", "39", "40")],
  },
  {
    slug: "adidas-3-stripes-track-jacket",
    name: "Adidas 3-Stripes Track Jacket",
    description: "Classic track jacket with a clean athletic look.",
    basePrice: 78,
    brandSlug: "adidas",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Navy", "Red"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "adidas-adicolor-essentials-tee",
    name: "Adidas Adicolor Essentials Tee",
    description: "Soft everyday tee with minimal branding and easy styling.",
    basePrice: 30,
    brandSlug: "adidas",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Pink", "Black"), makeValueOption("Size", "XS", "S", "M", "L")],
  },
  {
    slug: "puma-suede-classic",
    name: "Puma Suede Classic",
    description: "Iconic suede sneaker with a clean profile and durable feel.",
    basePrice: 95,
    brandSlug: "puma",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Green"), makeValueOption("Size", "39", "40", "41", "42", "43")],
  },
  {
    slug: "puma-rs-x-efekt",
    name: "Puma RS-X Efekt",
    description: "Chunky lifestyle sneaker with layered textures and bold color blocking.",
    basePrice: 125,
    brandSlug: "puma",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Grey", "Blue"), makeValueOption("Size", "40", "41", "42", "43", "44")],
  },
  {
    slug: "puma-essentials-hoodie",
    name: "Puma Essentials Hoodie",
    description: "Soft hoodie for everyday layering with a relaxed silhouette.",
    basePrice: 58,
    brandSlug: "puma",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Grey", "Red"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "puma-training-shorts",
    name: "Puma Training Shorts",
    description: "Lightweight training shorts with flexible movement.",
    basePrice: 34,
    brandSlug: "puma",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Navy", "Olive"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "puma-core-cap",
    name: "Puma Core Cap",
    description: "Minimal cap with embroidered branding and adjustable fit.",
    basePrice: 22,
    brandSlug: "puma",
    categorySlug: "mens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Grey", "Red")],
  },
  {
    slug: "zara-slim-fit-chino",
    name: "Zara Slim Fit Chino",
    description: "Slim fit chino trouser with a clean tailored finish.",
    basePrice: 49,
    brandSlug: "zara",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Beige", "Navy", "Black"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "zara-structured-blazer",
    name: "Zara Structured Blazer",
    description: "Sharp blazer with a modern silhouette for smart dressing.",
    basePrice: 89,
    brandSlug: "zara",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Grey"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "zara-poplin-shirt",
    name: "Zara Poplin Shirt",
    description: "Light poplin shirt with crisp lines and a versatile fit.",
    basePrice: 42,
    brandSlug: "zara",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Blue", "Grey"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "zara-relaxed-knit-dress",
    name: "Zara Relaxed Knit Dress",
    description: "Soft knit dress with an easy drape for day-to-night wear.",
    basePrice: 69,
    brandSlug: "zara",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Cream", "Burgundy"), makeValueOption("Size", "XS", "S", "M", "L")],
  },
  {
    slug: "zara-leather-tote-bag",
    name: "Zara Leather Tote Bag",
    description: "Roomy tote bag with a refined leather look.",
    basePrice: 79,
    brandSlug: "zara",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Tan")],
  },
  {
    slug: "hm-oversized-hoodie",
    name: "H&M Oversized Hoodie",
    description: "Soft oversized hoodie built for casual layering.",
    basePrice: 44,
    brandSlug: "hm",
    categorySlug: "unisex-fashion",
    imageUrls: image(
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Grey", "Black", "Cream"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "hm-regular-fit-oxford-shirt",
    name: "H&M Regular Fit Oxford Shirt",
    description: "Clean oxford shirt for work, travel, and smart casual looks.",
    basePrice: 36,
    brandSlug: "hm",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Blue", "Pink"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "hm-wide-leg-jeans",
    name: "H&M Wide Leg Jeans",
    description: "Relaxed denim with a modern wide-leg shape.",
    basePrice: 52,
    brandSlug: "hm",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Denim", "Black", "Blue"), makeValueOption("Size", "XS", "S", "M", "L")],
  },
  {
    slug: "hm-ribbed-tank-top",
    name: "H&M Ribbed Tank Top",
    description: "Essential ribbed tank with a fitted profile.",
    basePrice: 18,
    brandSlug: "hm",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Black", "Pink"), makeValueOption("Size", "XS", "S", "M", "L")],
  },
  {
    slug: "hm-crossbody-bag",
    name: "H&M Crossbody Bag",
    description: "Compact crossbody bag for everyday essentials.",
    basePrice: 28,
    brandSlug: "hm",
    categorySlug: "womens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Cream")],
  },
  {
    slug: "uniqlo-heattech-crew-neck-tshirt",
    name: "Uniqlo Heattech Crew Neck T-shirt",
    description: "Comforting base layer with soft and breathable fabric.",
    basePrice: 20,
    brandSlug: "uniqlo",
    categorySlug: "unisex-fashion",
    imageUrls: image(
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Black", "Navy"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "uniqlo-ultra-light-down-jacket",
    name: "Uniqlo Ultra Light Down Jacket",
    description: "Lightweight insulated jacket with easy packability.",
    basePrice: 89,
    brandSlug: "uniqlo",
    categorySlug: "unisex-fashion",
    imageUrls: image(
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Grey", "Navy"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "uniqlo-airism-polo-shirt",
    name: "Uniqlo AIRism Polo Shirt",
    description: "Quick-drying polo with a neat everyday look.",
    basePrice: 29,
    brandSlug: "uniqlo",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Blue", "Black"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "uniqlo-straight-jeans",
    name: "Uniqlo Straight Jeans",
    description: "Clean-cut straight jeans with everyday versatility.",
    basePrice: 45,
    brandSlug: "uniqlo",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Denim", "Black", "Blue"), makeValueOption("Waist", "26", "28", "30", "32")],
  },
  {
    slug: "uniqlo-shoulder-bag",
    name: "Uniqlo Shoulder Bag",
    description: "Compact shoulder bag for everyday carry.",
    basePrice: 24,
    brandSlug: "uniqlo",
    categorySlug: "womens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Beige", "Olive")],
  },
  {
    slug: "levis-501-original-jeans",
    name: "Levi's 501 Original Jeans",
    description: "The original straight-leg jeans with heritage appeal.",
    basePrice: 80,
    brandSlug: "levis",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Denim", "Black", "Blue"), makeValueOption("Waist", "28", "30", "32", "34")],
  },
  {
    slug: "levis-511-slim-jeans",
    name: "Levi's 511 Slim Jeans",
    description: "Slim modern fit jean with a versatile everyday shape.",
    basePrice: 78,
    brandSlug: "levis",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Blue", "Black", "Grey"), makeValueOption("Waist", "28", "30", "32", "34")],
  },
  {
    slug: "levis-trucker-jacket",
    name: "Levi's Trucker Jacket",
    description: "Classic denim jacket with a timeless trucker silhouette.",
    basePrice: 98,
    brandSlug: "levis",
    categorySlug: "mens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Denim", "Black", "Blue"), makeValueOption("Size", "S", "M", "L", "XL")],
  },
  {
    slug: "levis-ribcage-straight-jeans",
    name: "Levi's Ribcage Straight Jeans",
    description: "High-rise straight jeans with a flattering retro shape.",
    basePrice: 88,
    brandSlug: "levis",
    categorySlug: "womens-clothing",
    imageUrls: image(
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Denim", "Blue", "Black"), makeValueOption("Waist", "25", "26", "27", "28")],
  },
  {
    slug: "levis-leather-belt",
    name: "Levi's Leather Belt",
    description: "Simple leather belt for everyday use and denim styling.",
    basePrice: 32,
    brandSlug: "levis",
    categorySlug: "mens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691255-28c7b4b2f33f?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Black", "Camel")],
  },
  {
    slug: "gucci-ophidia-gg-mini-bag",
    name: "Gucci Ophidia GG Mini Bag",
    description: "Compact mini bag with monogram detailing and refined hardware.",
    basePrice: 1250,
    brandSlug: "gucci",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Beige", "Black")],
  },
  {
    slug: "gucci-horsebit-loafer",
    name: "Gucci Horsebit Loafer",
    description: "Luxury loafer with a polished finish and iconic hardware.",
    basePrice: 980,
    brandSlug: "gucci",
    categorySlug: "womens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Camel"), makeValueOption("Size", "36", "37", "38", "39", "40")],
  },
  {
    slug: "gucci-gg-canvas-wallet",
    name: "Gucci GG Canvas Wallet",
    description: "Slim wallet in GG canvas with a clean premium finish.",
    basePrice: 420,
    brandSlug: "gucci",
    categorySlug: "womens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1579192387635-9d31f8f8d7d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691255-28c7b4b2f33f?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Beige", "Black")],
  },
  {
    slug: "gucci-web-stripe-sneaker",
    name: "Gucci Web Stripe Sneaker",
    description: "Sneaker with heritage stripe details and premium upper materials.",
    basePrice: 850,
    brandSlug: "gucci",
    categorySlug: "mens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Green", "Red"), makeValueOption("Size", "40", "41", "42", "43", "44")],
  },
  {
    slug: "gucci-jackie-1961-shoulder-bag",
    name: "Gucci Jackie 1961 Shoulder Bag",
    description: "Structured shoulder bag with a vintage luxury feel.",
    basePrice: 1450,
    brandSlug: "gucci",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Burgundy")],
  },
  {
    slug: "chanel-classic-flap-bag",
    name: "Chanel Classic Flap Bag",
    description: "Timeless quilted shoulder bag with a polished chain strap.",
    basePrice: 6500,
    brandSlug: "chanel",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Cream", "Pink")],
  },
  {
    slug: "chanel-coco-handle-mini",
    name: "Chanel Coco Handle Mini",
    description: "Mini top-handle bag with elegant structure and luxury finish.",
    basePrice: 5400,
    brandSlug: "chanel",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "White", "Burgundy")],
  },
  {
    slug: "chanel-quilted-sling-bag",
    name: "Chanel Quilted Sling Bag",
    description: "Soft quilted sling bag designed for compact carry.",
    basePrice: 4800,
    brandSlug: "chanel",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Cream", "Pink")],
  },
  {
    slug: "chanel-pearl-logo-sunglasses",
    name: "Chanel Pearl Logo Sunglasses",
    description: "Statement sunglasses with refined frame details.",
    basePrice: 620,
    brandSlug: "chanel",
    categorySlug: "womens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Gold", "Silver")],
  },
  {
    slug: "chanel-two-tone-slingback",
    name: "Chanel Two-Tone Slingback",
    description: "Elegant slingback with a signature two-tone design.",
    basePrice: 1200,
    brandSlug: "chanel",
    categorySlug: "womens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Cream", "Beige"), makeValueOption("Size", "36", "37", "38", "39", "40")],
  },
  {
    slug: "louis-vuitton-neverfull-mm",
    name: "Louis Vuitton Neverfull MM",
    description: "Iconic tote bag with generous capacity and a refined finish.",
    basePrice: 1780,
    brandSlug: "louis-vuitton",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Beige", "Black")],
  },
  {
    slug: "louis-vuitton-speedy-25",
    name: "Louis Vuitton Speedy 25",
    description: "Compact city bag with a signature structured shape.",
    basePrice: 1620,
    brandSlug: "louis-vuitton",
    categorySlug: "womens-bags",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Black", "Tan")],
  },
  {
    slug: "louis-vuitton-pochette-accessoires",
    name: "Louis Vuitton Pochette Accessoires",
    description: "Slim accessory pouch for light daily carry.",
    basePrice: 920,
    brandSlug: "louis-vuitton",
    categorySlug: "womens-accessories",
    imageUrls: image(
      "https://images.unsplash.com/photo-1579192387635-9d31f8f8d7d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691255-28c7b4b2f33f?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Brown", "Beige", "Black")],
  },
  {
    slug: "louis-vuitton-horizon-belt-bag",
    name: "Louis Vuitton Horizon Belt Bag",
    description: "Modern belt bag designed for hands-free travel.",
    basePrice: 1180,
    brandSlug: "louis-vuitton",
    categorySlug: "unisex-fashion",
    imageUrls: image(
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("Black", "Brown", "Olive")],
  },
  {
    slug: "louis-vuitton-run-away-sneaker",
    name: "Louis Vuitton Run Away Sneaker",
    description: "Fashion-forward sneaker with premium finishing.",
    basePrice: 990,
    brandSlug: "louis-vuitton",
    categorySlug: "womens-shoes",
    imageUrls: image(
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"
    ),
    options: [makeColorOption("White", "Grey", "Pink"), makeValueOption("Size", "36", "37", "38", "39", "40")],
  },
];
