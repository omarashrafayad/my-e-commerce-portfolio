"use client"
import React, { useState } from 'react'
import MotionWrapper from '@/components/library/MotionWrapper'
import { useTranslations } from 'next-intl';
type AddressFormData = {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
};
type FormProps = {
    formData: AddressFormData;
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
};
const FormOrders: React.FC<FormProps> = ({ formData, setFormData }) => {

    const inputFields = [
        { id: 'fullName', label: 'fullName' },
        { id: 'street', label: 'street' },
        { id: 'city', label: 'city' },
        { id: 'postalCode', label: 'postalCode' },
        { id: 'country', label: 'country' },
    ];
    const t = useTranslations('Orders')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    return (
        <>
            <MotionWrapper>
                <form>
                    {inputFields.map(({ id, label }) => (
                        <div key={id} className="mb-4">
                            <label htmlFor={id} className="block mb-1 text-gray-500 text-sm">
                                {t(label)}
                            </label>
                            <input
                                type="text"
                                aria-required="true"
                                aria-label={t(label)}
                                aria-describedby={`${id}-description`}
                                required
                                id={id}
                                name={id}
                                value={formData[id as keyof typeof formData] || ''}
                                onChange={handleChange}
                                className="w-full border p-2 rounded bg-[#d5d5d5] outline-none"
                            />
                        </div>
                    ))}
                    <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            name="Save"
                            id="Save"
                            className="w-5 h-5 mr-2 accent-[var(--color-secondary)]"
                        />
                        <label htmlFor="Save" className="text-sm cursor-pointer">
                            {t('saveInfo')}
                        </label>
                    </div>
                </form>
            </MotionWrapper>
        </>
    )
}

export default FormOrders
