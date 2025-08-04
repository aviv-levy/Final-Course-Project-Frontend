import { SizeQuantity } from "../Services/Interfaces";

// Define a function to assign numerical values to sizes
function getSizeValue(size: string | number): number {
    switch (size) {
        case "XS": return 0;
        case "S": return 1;
        case "M": return 2;
        case "L": return 3;
        case "XL": return 4;
        case "XXL": return 5;
        default: return +size; // Handle unknown sizes
    }
}

export function sortSizeQuantity(array: Array<SizeQuantity>) {
    // Sort the t-shirt sizes array
    
        array.sort((a, b) => getSizeValue(a.size) - getSizeValue(b.size));
        
}