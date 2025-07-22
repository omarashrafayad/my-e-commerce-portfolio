"use client"
import React from 'react'
import Image from 'next/image'
import AnimatedTitle from "@/components/heroSection/AnimatedTitle"
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
const Landingpage = () => {
    const t = useTranslations('banner');
    const locale = useLocale()
    return (
        <section className={`relative h-[calc(100vh-75px)] top-[75px]  ${locale === "en" ? "bg-gradient-to-r from-black to-[var(--color-secondary)]" : "bg-gradient-to-l from-black to-[var(--color-secondary)]"}`}>
            <div className="container h-full flex items-center justify-around
                max-md:flex-col">
                <div className="">
                    <AnimatedTitle text={t('text')} id="hero-title" />
                    <h2 className="text-3xl font-bold text-white mb-4 max-md:text-lg">
                        {t('headline')}
                    </h2>
                    <p className="text-lg font-bold text-white mb-6 max-md:text-sm">{t('subtext')}</p>
                    <Link href={`/${locale}/products`} className="btn-animated-link" aria-label="products">
                        <span className="text">{t('shop')}</span>
                        <span className="bg-left"></span>
                        <span className="bg-right"></span>
                    </Link>
                </div>
                <div>
                    <Image
                        src="/images/landing100 (1).png"
                        alt="Landing page product showcase"
                        width={400}
                        height={400}
                        priority
                        className="object-cover max-md:w-[300px] max-md:h-[300px] "
                    />
                </div>
            </div>
        </section>
    )
}

export default Landingpage
