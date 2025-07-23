"use client";

import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RatingStars from "@/components/library/RatingStars";
import { RefreshCcw, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Addtocart from "@/components/cart/Addtocart";
import Togglewishlist from "@/components/products/Togglewishlist";
import { toast } from "sonner";
import { clearmessage } from "@/redux/wishlistslice";
import { Products } from "@/lib/types";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const sizes = [
    { id: 1, label: "XS" },
    { id: 2, label: "S" },
    { id: 3, label: "M" },
    { id: 4, label: "L" },
    { id: 5, label: "XL" },
  ];

  const colors = [
    { id: 1, hex: "#A0BCE0" },
    { id: 2, hex: "#E07575" },
    { id: 3, hex: "#6EE7B7" },
  ];
  const f = useTranslations('wishlist')
  const dispatch = useDispatch<AppDispatch>();
  const message = useSelector((state: RootState) => state.wishlist.message)
  const [product, setProduct] = useState<Products | null>(null);
  const [error, setError] = useState("");
  const [SelectSize, SetSelectSize] = useState(3)
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const t = useTranslations('productId')
  const l = useTranslations('products')
  const locale = useLocale()

  useEffect(() => {
    if (message) {
      toast.success(f(message));
      dispatch(clearmessage());
    }
  }, [message,f,dispatch]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${BASE_URL}/api/products/${id}`);
      const data = await res.json();
        if (res.ok) {
          setProduct(data.data);
        } else {
          setError("Product not found");
        }
      } catch {
        setError("Server error");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div className="animate-pulse text-gray-400">{l("loading")}</div>;
  const newLocal = 30;
  return (
    <div className="my-28">
      <div className="container flex gap-4 max-md:flex-col">
        <div className="flex flex-[1]">
          <Image src={product.images[0]} alt={locale === "ar" ? l(product.name) : product.name} loading="lazy" width={400} height={400} className="object-contain max-md:w-[300px] max-md:h-[300px]" />
        </div>
        <div className="flex flex-col flex-[1]">
          <div className="mb-5 border-b-2 border-[#DDD] pb-7">
            <h1 className="text-3xl font-bold mb-2">{locale === "ar" ? l(product.name) : product.name}</h1>
            <div className="flex gap-3 mb-2">
              <RatingStars rating={4.5} count={105} />
              <span>|</span>
              <span className="text-green-500 ">{t('inStock')}</span>
            </div>
            <h2 className="text-2xl mb-2">${product.price}</h2>
            <p className="text-md ">{locale === "ar" ? l(product.description) : product.description}</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span >{t('colors')}:</span>
              <ul className="flex gap-2">
  {colors.map((color) => {
    const colorNames: Record<number, string> = {
      1: locale === "ar" ? "أزرق" : "Blue",
      2: locale === "ar" ? "أحمر" : "Red",
      3: locale === "ar" ? "أخضر" : "Green",
    };

    return (
      <button
        key={color.id}
        aria-label={colorNames[color.id]}
        className={`w-5 h-5 rounded-full border cursor-pointer ${selectedColor === color.id ? "border-2 border-black" : ""}`}
        style={{ backgroundColor: color.hex }}
        onClick={() => setSelectedColor(color.id)}
      >
        <span className="sr-only">{colorNames[color.id]}</span>
      </button>
    );
  })}
</ul>

            </div>
            <div className="flex items-center gap-3">
              <span >{t('size')}:</span>
              <ul className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    aria-label={`Select size ${size.label}`}
                    className={`border border-gray-500 p-3.5 text-xs rounded-sm w-6 h-6 flex justify-center items-center transition-all duration-300 cursor-pointer ${size.id === SelectSize ? "bg-[var(--color-secondary)] border border-[var(--color-secondary)] text-white" : ""}`}
                    onClick={() => SetSelectSize(size.id)}>
                    {size.label}
                  </button>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-[1]"><Addtocart item={product} /></div>
              <span className=" flex-[1] mb-1.5">
                <Togglewishlist item={product} />
              </span>
            </div>
            <div className="mt-4 border border-gray-500 rounded">
              <div className="flex items-center p-3 border-b border-gray-500 gap-3">
                <Truck size={30} aria-hidden="true" />
                <div>
                  <span>{t('freeDelivery')}</span>
                  <p className="text-xs mt-2 underline">{t('postalPrompt')}</p>
                </div>
              </div>
              <div className="flex items-center p-3 gap-3">
                <RefreshCcw size={newLocal} aria-hidden="true" />
                <div>
                  <span>{t('returnDelivery')}</span>
                  <p className="text-sm mt-2">{t('returnDetails')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
