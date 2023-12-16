
export function convertDateToString(dateString: string): string {

    let dateObject = new Date(dateString);

    // Get the day, month, and year from the Date object
    var day = dateObject.getUTCDate();
    var month = dateObject.getUTCMonth() + 1; // Months are zero-based
    var year = dateObject.getUTCFullYear();

    // Format the date components as dd/mm/yyyy
    var formattedDate = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        year;

    return formattedDate
}