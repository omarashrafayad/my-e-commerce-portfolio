"use client";
import { NavLinks } from "@/lib/types";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const SideBar = ({ menu, setMenu }: { menu: boolean; setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const t = useTranslations("Navbar")
    const locale = useLocale()
    const {token,userId} = useSelector((state: RootState) => state.auth);
     useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { 
                setMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setMenu]);
    return (
        <div
            className={`
                fixed top-[75px] ${locale === "en" ? "left-0" : "right-0"} h-screen  w-[300px]
                bg-[var(--color-secondary)] text-white z-40
                transition-transform duration-1000 ease-in-out
                transform ${menu ? "translate-x-0" : `${locale === "en" ? "-translate-x-full" : "translate-x-full"}`}
            `} aria-label="Sidebar navigation"
        >
            <div className="flex flex-col p-6">
                <ul className="flex flex-col ">
                    {NavLinks.map((link) => (
                        <li key={link.id} >
                            <Link href={`/${locale}/${link.path}`} aria-label={`Go to ${t(link.title)}`} className="py-5 flex items-center transition-all duration-300 hover:scale-110 gap-2"
                                onClick={() => setMenu(false)}>
                                <span className="inline-block ">{<link.icon />}</span>
                                {t(link.title)}
                            </Link>
                        </li>
                    ))}
                    {token && userId ?
                    <li>
                        <Link href={`/${locale}/profile`} aria-label='profile' className="py-5 flex items-center transition-all duration-300 hover:scale-110 gap-2"
                            onClick={() => setMenu(false)}>
                            <span className="inline-block "><User /></span>
                            {t("profile")}
                        </Link>
                    </li> : null
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default SideBar;