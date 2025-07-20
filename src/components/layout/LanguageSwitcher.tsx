"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import Image from "next/image";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [open, setOpen] = useState(false);

    const switchLanguage = (newLocale: string) => {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");
        router.replace(newPath);
        setOpen(false); // أغلق القائمة بعد التغيير
    };

    return (
        <div className="relative"
            id="language-menu"
            role="menu"
        >
            <button
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls="language-menu"
                role="menuitem"
                onClick={() => setOpen((prev) => !prev)}
                className="mt-1.5 hover:text-[var(--color-secondary)] transition-all cursor-pointer duration-500"
            >
                <Globe size={22} />
            </button>

            {open && (
                <div className="absolute right-0 max-md:left-3 mt-2 w-32 bg-white border border-gray-300 rounded z-50">
                    {routing.locales.map((loc) => (
                        <button
                            key={loc}
                            aria-controls="switch-language"
                            onClick={() => switchLanguage(loc)}
                            className={`flex items-center gap-2 w-full text-start text-sm px-4 py-2 border-b border-gray-300 cursor-pointer font-semibold ${loc === currentLocale ? "text-[var(--color-secondary)]" : ""
                                }`}
                        >
                            <Image
                                src={loc === "ar" ? "/images/EgyptFlag.png" : "/images/UsFlag.png"}
                                alt={loc === "ar" ? "Egypt Flag" : "US Flag"}
                                width={21}
                                height={21}
                            />
                            {loc === "ar" ? "العربية" : "English"}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;