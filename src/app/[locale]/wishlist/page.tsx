"use client"
import RatingStars from '@/components/library/RatingStars'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { clearmessage, DeleteToWishlist, loadWishlist } from '@/redux/wishlistslice'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Addtocart from '@/components/cart/Addtocart'
import { toast } from 'sonner'


const WishlistPage = () => {
    const Favourites = useSelector((state: RootState) => state.wishlist.Favourite)
    const message = useSelector((state: RootState) => state.wishlist.message)
    const dispatch = useDispatch<AppDispatch>()
    const t = useTranslations('wishlist')
    const l = useTranslations('products')
    const locale = useLocale()

    useEffect(() => {
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
            const parsed = JSON.parse(wishlist);
            dispatch(loadWishlist(parsed));
        }
    }, [dispatch]);
     useEffect(() => {
            if (message) {
                toast.success(t(message));
                dispatch(clearmessage());
            }
        }, [message,t,dispatch]);

    return (
        <div className='mt-28'>
            <h1 className="text-lg font-bold mb-8">
                {t('WishList')} ({Favourites.length})
            </h1>
            <div className='container '>
                {Favourites.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold" role="alert"
                            aria-live="polite">
                            {t('emptyy')}{" "}
                            <span className="text-[var(--color-secondary)]">{t('empty')}</span>
                        </h1>
                        <div>
                            <Link href={`/${locale}/products`} aria-label="products" className={`flex items-center text-lg text-bold gap-1 text-[var(--color-secondary)] p-3 cursor-pointer ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                                <span >
                                    <ArrowLeft size={20} />
                                </span>
                                <p>{t('return')}</p>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4" role="list">
                        {Favourites.map((fav) => (
                            <div
                                key={fav._id} role="listitem"
                                className="bg-white rounded shadow-sm p-3 flex flex-col gap-3 relative"
                            >
                                {fav.images?.length > 0 && (
                                    <div className="w-[150px] h-[150px] mx-auto">
                                        <Image
                                            src={fav.images[0]}
                                            alt={locale === "ar" ? l(fav.name) : fav.name}
                                            width={125}
                                            height={125}
                                            loading='lazy'
                                            className="rounded border object-contain"
                                        />
                                    </div>
                                )}
                                <h1 className="font-bold">{locale === "ar" ? l(fav.name) : fav.name}</h1>
                                <p className="text-gray-800 text-sm">{locale === "ar" ? l(fav.description) : fav.description}</p>
                                <div className="flex gap-3">
                                    <p className="text-red-500 ">
                                        {fav.price - fav.discountPrice}
                                    </p>
                                    <p className="line-through text-gray-400">{fav.price}</p>
                                </div>
                                <RatingStars rating={4.5} count={105} />
                                <div className="absolute top-5 right-5 hover:text-red-500" aria-label="delete">
                                    <Trash2
                                        size={20}
                                        onClick={() => dispatch(DeleteToWishlist(fav._id))}
                                    />
                                </div>
                                <Addtocart item={fav} />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default WishlistPage
