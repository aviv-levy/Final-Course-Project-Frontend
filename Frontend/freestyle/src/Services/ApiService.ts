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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// Update user details by Id
export async function updateUserDetails(user?: User): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `userDetails/updateUser`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Get All cards
export async function getAllCards(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `cards/getAllCards`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Get all user cards
export async function getMyCards(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `cards/getMyCards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Get user card by Id
export async function getCardById(cardId?: string): Promise<Product> {
    try {
        const result = await axios.get<Product>(serverUrl + `cards/getCard/${cardId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Get user favorite cards
export async function getFavoriteCards(): Promise<Array<Product>> {
    try {
        const result = await axios.get<Array<Product>>(serverUrl + `cards/getFav`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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


// Update user liked card by card Id
export async function likeCard(cardId?: string): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `userDetails/likeCard/${cardId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Update card by Id
export async function updateCard(card?: Product): Promise<string> {
    try {
        const result = await axios.put<string>(serverUrl + `cards/updateCard`, card, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
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
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}