const data = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Black",
  "White",
  "Gray",
  "Purple",
  "Orange",
  "Pink",
];

export default function ColorCategory() {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((item) => (
        <div key={item}>
          <p className="text-gray-500 transition-colors cursor-pointer text-sm px-3 py-2 hover:text-black">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
