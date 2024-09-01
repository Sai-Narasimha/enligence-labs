// TypeScript: Explicitly type the parameters and return type

// For POST requests
export const postApiMethod = async (url: string, payload: any, additionalHeaders: Record<any, any> = {}): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeaders // Spread additional headers
            },
            body: JSON.stringify(payload) // Stringify the payload
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('POST request error:', err);
        throw err; // Re-throw error for better error handling
    }
}

// For GET requests
export const getApiMethod = async (url: string, additionalHeaders: Record<any, any> = {}): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeaders // Spread additional headers
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('GET request error:', err);
        throw err; // Re-throw error for better error handling
    }
}
