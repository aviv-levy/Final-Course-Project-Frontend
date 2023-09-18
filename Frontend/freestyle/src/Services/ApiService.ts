import axios from "axios";
import { Product, LoginUser, User } from "./Interfaces";
import { getToken } from "../auth/TokenManager";



const serverUrl = 'http://localhost:4500/';


// Return true if user is logged in.
export function isLoggedIn(): boolean {
    const token = getToken();
    if (!token)
        return false;

    return true;
}

// User Login
export async function login(user: LoginUser): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// User Register
export async function addNewUser(user?: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'register', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Get user details from token
export async function getUserDetails(): Promise<User> {
    try {
        const result = await axios.get<User>(serverUrl + 'user/userDetails', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}


// Update user account
export async function updateAccount(user?: User): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `user/updateAccount`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Get All products
export async function getProductByCategory(gender: string, category: string): Promise<Array<Product>> {
    try {
        if(gender === 'men')
            gender = 'Male'
        else if(gender === 'women')
            gender = 'Female'
        const result = await axios.get<Array<Product>>(serverUrl + `products/getProductByCategory/${gender}/${category}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}
// Get all user products
export async function getMyProducts(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `products/getMyProducts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}
// Get user card by Id
export async function getProductById(productId?: string): Promise<Product> {
    try {
        const result = await axios.get<Product>(serverUrl + `products/getProduct/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Get user favorite products
export async function getFavoriteProducts(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `products/getFav`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}


// Add new product
export async function addNewProduct(product?: Product): Promise<Product> {
    try {
        const result = await axios.post<Product>(serverUrl + 'user/addProduct', product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })
        return result.data;

    } catch (error: any) {
        console.log(error);

        const httpStatusCode = error.response.data
        throw httpStatusCode;
    }
}


// Update user liked product by product Id
export async function likeProduct(productId?: string): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `user/likeProduct/${productId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}
// Update user cart by product Id
export async function addToCart(productId?: string): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `user/addtocart/${productId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}
// Update card by Id
export async function updateProfileImg(img: string): Promise<string> {
    try {
        const obj = {img: img}
        const result = await axios.put<string>(serverUrl + `user/updateProfileImg`, obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}
// Delete card by Id
export async function deleteCard(cardId?: string): Promise<void> {
    try {
        await axios.delete(serverUrl + `cards/deleteCard/${cardId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}


// Get all users
export async function getAllUsers(): Promise<Array<User>> {
    try {
        const result = await axios.get<Array<User>>(serverUrl + `admin/getAllUsers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Update user status
export async function updateUserStatus(userId?: string): Promise<Array<User>> {
    try {
        const result = await axios.put<Array<User>>(serverUrl + `admin/updateStatus/${userId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Delete User by Id
export async function deleteUser(userId?: string): Promise<Array<User>> {
    try {
        const result = await axios.delete<Array<User>>(serverUrl + `admin/deleteUser/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}

// Update user status
export async function updateUserBiz(userId?: string): Promise<Array<User>> {
    try {
        const result = await axios.put<Array<User>>(serverUrl + `admin/updateBiz/${userId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}