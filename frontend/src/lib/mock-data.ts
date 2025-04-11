export interface CartItemType {
    _id: string
    title: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
    instructorId: {name:string}
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
    instructorId: {name:string}
    inStock: boolean
    dateAdded: string
  }
  
 