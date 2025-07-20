"use client"
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { GetUserCart } from '@/redux/cartslice';
import { useLocale, useTranslations } from 'next-intl';
import MotionWrapper from '@/components/library/MotionWrapper';
import FormOrders from '@/components/order/FormOrders';
import Paymentorder from '@/components/order/Paymentorder';

const Page = () => {
    const t = useTranslations('Orders')
    const l = useTranslations('products')
    const locale = useLocale()
    const dispatch = useDispatch<AppDispatch>();
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const carts = useSelector((state: RootState) => state.cart.cart);
    const getLocalized = (text: string) => locale === "ar" ? l(text) : text;

    const totalprice = carts.reduce((total, item) => total + item.price * item.quantity, 0)
    const [formData, setFormData] = useState({
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
    });
    useEffect(() => {
        if (token && userId) {
            dispatch(GetUserCart({ token, userId }));
        }
    }, [dispatch, token, userId]);

    return (
        <section className="mt-28" aria-label="Cart Summary">
            <h1 className="text-3xl font-bold text-[var(--color-secondary)] container">{t('billingDetails')}</h1>
            <div className="container flex gap-5 max-md:flex-col flex-wrap">
                <div className="flex flex-col flex-[1]">
                    <FormOrders formData={formData} setFormData={setFormData} />
                </div>
                <div className="flex flex-col flex-[1] p-4">
                    <MotionWrapper>
                        {carts.map(cart => (
                            <MotionWrapper key={cart._id}>
                                <div className="flex justify-between items-center mb-5">
                                    <div className="flex items-center">
                                {cart.productId?.images?.length > 0 && (
                                <Image src={cart.productId.images[0]} alt={`Product image of ${locale === "ar" ? l(cart.name) : cart.name}`} width={55} height={55} loading="lazy" />
                                )}
                                    <h2 className="ml-2 text-sm" aria-label={getLocalized(cart.name)}>{getLocalized(cart.name)}</h2>
                                    </div>
                                    <p className="text-sm">${cart.price}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                        <div className="flex flex-col gap-3 mb-5">
                            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                                <h2 className="text-sm">{t('subtotal')}:</h2>
                                <p className="text-sm">${totalprice}</p>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                                <h2 className="text-sm">{t('shipping')}:</h2>
                                <p className="text-sm">{t('free')}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm">{t('total')}:</h2>
                                <p className="text-sm">${totalprice}</p>
                            </div>
                        </div>
                        <Paymentorder formData={formData} />
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
};

export default Page;
