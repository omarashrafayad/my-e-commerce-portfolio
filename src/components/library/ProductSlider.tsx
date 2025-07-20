"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import MotionWrapper from "@/components/library/MotionWrapper";

const ProductSlider = () => {
    const t = useTranslations('roles')
    const paginationRef = useRef(null); 

const items = [
    {
        image: "/images/item2.png",
        name: "mike_brown",
        role: "frontend",
    },
    {
        image: "/images/item3.png",
        name: "robert_davis",
        role: "marketing",
    },
    {
        image: "/images/item4.png",
        name: "john_smith",
        role: "uiux",
    },
    {
        image: "/images/item5.png",
        name: "william_white",
        role: "content",
    },
    {
        image: "/images/item6.png",
        name: "daniel_lee",
        role: "art",
    },
    {
        image: "/images/item7.png",
        name: "david_kim",
        role: "software",
    },
];

    return (
        <div className="mt-24">
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                slidesPerGroup={1}
                pagination={{
                    clickable: true,
                    el: paginationRef.current!, 
                    bulletClass: "swiper-pagination-bullet custom-bullet",
                    bulletActiveClass: "custom-bullet-active",
                }}
                onSwiper={(swiper) => {
                    if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
                        swiper.params.pagination.el = paginationRef.current!;
                        swiper.pagination.init();
                        swiper.pagination.render();
                        swiper.pagination.update();
                    }
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MotionWrapper>
                        <div className=" rounded-lg shadow-sm p-4 flex flex-col items-center text-center mt-30 bg-[#f5f5f5]">
                            <div className="relative w-full h-48 mb-4">
                                <Image
                                    src={item.image}
                                    alt={t(item.name)}
                                    fill
                                    className="rounded-md object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">{t(item.name)}</h3>
                            <p className="text-sm text-gray-500 mb-3">{t(item.role)}</p>
                           <div className="flex gap-4 justify-center text-gray-600 ">
                                <div className="bg-[#EEE] p-1.5 rounded-full">
                                    <Facebook className="w-5 h-5 hover:text-blue-600 transition-all duration-500" aria-label="Facebook profile"/>
                                </div>
                                <div className="bg-[#EEE] p-1.5 rounded-full">

                                <Twitter className="w-5 h-5 hover:text-sky-500 transition-all duration-500" aria-label="Twitter profile"/>
                                </div>
                                <div className="bg-[#EEE] p-1.5 rounded-full">

                                <Instagram className="w-5 h-5 hover:text-pink-500 transition-all duration-500"aria-label="Instagram profile" />
                                </div>
                            </div>
                        </div>
                        </MotionWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div ref={paginationRef} className="custom-swiper-pagination mt-5 text-center cursor-pointer" />

            <style jsx global>{`
    .custom-swiper-pagination .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #ddd !important;
    border-radius: 50%;
    margin: 0 5px;
    opacity: 1;
    transition: background-color 0.3s;
    } 

    .custom-swiper-pagination .custom-bullet-active {
    background-color: black !important;
    }
`}</style>
        </div>
    );
};

export default ProductSlider;
