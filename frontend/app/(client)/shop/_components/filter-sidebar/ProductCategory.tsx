const data = [
  "Dresses",
  "Shorts",
  "Sweatshirts",
  "Swimwear",
  "Jackets",
  "T-Shirts & Tops",
  "Jeans",
  "Trousers",
  "Men",
  "Jumpers & Cardigans",
];

export default function ProductCategory() {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <div key={item}>
          <p className="text-gray-500 transition-colors cursor-pointer text-sm py-1 hover:text-black">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
