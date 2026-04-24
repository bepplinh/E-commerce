import { IHotDealCard } from "../HotDeal/dataCard";

export type IFeaturedProduct = Omit<IHotDealCard, "imgOne" | "imgTwo"> & {
  img: string;
};

export const dataFeaturedProduct: IFeaturedProduct[] = [
  {
    id: 1,
    img: "/hotdeal/product-4.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 2,
    img: "/hotdeal/product-5.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 3,
    img: "/hotdeal/product-6.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 4,
    img: "/hotdeal/product-7.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 5,
    img: "/hotdeal/product-8.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 6,
    img: "/hotdeal/product-9.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 7,
    img: "/hotdeal/product-10.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
  {
    id: 8,
    img: "/hotdeal/product-11.jpg",
    name: "Calvin Shorts",
    price: "62",
  },
];
