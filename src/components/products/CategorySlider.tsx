'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { categorySlides } from '@/lib/types';
import MotionWrapper from '@/components/library/MotionWrapper';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
const CategorySlider = () => {
    const t = useTranslations('titles')
    const locale = useLocale()
    return (
        <section className="w-full mt-28 " aria-label="Featured Categories Slider" >
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
            >
                {categorySlides.map((category) => (
                    <SwiperSlide key={category.id}>
                        <MotionWrapper>
                            <div className="flex container justify-between items-center bg-black h-[350px] overflow-hidden rounded-sm">
                                <div>
                                    <h4 className='text-[var(--color-secondary)]'>{t('category')}</h4>
                                    <h2 className="text-5xl  text-white font-bold my-4 max-md:text-xl max-md:my-2">{t(category.title)}</h2>
                                    <Link href={`/${locale}/products`} className="btn-animated-link" aria-label="products">
                                        <span className="text">{t('shop')}</span>
                                        <span className="bg-left"></span>
                                        <span className="bg-right"></span>
                                    </Link>
                                </div>
                                <div>
                                    <Image
                                        src={category.image}
                                        alt={t(category.title)}
                                        width={300}
                                        height={300}
                                        loading="lazy"
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        </MotionWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CategorySlider;