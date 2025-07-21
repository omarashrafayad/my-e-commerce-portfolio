"use client"
import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useLocale, useTranslations } from 'next-intl';
import { Products } from '@/lib/types';
import { decreaseQuantity, DeleteCart, IncreasQuantity } from '@/redux/cartslice';
import { toast } from 'sonner';
import MotionWrapper from '../library/MotionWrapper';


const CartMobile = () => {
    const l = useTranslations('products')
    const t = useTranslations('cart')
    const locale = useLocale()
    const carts = useSelector((state: RootState) => state.cart.cart);
    const getLocalized = (text: string) => locale === "ar" ? l(text) : text;
    const dispatch = useDispatch<AppDispatch>()
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const handleDecreseQuantity = (item: Products) => {
        try {
            if (item.quantity > 1) {
                dispatch(decreaseQuantity({
                    token,
                    userId,
                    productId: item.productId._id,
                    quantity: item.quantity - 1
                })).unwrap();
                toast.success(t('quantityDecreased'))
            }
        }
        catch (err) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(String(err));
  }
}
    }

    const handledelete = (item: Products) => {
        try {
            dispatch(DeleteCart({ userId, productId: item.productId._id, token })).unwrap();
            toast.success(t('delete'))
        }
        catch (err) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(String(err));
  }
}
    }
    const handleIncreaseQuantity = (item: Products) => {
        try {
            dispatch(IncreasQuantity({
                token,
                userId,
                productId: item.productId._id,
                quantity: item.quantity + 1
            })).unwrap();
            toast.success(t('quantityIncreased'))
        }
        catch (err) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(String(err));
  }
}
    }
    return (
                        <div className="md:hidden">
                            {carts.map((item) => (
                                <MotionWrapper key={item._id}>
                                <div className="p-4 mb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-5">
                                        {item.productId?.images?.[0] && (
                                            <Image
                                                src={item.productId?.images?.[0]}
                                                alt={getLocalized(item.name)}
                                                width={70}
                                                priority={false}
                                                height={70}
                                            />
                                        )}
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold">
                                                {getLocalized(item.name)}
                                            </h3>
                                            <strong className="text-sm text-gray-500">${item.price}</strong>
                                            <div className={`flex items-center gap-3 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                                                <button
                                                aria-label={t('quantityDecreased')}
                                                    className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                    onClick={() =>handleDecreseQuantity(item)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button
                                                aria-label={t('quantityIncreased')}
                                                    className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                    onClick={() => handleIncreaseQuantity(item)}>+</button>
                                            </div>
                                            <strong className="mt-2 text-sm">{t("subtotal")}: {locale === "ar" ? `${(item.price * item.quantity).toFixed(2)}$` : `$${(item.price * item.quantity).toFixed(2)}`}</strong>
                                            <button onClick={() => handledelete(item)} aria-label='delete'
                                                className={`text-sm cursor-pointer text-[var(--color-secondary)] mt-2 inline-block ${locale === "ar" ? "text-right" : "text-left"}`}>{t('remove')}</button>
                                        </div>
                                    </div>
                                </div>
                                        </MotionWrapper>
                            ))}
                        </div>
  )
}

export default CartMobile
