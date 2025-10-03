import axios from "axios";
import { Product, LoginUser, User, ContactUs, SizeQuantity, Address, OrderProduct, OrderHistory } from "./Interfaces";
import { getToken } from "../auth/TokenManager";
import { OrderResponseBody } from "@paypal/paypal-js";



// const serverUrl = 'http://localhost:4500/';
const serverUrl = 'http://a0e6f47056d4d4025a221fb1ff748af5-1748927112.eu-west-1.elb.amazonaws.com/';


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
        if (gender === 'men')
            gender = 'Male'
        else if (gender === 'women')
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

// Get user cart products
export async function getCartProducts(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `products/getCartProducts`, {
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
        const httpStatusCode = error.response.data
        throw httpStatusCode;
    }
}

// Update product details
export async function updateProduct(product?: Product): Promise<Product> {
    try {
        const result = await axios.put<Product>(serverUrl + `products/updateProduct`, product, {
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

// Send Reset Mail to reset account
export async function sendResetMail(email: string): Promise<void> {
    try {
        await axios.get(serverUrl + `resetAccount/${email}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// Verify if link is expired
export async function verifyResetPassword(token: string): Promise<void> {
    try {
        await axios.post(serverUrl + 'resetAccount/checkExpired', { token }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Reset password
export async function resetPassword(token: string, newPassword: string): Promise<void> {
    try {
        await axios.post(serverUrl + 'resetAccount', { token, newPassword }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Send support mail
export async function sendSupportMail(contactMessage: ContactUs): Promise<void> {
    try {
        await axios.post(serverUrl + 'contact', contactMessage, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error: any) {
        const httpStatusCode = error.response.status
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
export async function addToCart(productId?: string, sizeQuantity?: SizeQuantity): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + 'user/addtocart', { productId, size: sizeQuantity?.size, quantity: sizeQuantity?.quantity }, {
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
export async function removeFromCart(productId?: string): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `user/removeFromCart/${productId}`, {}, {
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

// Remove all products from user
export async function removeAllFromCart(): Promise<User> {
    try {
        const result = await axios.delete<User>(serverUrl + 'user/removeAllFromCart', {
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
export async function changePrdouctCartAmount(productId?: string, quantity?: number): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + 'user/changePrdouctCartAmount', { productId, quantity }, {
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
        const obj = { img: img }
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
// Delete product by Id
export async function deleteProduct(productId?: string): Promise<void> {
    try {
        await axios.delete(serverUrl + `products/deleteProduct/${productId}`, {
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

// Add new product
export async function createOrder(paypalPayment?: OrderResponseBody, address?: Address, products?: Array<OrderProduct>): Promise<void> {
    try {
        await axios.post(serverUrl + 'orders/createOrder', { paypalPayment, address, products }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

    } catch (error: any) {
        const httpStatusCode = error.response.data
        throw httpStatusCode;
    }
}

// Get Orders history of user
export async function getOrdersHistory(): Promise<Array<OrderHistory>> {
    try {
        const result = await axios.get<Array<OrderHistory>>(serverUrl + `orders/getOrdersHistory`, {
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

//Api request for today currency from ILS to USD
// export async function convertILStoUSD(num:number):Promise<string> {
//     const url = 'https://v6.exchangerate-api.com/v6/93b590481be1d1634e4e994f/latest/USD';
//     const options = {
//         method: 'GET'
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         const total = num / Number(result.conversion_rates.ILS);
        
//         return total.toString().replace(/\.\d*/g, '');
//     } catch (error) {
//         console.error(error);
//         throw "Couldn't fetch convertion";
//     }
// }
