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
    subtitle: string;
    description?: string;
    brand: string;
    category: string;
    gender: 'Male' | 'Female' | 'Unisex';
    price: number;
    stock: number;
    sizeQuantity: Array<SizeQuantity>
    imageUrl?: string,
    imageAlt?: string,
    userId: string;
}

export interface SizeQuantity {
    size: number | string;
    quantity: number;
}
interface ProductQuantity {
    productId: string,
    quantity: SizeQuantity
}

export interface Address {
    city: string;
    street: string,
    housenum?: number,
}

export interface Order {
    _id?: string,
    products: Array<ProductQuantity>,
    address: Address,
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