"use client";

import MotionWrapper from "@/components/library/MotionWrapper";
import { setAuth } from "@/redux/authslice";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginPage() {
    const t = useTranslations('login')
    const locale = useLocale()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (res.ok) {
                const token = data.data.token
                const userId = data.data.user._id
                const role = data.data.user.role
                localStorage.setItem("token", token)
                localStorage.setItem("userId", userId)
                localStorage.setItem("role", role)
                dispatch(setAuth({ token, userId,role }))
                router.push("/")
            }
            else {
                toast.error(t('invalid'))
            }
        }
        catch {
            toast.error(t('server'))
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center max-md:mt-20">
            <div className="container flex  gap-8 items-center max-md:flex-col ">
                <div className="">
                <MotionWrapper>
                    <Image
                        src="/images/signUp.jpg"
                        alt="Shopping Illustration"
                        width={800}
                        height={800}
                        loading="lazy"
                        aria-hidden ={true}
                        className="object-cover h-full w-full rounded-md"
                    />
                </MotionWrapper>
                </div>
                <div className="w-full lg:w-1/2 ">
                <MotionWrapper>
                    <h2 className="text-3xl max-md:text-2xl font-semibold text-gray-800 mb-2 tracking-wider">
                        {t('title')}
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">{t('subtitle')}</p>
                    <form className="space-y-10" onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-secondary)] focus:border-b-2 transition-colors focus:outline-none peer"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute  top-2 text-gray-500 text-sm cursor-text
                                    peer-focus:text-xs peer-focus:-top-3 peer-focus:text-[var(--color-secondary)]
                                    peer-valid:text-xs peer-valid:-top-3 peer-valid:text-[var(--color-secondary)]
                                    transition-all  ${locale === "ar"?"right-0":"left-0"}`}
                            >
                                {t('email')}
                            </label>
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-secondary)] focus:border-b-2 transition-colors focus:outline-none peer"
                            />
                            <label
                                htmlFor="password"
                                className={`absolute top-2 text-gray-500 text-sm cursor-text
                                    peer-focus:text-xs peer-focus:-top-3 peer-focus:text-[var(--color-secondary)]
                                    peer-valid:text-xs peer-valid:-top-3 peer-valid:text-[var(--color-secondary)]
                                    transition-all  ${locale === "ar"?"right-0":"left-0"}`}
                            >
                                {t('password')}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-secondary)] text-white py-2 rounded hover:bg-red-700 transition-all duration-500 cursor-pointer"
                            aria-label={t('loginBtn')}
                        >
                        {t('loginBtn')}
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4 text-center ">
                        {t('noAccount')} {" "}
                        <Link href={`/${locale}/register`}  aria-label={t('register')} className="text-[var(--color-secondary)] hover:underline">
                            {t('register')}
                        </Link>
                    </p>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
}