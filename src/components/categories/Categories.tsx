"use client";

import { GetAllCategories } from "@/redux/categoriesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import UpdateCategories from "./UpdatedCategories";

type CategoriesProps = {
    onCategorySelect: (id: string | null) => void;
    selectedCategory: string | null;
};

const Categories = ({ onCategorySelect,selectedCategory }: CategoriesProps) => {
    const t = useTranslations('categories');
    const locale = useLocale()
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.name);

    useEffect(() => {
        dispatch(GetAllCategories());
    }, [dispatch]);

    const handleClick = (id: string) => {
        onCategorySelect(id);
    };

    return (
        <div className="flex gap-2 flex-wrap my-5 "
        role="group" aria-label='categort filter'>
            <button
                className={`w-28 h-10 rounded ${
                    selectedCategory === "" ? "bg-[var(--color-secondary)] text-white" : "bg-gray-200 cursor-pointer"
                }`}
                onClick={() => handleClick("")}
            >
                {t('All')}
            </button>
            {categories.map((cat) => (
                <div key={cat._id}>
                <button
                    
                aria-pressed={selectedCategory === cat._id}
                    className={`w-28 h-10 rounded text-sm cursor-pointer ${
                        selectedCategory === cat._id
                            ? "bg-[var(--color-secondary)] text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => handleClick(cat._id)}>
                    {locale === "ar" ? t(cat.name) : cat.name}
                </button>
                {/* <UpdateCategories cat={cat}/> */}
                </div>
            ))}
        </div>
    );
};

export default Categories;