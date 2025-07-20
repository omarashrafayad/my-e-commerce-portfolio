
import { updateproducts } from '@/redux/productslice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Products } from '@/lib/types'

const Updateproducts = ({item}:{item:Products}) => {
    const [name,setname] = useState(item.name)
    const [description,setdescription] = useState(item.description)
    const [price,setprice] = useState(item.price)
    const [discountPrice,setdiscountPrice] = useState(item.discountPrice)
    const [stock,setstock] = useState(item.stock)
    const [categoryId,setcategoryId] = useState(item.categoryId)
    const [show,setshow] = useState(false)
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch<AppDispatch>();
    return (
    <div>
    <button onClick={()=> setshow(true)}>update</button>
    {
        show && (
            <form action="" onSubmit={(e)=> e.preventDefault()}>
                <input type="text" placeholder='name' value={name} onChange={(e)=> setname(e.target.value)} />
                <input type="text"  placeholder='description' value={description} onChange={(e)=> setdescription(e.target.value)}/>
                <input type="number" placeholder='price' value={price} onChange={(e)=> setprice(Number(e.target.value))}/>
                <input type="number" placeholder='discountPrice' value={discountPrice} onChange={(e)=> setdiscountPrice(Number(e.target.value))} />
                <input type="number" placeholder='stock' value={stock} onChange={(e)=> setstock(Number(e.target.value))} />
                <input name="categoryId" type="text" placeholder="ID التصنيف"  value={categoryId} onChange={(e)=> setcategoryId(e.target.value)}/>
                <button onClick={()=>{
                    dispatch(updateproducts({token,id:item._id,name,discountPrice,description,price,stock,categoryId}))
                    setshow(false)
                }}>save</button>
                <button onClick={()=>  setshow(false)}>cancle</button>
            </form>
        )
    }
    </div>
    )
}

export default Updateproducts
