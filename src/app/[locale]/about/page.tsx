import React from 'react'
import Image from 'next/image'
import { Store, DollarSign, ShoppingBag, Banknote } from "lucide-react";
import ProductSlider from '@/components/library/ProductSlider';
import BenefitsBanner from '@/components/library/BenefitsBanner';
import { useTranslations } from 'next-intl';
import MotionWrapper from '@/components/library/MotionWrapper';

const About = () => {
    const t = useTranslations('about')
    const stats = [
        {
            id:1,
            icon: <Store className="w-6 h-6  " />,
            value: "10.5k",
            label: "sellers",
        },
        {
            id:2,
            icon: <DollarSign className="w-6 h-6 " />,
            value: "33k",
            label: "monthlySales",
        },
        {
            id:3,
            icon: <ShoppingBag className="w-6 h-6 " />,
            value: "45.5k",
            label: "customers",
        },
        {
            id:4,
            icon: <Banknote className="w-6 h-6 " />,
            value: "25k",
            label: "annualGross",
        },
    ];
    return (
        <div className='mt-30'>
            <div className='container'>
                <div className='flex flex-wrap  gap-5 items-center max-md:flex-col'>
                    <div className='flex-1'>
                    <MotionWrapper>
                        <h1 className='text-5xl mb-5 font-bold max-md:text-3xl'>{t('title')}</h1>
                        <p className='mb-3'>{t('paragraph1')}</p>
                        <p>{t('paragraph2')}</p>
                </MotionWrapper>
                    </div>
                    <div className='flex-1'>
                <MotionWrapper>
                        <Image src="/images/About.jpg" loading='lazy' alt="Company Overview" width={800} height={800} className='rounded-sm object-cover' />
                    </MotionWrapper>
                    </div>
                </div>
                <div className=' mt-30 flex flex-wrap gap-5 justify-evenly'>
                    {
                        stats.map((stat)=>(
                            <MotionWrapper key={stat.id}>
                           <div className="flex flex-col gap-2 border-2 rounded border-[#ddd] text-center w-[250px] h-[175px] p-4">
                                    <div className="bg-black text-white mx-auto rounded-full p-2 mb-3 border-8 border-gray-300">
                                        {stat.icon}
                                    </div>
                                    <h1 className="text-2xl font-bold">{stat.value}</h1>
                                    <p className="text-sm">{t(stat.label)}</p>
                                </div>
                            </MotionWrapper>
                        ))
                    }
                </div>
                <ProductSlider/>
                <BenefitsBanner/>
            </div>
        </div>
    )
}

export default About
