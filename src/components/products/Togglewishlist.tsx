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
            <button aria-label={Favourites.some(fav => fav._id === item._id) ? "حذق من المفضلة" : "اضافة الى المفضلة"}
            onClick={() => {
                    dispatch(ToggleToWishlist(item))
                }}>
                <Heart size={20}  fill={Favourites.some(fav => fav._id === item._id) ? "red" : "none"} />
            </button>
    )
}

export default Togglewishlist
