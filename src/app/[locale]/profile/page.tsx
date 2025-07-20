"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
    fetchUserProfile,
    updateUserProfile,
} from "@/redux/userslice"
import { useRouter } from "next/navigation";
import { LogOut } from "@/redux/authslice";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import Link from "next/link";
import { loadWishlist } from "@/redux/wishlistslice";
import { clearCart } from "@/redux/cartslice";


export default function ProfilePage() {
    const t = useTranslations('profile')
    const locale = useLocale()
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.user.data);
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        // if (!token || !userId) return;

        dispatch(fetchUserProfile(userId));
    }, [dispatch, token, userId]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const errorMap: Record<string, string> = {
            "Password must be at least 6 characters long.": "password_too_short",
            "Phone number must be between 10 and 15 digits.": "invalid_phone",
            "Email must be a valid email address.": "invalid_email"
        };
        e.preventDefault();
        try {
            await dispatch(updateUserProfile({ userId, formData })).unwrap();
            toast.success(t('updated'))
        }
       catch (err: any) {
        const firstError = Array.isArray(err) ? err[0] : err;

        const key = errorMap[firstError] || firstError || "unknown_error";

        toast.error(t(key));
    }

    };
    return (
        <div className="my-28">
            <h2 className="container text-sm text-right">
                {t('welcome')}{" "}
                <span className="text-[var(--color-secondary)]">{formData.name}</span>
            </h2>
            <div className="container flex max-md:flex-col">
                <div className="flex-[1]">
                    <div className="mb-4">
                        <h2 className="font-bold mb-3">{t('manage')}</h2>
                        <p className="text-sm text-gray-500 ml-8">{t('profile')}</p>
                        <button onClick={() => {
                            dispatch(LogOut())
                            localStorage.removeItem('token');
                            localStorage.removeItem('userId');
                            localStorage.removeItem('role');
                            localStorage.removeItem('wishlist'); 
                            dispatch(loadWishlist([]));
                            dispatch(clearCart())
                            router.push("/")

                        }} aria-label={t('logout')}
                            title={t('logout')}
                            className="ml-8 mt-2 cursor-pointer text-gray-500  transition-all duration-300 hover:text-[var(--color-secondary)]"
                            >{t('logout')}
                            </button>
                    </div>
                    <div className="mb-4">
                        <h2 className="font-bold mb-3">{t('orders')}</h2>
                        <Link href={`/${locale}/checkout`} aria-label={t('returns')}
                            title={t('returns')} className="text-sm text-gray-500 ml-8 transition-all duration-300 hover:text-[var(--color-secondary)]">{t('returns')}</Link>
                    </div>
                    <div className="mb-4">
                        <h2 className="font-bold mb-3"> {t('wishlistTitle')}</h2>
                        <Link href={`/${locale}/wishlist`} aria-label={t('wishlist')}
                            title={t('wishlist')} className="text-sm text-gray-500 ml-8 transition-all duration-300 hover:text-[var(--color-secondary)]">{t('wishlist')}</Link>
                    </div>
                </div>
                <div className="flex-[2] bg-white p-7 rounded shadow">
                    <h2 className="text-lg font-semibold text-[var(--color-secondary)] mb-6">
                        {t('editTitle')}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    aria-label={t('name')}
                                    title={t('name')}
                                    required
                                    className="w-full rounded px-3 py-2 bg-[#f5f5f5] focus:outline-none placeholder:text-sm text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    aria-label={t('email')}
                                    title={t('email')}
                                    required
                                    className="w-full rounded px-3 py-2 bg-[#f5f5f5] focus:outline-none placeholder:text-sm text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('phone')}</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    aria-label={t('phone')}
                                    title={t('phone')}
                                    required
                                    className="w-full rounded px-3 py-2 bg-[#f5f5f5] focus:outline-none placeholder:text-sm text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {t('address')}
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    aria-label={t('address')}
                                    title={t('address')}
                                    required
                                    className="w-full rounded px-3 py-2 bg-[#f5f5f5] focus:outline-none placeholder:text-sm text-gray-600"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className=" mb-3">{t('passwordChanges')}</h3>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                aria-label={t('passwordChanges')}
                                title={t('passwordChanges')}
                                required
                                className="w-full rounded px-3 py-2 bg-[#f5f5f5] focus:outline-none placeholder:text-sm text-gray-600"
                            />
                        </div>
                        <div className="flex justify-end items-center mt-6 gap-5">
                            <button
                                type="submit"
                                aria-label={t('save')}
                                className="bg-[var(--color-secondary)] text-sm text-white px-5 py-2.5 rounded hover:bg-red-700 transition-all duration-500 cursor-pointer"
                            >
                                {t('save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
