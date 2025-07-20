"use client";

import { ShoppingCart, Heart, Menu, X, User, } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLinks } from "@/lib/types";
import SideBar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { GetUserCart } from "@/redux/cartslice";
import { loadWishlist } from "@/redux/wishlistslice";

const Navbar = () => {
    const locale = useLocale()
    const t = useTranslations('Navbar');
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const cartscount = useSelector((state: RootState) => state.cart.cart.length)
    const favouritesCount = useSelector((state: RootState) => state.wishlist.Favourite.length)
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>()
    const [menu, setMenu] = useState(false)
    useEffect(() => {
        if (token && userId) {
            dispatch(GetUserCart({ token, userId }));
        }
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
            try {
                const parsed = JSON.parse(wishlist);
                dispatch(loadWishlist(parsed));
            } catch (err) {
                console.error("Error parsing wishlist from localStorage:", err);
            }
        }
    }, [dispatch, token, userId]);

    return (
        <header className="w-full border-b-2 border-[#ddd] shadow-sm fixed top-0 left-0  z-50 bg-white">
            <div className={`container flex justify-between items-center max-md:flex-row-reverse`}>
                <h1 className="text-xl font-bold">{t('exclusive')}</h1>
                <nav  aria-label="Main navigation">
                    <ul className="flex gap-12 text-sm max-md:hidden">
                        {NavLinks.slice(0, 4).map((link) => {
                            const fullPath = `/${locale}${link.path === "/" ? "" : "/" + link.path}`
                            const isActive = pathname === fullPath;
                            return (
                                <li key={link.id}>
                                    <Link
                                        href={fullPath}
                                        aria-label={t(link.title)}
                                        className={`relative cursor-pointer before:absolute before:left-0 before:bottom-[-5px] before:h-0.5 before:bg-[var(--color-secondary)]
                                            before:transition-all before:duration-300 before:content-[''] hover:scale-105 duration-300 transition-all ${isActive ? "before:w-full text-[var(--color-secondary)]" : "before:w-0"}`}>
                                        {t(link.title)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="flex gap-4 items-center max-md:hidden">
                    <LanguageSwitcher />
                    <div className="relative">
                        <Link href={`/${locale}/wishlist`} aria-label="Wishlist" className="hover:scale-125 transition-all duration-300 hover:text-[var(--color-secondary)]"> <Heart size={22} /></Link>
                        {
                            favouritesCount > 0 && (
                                <span className="text-white absolute bg-[var(--color-secondary)] w-5 h-5 rounded-full flex items-center justify-center -top-2 -left-3 text-xs ">{favouritesCount}</span>
                            )
                        }
                    </div>
                    <div className="relative">
                        <Link href={`/${locale}/cart`} aria-label="cart" className="hover:scale-125 transition-all duration-300 hover:text-[var(--color-secondary)]"> <ShoppingCart size={22} /></Link>
                        {
                            cartscount > 0 && (
                                <span className="text-white absolute bg-[var(--color-secondary)] w-5 h-5 rounded-full flex items-center justify-center -top-2 -left-3 text-xs ">{cartscount}</span>
                            )
                        }

                    </div>
                    {token && userId ? <Link href={`/${locale}/profile`} aria-label="profile" className="hover:scale-125 transition-all duration-300 hover:text-[var(--color-secondary)]"><User size={22} /></Link> : null}
                </div>
                <div className="min-md:hidden flex gap-3 items-center">

                    <div
                        className={` transition-all duration-500 ${menu ? "rotate-90" : "rotate-0"}`}
                        onClick={() => setMenu(!menu)}
                    >
                        {menu ? <X /> : <Menu />}
                    </div>
                    <div className=''>
                        <LanguageSwitcher />
                    </div>
                </div>
                <SideBar menu={menu} setMenu={setMenu} />
            </div>
        </header>
    );
};

export default Navbar;