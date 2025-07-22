
import { Home, MessageSquare, BookOpen, ShoppingCart, Heart, Store } from "lucide-react";

interface Link {
    id: number;
    title: string;
    icon: typeof Home;
    path: string;
}
export const NavLinks: Link[] = [
    {
        id: 1,
        title: "home",
        icon: Home,
        path: "/"
    },
    {
        id: 2,
        title: "contact",
        icon: MessageSquare,
        path: "contact"
    },
    {
        id: 3,
        title: "about",
        icon: BookOpen,
        path: "about"
    },
    {
        id: 4,
        title: "E-shop",
        icon: Store,
        path: "products"
    },
    {
        id: 5,
        title: "cart",
        icon: ShoppingCart,
        path: "cart"
    },
    {
        id: 6,
        title: "wishlist",
        icon: Heart,
        path: "wishlist"
    },
];


export const categorySlides = [
    {
        id: 1,
        title: "latestIphones",
        image: "/images/iphone16.png",
    },
    {
        id: 2,
        title: "Watches",
        image: "/images/wt214.png",
    },
    {
        id: 3,
        title: "stylishAccessories",
        image: "/images/bag.png",
    },
    {
        id: 4,
        title: "fashionableOutfits",
        image: "/images/shirt.png",
    },
];

export interface Products {
    _id:string
    name:string
    description:string
    price:number
    discountPrice:number
    stock:number
    images: string[]
    categoryId:string
    productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
};
    quantity:number
}

