import { Products } from '@/lib/types'
import { AppDispatch, RootState } from '@/redux/store'
import {  ToggleToWishlist } from '@/redux/wishlistslice'
import { Heart } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Togglewishlist = ({item}:{item:Products}) => {
    const Favourites = useSelector((state: RootState) => state.wishlist.Favourite)
    const dispatch = useDispatch<AppDispatch>()
    return (
            <>
                <Heart size={20} onClick={() => {
                    dispatch(ToggleToWishlist(item))
                }} fill={Favourites.some(fav => fav._id === item._id) ? "red" : "none"} />
            </>
    )
}

export default Togglewishlist
