import { Truck, Headphones, ShieldCheck } from 'lucide-react';
import MotionWrapper from './MotionWrapper';
import { useTranslations } from 'next-intl';

const benefitsData = [
  {
    icon: Truck,
    title: "deliveryTitle",
    description: "deliveryDesc",
  },
  {
    icon: Headphones,
    title: "supportTitle",
    description: "supportDesc",
  },
  {
    icon: ShieldCheck,
    title: "guaranteeTitle",
    description: "guaranteeDesc",
  },
];

const BenefitsBanner = () => {
  const t = useTranslations('benefitsBanner')
  return (
    <div className='mt-24'>
      <div className='container flex justify-evenly items-center text-center flex-wrap gap-5'>
        {benefitsData.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <MotionWrapper key={index}>
            <article className='text-center'>
              <div className=' bg-black text-white mx-auto w-fit rounded-full p-3 mb-4 border-4 border-gray-300 flex justify-center items-center'>
                <Icon className='w-7 h-7' aria-hidden="true"/>
              </div>
              <h2 className="font-bold mb-1 text-lg">{t(benefit.title)}</h2>
              <p className="text-sm text-gray-600">{t(benefit.description)}</p>
            </article>
              </MotionWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsBanner;
