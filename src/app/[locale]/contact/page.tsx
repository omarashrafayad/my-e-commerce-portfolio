"use client"
import React, { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'sonner'
import MotionWrapper from '@/components/library/MotionWrapper'
const Page  = () => {
    const t = useTranslations('contact')
    const l = useTranslations('Orders')
    const locale = useLocale()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className='mt-30'>
            <div className='container flex  flex-wrap gap-5 max-md:text-center max-md:flex-col'>
                <div className='flex-2'>
                    <MotionWrapper>
                        <div className=' mb-5 '>
                            <div className='flex items-center mb-5 max-md:justify-center gap-2'>
                                <div className=' bg-[var(--color-secondary)] p-2 rounded-full text-white'>
                                    <Phone className='w-5 h-5 ' />
                                </div>
                                <span className='font-semibold'>{t('callToUs')}</span>
                            </div>
                            <h4 className='mb-3 text-sm'>{t('available')}</h4>
                            <h3 className='text-sm'>{t('phone')}: 01013102794</h3>
                        </div>
                        <div className=''>
                            <div className='flex items-center mb-5 max-md:justify-center gap-2'>
                                <div className=' bg-[var(--color-secondary)] p-2 rounded-full text-white'>
                                    <Mail className='w-5 h-5' />
                                </div>
                                <span className='font-semibold'>{t('emailUs')}</span>
                            </div>
                            <h4 className='mb-3 text-sm'>{t('contactWithin')}</h4>
                            <h3 className='text-sm mb-2'>{t('emails')}: omar.ayad3040@gmail.com</h3>
                            <h3 className='text-sm'>{t('emails')}: omar.ayad2048@gmail.com</h3>
                        </div>
                    </MotionWrapper>
                </div>
                <div className='flex-3'>
                    <MotionWrapper>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                                toast.error(l("fill_all_fields"));
                                return;
                            }
                            toast.success(t('message'))
                            setFormData({
                                name : "",
                                email : "",
                                phone : "",
                                message : ""
                            })
                            
                        }}>
                            <div className='flex gap-3 mb-3 w-full flex-wrap'>
                                <input type="text" name="name" className=' outline-none bg-[#f5f5f5] rounded-sm p-3 flex-1' placeholder={t('yourName')}
                                    value={formData.name} onChange={handleChange} />
                                <input type="email" name="email" className=' outline-none bg-[#f5f5f5] rounded-sm p-3 flex-1' placeholder={t('yourEmail')}
                                    value={formData.email} onChange={handleChange} />
                                <input type="tel" name="phone" className={` outline-none bg-[#f5f5f5] rounded-sm p-3 flex-1 ${locale === "ar" ? "text-right" : "text-left"}`} placeholder={t('yourPhone')}
                                    value={formData.phone} onChange={handleChange} />
                            </div>
                            <div>
                                <textarea className='w-full outline-none rounded-sm bg-[#f5f5f5] p-3 resize-none mb-2' placeholder={t('yourMessage')} rows={6}
                                    value={formData.message} name="message" onChange={handleChange}></textarea>
                            </div>
                            <button className=' bg-[var(--color-secondary)] rounded hover:bg-red-700 px-6 py-2 text-white cursor-pointer block ml-auto'>{t('sendMessage')}</button>
                        </form>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    )
}
export default Page 
