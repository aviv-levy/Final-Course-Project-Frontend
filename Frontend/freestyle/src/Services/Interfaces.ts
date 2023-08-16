export interface User {
    userDetails?: User,
    _id?: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    address?: Address;
    img?: string,
    img_alt?: string,
    biz?: boolean,
    token?: string;
    isAdmin?: boolean;
    cart?: Array<string>;
    likedProducts?: Array<string>;
    status?: 'Active' | 'Expired' | 'Blocked';
}

export interface LoginUser {
    email: string;
    password?: string;
}

export interface Product {
    _id?: string;
    title: string;
    subTitle: string;
    description: string;
    brand: string;
    type: 'Shoes' | 'Pants' | 'Underwear' | 'Shirt' | 'Top' | 'Dress';
    gender: 'Male' | 'Female' | 'Unisex';
    price: number;
    stock: number;
    measure: number | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    imageUrl?: string,
    imageAlt?: string,
    userId: string;
}

interface ProductQuantity {
    productId: string,
    quantity: number
}

export interface Address {
    city: string;
    street: string,
    housenum?: number,
}

export interface Order {
    _id?: string,
    products: Array<ProductQuantity>,
    userId: string
}

export interface context {
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
    userDetails?: User,
    setUserDetails: Function,
    // filteredCards?: Array<Product>,
    // setFilteredCards: Function,
    // darkMode?: boolean,
    // setDarkMode: Function
}

export interface CopyCardsContext {
    copyCards?: Array<Product>,
    setCopyCards: Function
}