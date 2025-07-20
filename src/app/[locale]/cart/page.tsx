"use client"
import { decreaseQuantity, DeleteCart, GetUserCart, IncreasQuantity } from '@/redux/cartslice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from 'sonner'
import { Products } from '@/lib/types'
import MotionWrapper from '@/components/library/MotionWrapper'
import CartMobile from '@/components/cart/CartMobile'

const CartPage = () => {
    const t = useTranslations('cart')
    const l = useTranslations('products')
    const locale = useLocale()
    const dispatch = useDispatch<AppDispatch>()
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const carts = useSelector((state: RootState) => state.cart.cart)
    const loading = useSelector((state: RootState) => state.cart.loading)
    const totalprice = useMemo(() =>
        carts.reduce((total, item) => total + item.price * item.quantity, 0)
        , [carts]);
    const getLocalized = (text: string) => locale === 'ar' ? l(text) : text;

    useEffect(() => {
        if (token && userId) {
            dispatch(GetUserCart({ token, userId }))
        }
    }, [dispatch, token, userId])
    const handleDecreseQuantity = async (item: Products) => {
        try {
            if (item.quantity > 1) {
                await dispatch(decreaseQuantity({
                    token,
                    userId,
                    productId: item.productId._id,
                    quantity: item.quantity - 1
                })).unwrap();
                toast.success(t('quantityDecreased'))
            }
        }
        catch (err: any) {
            toast.error(err)
        }
    }

    const handledelete = async (item: Products) => {
        try {
            await dispatch(DeleteCart({ userId, productId: item.productId._id, token })).unwrap();
            toast.success(t('delete'))
        }
        catch (err: any) {
            toast.error(err)
        }
    }
    const handleIncreaseQuantity = async (item: Products) => {
        try {
            await dispatch(IncreasQuantity({
                token,
                userId,
                productId: item.productId._id,
                quantity: item.quantity + 1
            })).unwrap();
            toast.success(t('quantityIncreased'));
        } catch (err: any) {
            toast.error(err);
        }
    };

    return (
        <div className="mt-28">
            {loading ? (
                <div className="flex items-center justify-center flex-col">
                    <div className="loading"></div>
                    <p className="text-gray-500 text-sm mt-2">{l("loading")}</p>
                </div>
            ) : carts.length === 0 ? (
                <div className="flex justify-center flex-col items-center">
                    <h1 className="text-3xl font-bold mb-3">
                        {t('empty')} <span className="text-[var(--color-secondary)]">{t('emtty')}</span>
                    </h1>
                    <Link
                        href={`/${locale}/products`}
                        aria-label="products"
                        className={`flex text-[var(--color-secondary)] gap-1 ${locale === 'ar' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <ArrowLeft size={20} />
                        <span>{t('returnShopping')}</span>
                    </Link>
                </div>
            ) : (
                <div className="container flex gap-8 max-md:flex-col">
                    <div className="flex-2">
                        <MotionWrapper>
                            <div className="flex justify-between mb-5 border-b border-gray-300 p-4">
                                <h1 className="text-3xl font-bold">{t('your')} <span className='text-[var(--color-secondary)]'>{t('cart')}</span></h1>
                                <p className="text-xl text-gray-500">{carts.length} {t('items')}</p>
                            </div>
                            <div className='overflow-x-auto hidden md:block'>
                                <table className='w-full min-w-[600px]'>
                                    <thead >
                                        <tr className=''>
                                            <th className={`p-3  ${locale === "ar" ? "text-right" : "text-left"}`}>{t('productDetails')}</th>
                                            <th >{t('price')}</th>
                                            <th >{t('quantity')}</th>
                                            <th >{t('subtotal')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.map((item) => (
                                            <tr key={item._id}  >
                                                <td className='flex gap-4 items-center p-2 w-full'>
                                                    {item.productId?.images?.[0] && (
                                                        <Image
                                                            src={item.productId?.images?.[0]}
                                                            alt={getLocalized(item.name)}
                                                            width={70}
                                                            height={70}
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    <div>
                                                        <p>{getLocalized(item.name)}</p>
                                                        <button onClick={() => handledelete(item)}
                                                            className='text-[var(--color-secondary)] text-sm cursor-pointer' aria-label="delete"  >{t('remove')}</button>
                                                    </div>
                                                </td>
                                                <td className='text-center '><p>${item.price}</p></td>
                                                <td className="text-center">
                                                    <div className={`flex items-center justify-center gap-4 ${locale === "ar" ? "flex-row-reverse" : ""} `}>
                                                        <button
                                                            aria-label={t('quantityDecreased')}
                                                            className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                            onClick={() => handleDecreseQuantity(item)}>−</button>
                                                        <span className="text-center">{item.quantity}</span>
                                                        <button
                                                            aria-label={t('quantityIncreased')}
                                                            className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                            onClick={() => handleIncreaseQuantity(item)}>+</button>
                                                    </div>
                                                </td>
                                                <td className='text-center'>${item.price * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Link href={`/${locale}/products`} aria-label="products" className={`flex text-[var(--color-secondary)] p-3 gap-1 items-center ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                                    <ArrowLeft size={20} />
                                    <span>{t('continueShopping')}</span>
                                </Link>
                            </div>
                            <CartMobile />
                        </MotionWrapper>
                    </div>
                    <div className="flex-1 p-5 ">
                        <MotionWrapper>
                            <h2 className='text-2xl font-bold mb-3'>{t('cartTotal')}</h2>
                            <div className='flex flex-col gap-5'>
                                <div className='flex justify-between'>
                                    <h3>{`${locale === "ar" ? ` ${carts.length} ${t('items')}` : `${t('items')} ${carts.length}`}`}</h3>
                                    <span className='text-gray-500'>${totalprice}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h3>{t('shippingFree')}</h3>
                                    <span className='text-gray-500'>{t('free')}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h3>{t('tax')}</h3>
                                    <span className='text-gray-500'>2%</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h3 className='font-semibold'>{t('total')}</h3>
                                    <span className="text-gray-600">${(totalprice + totalprice * 0.02).toFixed(2)}</span>
                                </div>
                                <Link href={`/${locale}/checkout`} className='px-4 py-2 rounded text-white bg-[var(--color-secondary)] cursor-pointer hover:bg-red-700 transition-all duration-500 text-center max-md:w-1/2' aria-label="checkout">{t('checkout')}</Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage