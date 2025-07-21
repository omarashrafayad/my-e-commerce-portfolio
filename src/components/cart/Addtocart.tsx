import { Products } from '@/lib/types';
import { AddToCart } from '@/redux/cartslice';
import { AppDispatch, RootState } from '@/redux/store';
import { ShoppingCartIcon } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Addtocart = ({ item }: { item: Products }) => {
    const t = useTranslations('products')
    const dispatch = useDispatch<AppDispatch>()
    const { token, userId } = useSelector((state: RootState) => state.auth);
   const addCart = async (item: Products, e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    await dispatch(
      AddToCart({
        token,
        userId,
        productId: item._id,
        quantity: 1,
        price: item.price,
        name: item.name,
      })
    ).unwrap();
    toast.success(t('added'));
  } catch (err) {
    const loginErrorMessage = "Failed to add item to cart: input must be a 24 character hex string, 12 byte Uint8Array, or an integer";

    if (err instanceof Error) {
      toast.error(err.message === loginErrorMessage ? t('Login First') : t(err.message));
    } else {
      toast.error(t(String(err)));
    }
  }
};

    return (
        <>
            <button
                onClick={(e) => addCart(item, e)} aria-label={t('Add To Cart')}
                title={t('Add To Cart')} type="button"
                className="relative w-full h-[35px] cursor-pointer bg-[#222] rounded-md text-white font-sans overflow-hidden transition duration-700 group"
            >
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-top-14 bg-[var(--color-secondary)] text-white"
                >
                    {t('Add To Cart')}
                </div>
                <div className="absolute inset-0 flex items-center justify-center -bottom-16 transition-all duration-500 group-hover:bottom-0">
                    <ShoppingCartIcon className="w-6 h-6 text-white" />
                </div>
            </button>
        </>
    )
}

export default Addtocart
