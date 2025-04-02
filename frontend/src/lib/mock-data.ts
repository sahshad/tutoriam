export interface CartItemType {
    id: string
    title: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
    instructor: string
    thumbnail:string
  }
  
  export interface WishlistItemType {
    _id: string
    title: string
    price: number
    originalPrice?: number
    thumbnail:string
    image: string
    rating: number
    reviewCount: number
    instructor: string
    inStock: boolean
    dateAdded: string
  }
  
 