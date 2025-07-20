"use client"
import React, { FormEvent, useState } from 'react'
import MotionWrapper from '../library/MotionWrapper'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { addproductsimage, createProduct } from '@/redux/productslice';

const Form = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {token, role } = useSelector((state: RootState) => state.auth);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        categoryId: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageFile || !token) return alert("الصورة أو التوكن مفقود");
        const formData = new FormData();
        formData.append("images", imageFile);
        const result: any = await dispatch(addproductsimage({ token, formData }));
        const imageUrls = result.payload;

        const finalPayload = {
            ...productData,
            price: parseFloat(productData.price),
            discountPrice: parseFloat(productData.discountPrice),
            stock: parseInt(productData.stock),
            images: imageUrls,
        };

        dispatch(createProduct({ token, productData: finalPayload }));
    };
    return (
        <div>
            <MotionWrapper>
                {
                    role === "admin" && (
                        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                            <input name="name" type="text" placeholder="اسم المنتج" onChange={handleChange} />
                            <input name="description" type="text" placeholder="الوصف" onChange={handleChange} />
                            <input name="price" type="number" placeholder="السعر" onChange={handleChange} />
                            <input name="discountPrice" type="number" placeholder="سعر الخصم" onChange={handleChange} />
                            <input name="stock" type="number" placeholder="المخزون" onChange={handleChange} />
                            <input name="categoryId" type="text" placeholder="ID التصنيف" onChange={handleChange} />
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                إضافة المنتج
                            </button>
                        </form>
                    )
                }
            </MotionWrapper>
        </div>
    )
}

export default Form
