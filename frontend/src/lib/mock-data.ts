export interface CartItemType {
    id: string
    title: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
    instructor: string
  }
  
  export const mockCartItems: CartItemType[] = [
    {
      id: "1",
      title: "The Python Mega Course: Build 10 Real World Applications",
      price: 37.99,
      originalPrice: 49.0,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviewCount: 444,
      instructor: "Leslie Alexander & Guy Hawkins",
    },
    {
      id: "2",
      title: "Machine Learning A-Z™: Hands-On Python & R in Data Science",
      price: 9.99,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      reviewCount: 451,
      instructor: "Bessie Cooper",
    },
    {
      id: "3",
      title: "Learn Ethical Hacking From Scratch",
      price: 13.99,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviewCount: 351,
      instructor: "Marvin McKinney",
    },
  ]
  
  