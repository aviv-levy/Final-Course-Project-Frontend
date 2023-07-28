export interface User {
    userDetails?: User,
    _id?: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    img?: string,
    img_alt?: string,
    city: string;
    street: string,
    housenum: number,
    biz?: boolean,
    token?: string;
    isAdmin?: boolean;
    likedProducts?: Array<string>;
    status: 'Active' | 'Expired' | 'Blocked';
}

export interface LoginUser {
    email: string;
    password?: string;
}

export interface Cards {
    _id?: string;
    cardNumber?: number;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageUrl?: string,
    imageAlt?: string,
    state?: string,
    country: string,
    city: string;
    street: string,
    houseNumber: number,
    zip?: number,
    userId: string;
}

export interface context {
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
    userDetails?: User,
    setUserDetails: Function,
    filteredCards?: Array<Cards>,
    setFilteredCards: Function,
    darkMode?: boolean,
    setDarkMode: Function
}

export interface CopyCardsContext {
    copyCards?: Array<Cards>,
    setCopyCards: Function
}