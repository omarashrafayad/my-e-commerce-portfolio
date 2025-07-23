"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { CreateOrder } from '@/redux/ordersSlice';
type PaymentProps = {
  formData: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
};
const Paymentorder: React.FC<PaymentProps> = ({ formData }) => {
    const t = useTranslations('Orders')
    const dispatch = useDispatch<AppDispatch>();
    const carts = useSelector((state: RootState) => state.cart.cart);
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [PaymentMethod, SetPaymentMethod] = useState('cash');
    const handlePlaceOrder = async () => {
        if (
            !formData.city || !formData.country || !formData.fullName || !formData.postalCode ||
            !formData.street
        ) {
            toast.error(t("fill_all_fields"));
            return;
        }
        const validItems = carts
            .filter(cart => cart.productId && cart.productId._id)
            .map(cart => ({
                productId: cart.productId._id,
                name: cart.name,
                price: cart.price,
                quantity: cart.quantity
            }));

        if (validItems.length === 0) {
            toast.error(t('notcomplete'));
            return;
        }

        const totalPrice = carts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        const orderPayload = {
            userId,
            items: validItems,
            totalPrice,
            shippingAddress: {
                fullName: formData.fullName,
                street: formData.street,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country
            }
        };

        try {
            const res = await dispatch(CreateOrder({ token, orderPayload })).unwrap();
            router.push(`/checkout/${res._id}`);
        }  catch (error) {
    if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error(String(error));
    }
}
    };
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="payment"
                        id="bank"
                        className="accent-[var(--color-secondary)]"
                        onChange={() => SetPaymentMethod('bank')}
                    />
                    <label htmlFor="bank" className="">
                        {t('bank')}
                    </label>
                </div>
                <div className="flex gap-2">
                    {['visa2.png', 'visa3.png', 'mastercard.png', 'visa1.png'].map(src => (
                        <Image
                            key={src}
                            src={`/images/${src}`}
                            alt="Visa logo" 
                            aria-label={`/images/${src}`}
                            width={45}
                            height={45}
                            loading="lazy"
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>
            {PaymentMethod === 'bank' && (
                <div className="space-y-3">
                    <input type="text" placeholder={t('bankName')} className="w-full border p-2 rounded" />
                    <input type="text" placeholder={t('accountNumber')} className="w-full border p-2 rounded" />
                    <input type="text" placeholder={t('accountHolderName')} className="w-full border p-2 rounded" />
                    <input type="text" placeholder={t('branchName')} className="w-full border p-2 rounded" />
                </div>
            )}
            <div className='flex gap-1'>
                <input
                    type="radio"
                    name="payment"
                    id="cash"
                    className="accent-[var(--color-secondary)]"
                    onChange={() => SetPaymentMethod('cash')}
                />
                <label htmlFor="cash" >
                    {t('cashOnDelivery')}
                </label>
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    className="w-full rounded p-2 outline-none border border-gray-300 bg-[#f5f5f5] placeholder:text-sm"
                    placeholder={t('couponCode')}
                />
                <button aria-label="Apply coupon" className="bg-[var(--color-secondary)] text-white text-center w-full p-2 rounded cursor-pointer hover:bg-red-700 transition-all duration-300">
                    {t('applyCoupon')}
                </button>
            </div>
            <div>
                <button aria-label="Place Order"
                    className="px-6 py-2 bg-[var(--color-secondary)] text-white rounded cursor-pointer hover:bg-red-700 transition-all duration-300"
                    onClick={handlePlaceOrder}
                >
                    {t('placeOrder')}
                </button>
            </div>
        </div>
    )
}
export default Paymentorder
