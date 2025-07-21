"use client";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { deleteproduct, GetProducts } from "@/redux/productslice";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import RatingStars from "@/components/library/RatingStars";
import Link from "next/link";
import Updateproducts from "./Updateproducts";
import Categories from "../categories/Categories";
import { useLocale, useTranslations } from "next-intl";
import MotionWrapper from "../library/MotionWrapper";
import Form from "./Form";
import Addtocart from "../cart/Addtocart";
import Togglewishlist from "./Togglewishlist";
import { toast } from "sonner";
import { clearmessage } from "@/redux/wishlistslice";

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations("products");
    const l = useTranslations('wishlist')

    const locale = useLocale();
    const { token, role } = useSelector((state: RootState) => state.auth);
    const message = useSelector((state: RootState) => state.wishlist.message)

    const items = useSelector((state: RootState) => state.products.Items);

    const [selectedCategory, setSelectedCategory] = useState<string | null>("");
    const [searchQuery, setSearchQuery] = useState("");
    const swiperRef = useRef<SwiperType | null>(null);
    const perPage = 8;

    useEffect(() => {
        dispatch(GetProducts());
    }, [dispatch]);

    const isLoading = useMemo(() => items.length === 0, [items]);

    const getTranslated = useCallback(
    (val: string) => (locale === "ar" ? t(val).toLowerCase() : val.toLowerCase()),
    [locale, t]
);

   const filteredItems = useMemo(() => {
    return items.filter((i) => {
        const name = getTranslated(i.name);
        return (
            name.includes(searchQuery.toLowerCase()) &&
            (selectedCategory === "" || i.categoryId === selectedCategory)
        );
    });
}, [items, searchQuery, selectedCategory, getTranslated]);

    const groupedItems = useMemo(() => {
        const groups = [];
        for (let i = 0; i < filteredItems.length; i += perPage) {
            groups.push(filteredItems.slice(i, i + perPage));
        }
        return groups;
    }, [filteredItems, perPage]);

    useEffect(() => {
        if (message) {
            toast.success(l(message));
            dispatch(clearmessage());
        }
    }, [message,l,dispatch]);
    return (
        <section className="mt-40">
            <div className="container">
                {isLoading ? (
                    <div className="flex items-center justify-center flex-col">
                        <div className="loading"></div>
                        <p className="text-gray-500 text-sm mt-2">{t("loading")}</p>
                    </div>
                ) : (
                    <>
                        <Form />
                        <MotionWrapper>
                            <div className={`global ${locale === "ar" ? "rtl-global" : ""}`}>
                                {t("Today")}
                            </div>
                        </MotionWrapper>
                        <MotionWrapper>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
                                {t("Flash Sales")}
                            </h1>
                        </MotionWrapper>
                        <MotionWrapper>
                            <div className="flex mb-5">
                                <div className="flex-[1]">
                                    <form>
                                        <input
                                            type="text"
                                            placeholder={t("Search Your Product")}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="outline-none bg-[#f5f5f5] p-2 rounded-sm shadow w-1/2 max-md:w-3/4 focus:w-3/4  max-md:focus:w-full border border-gray-200 transition-all duration-500 max-md:placeholder:text-xs"
                                        />
                                    </form>
                                </div>
                                <div
                                    className={`flex gap-2 justify-end flex-[1] ${locale === "ar"
                                        ? "flex-row-reverse justify-start"
                                        : "flex-row"
                                        }`}
                                >
                                    <button
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        className="bg-[#f5f5f5] rounded-full p-2 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer"
                                        aria-label="Previous Slide"
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <button
                                        onClick={() => swiperRef.current?.slideNext()}
                                        className="bg-[#f5f5f5] rounded-full p-2 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer"
                                        aria-label="Next Slide"
                                    >
                                        <ArrowRight />
                                    </button>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper>
                            <Categories
                                onCategorySelect={setSelectedCategory}
                                selectedCategory={selectedCategory}
                            />
                        </MotionWrapper>
                        {filteredItems.length === 0 ? (
                            <p className="text-gray-500 text-center mt-4">{t('noproduct')}</p>
                        ) : (
                            <Swiper
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                spaceBetween={30}
                                allowTouchMove
                            >
                                {groupedItems.map((group, index) => (
                                    <SwiperSlide key={group[0]?._id || index}>
                                        <MotionWrapper>
                                            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                                                {group.map((item) => (
                                                    <MotionWrapper key={item._id}>
                                                        <div className="bg-white rounded shadow-sm p-3 flex flex-col gap-3 relative hover:scale-105 transition-all duration-500">
                                                            {Array.isArray(item.images) &&
                                                                item.images.length > 0 && (
                                                                    <div className="w-[150px] h-[150px] mx-auto">
                                                                        <Image
                                                                            src={item.images[0]}
                                                                            alt={`${item.name} image`}
                                                                            width={125}
                                                                            height={125}
                                                                            className="rounded border object-contain"
                                                                        />
                                                                    </div>
                                                                )}
                                                            <h1 className="font-bold">
                                                                {locale === "ar" ? t(item.name) : item.name}
                                                            </h1>
                                                            <p className="text-gray-800 text-sm">
                                                                {locale === "ar"
                                                                    ? t(item.description)
                                                                    : item.description}
                                                            </p>
                                                            <div className="flex gap-3">
                                                                <p className="text-[var(--color-secondary)]">
                                                                    {item.price - item.discountPrice}
                                                                </p>
                                                                <p className="line-through text-gray-400">
                                                                    {item.price}
                                                                </p>
                                                            </div>
                                                            <RatingStars rating={4.5} count={105} />
                                                            <div className="absolute top-5 right-5 hover:text-[var(--color-secondary)]">
                                                                <Togglewishlist item={item} />
                                                            </div>
                                                            <Link href={`products/${item._id}`}>
                                                                <div className="absolute top-12 right-5 hover:text-[var(--color-secondary)]">
                                                                    <Eye size={20} />
                                                                </div>
                                                            </Link>
                                                            <Addtocart item={item} />
                                                            {role === "admin" && (
                                                                <>
                                                                    <button
                                                                        aria-label={`Delete ${item.name}`}
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                deleteproduct({
                                                                                    token,
                                                                                    id: item._id,
                                                                                })
                                                                            )
                                                                        }
                                                                    >
                                                                        delete
                                                                    </button>
                                                                    <Updateproducts item={item} />
                                                                </>
                                                            )}
                                                        </div>
                                                    </MotionWrapper>
                                                ))}
                                            </div>
                                        </MotionWrapper>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Products;
