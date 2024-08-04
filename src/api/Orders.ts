const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // move to env variable

console.log('API_URL:', API_URL)

export const createOrder = async (order: any) => {
    console.log(order)
    console.log(API_URL)
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        console.error('Failed to create order');
    }

    const result = await response.json()
    console.log('Response:', result)
    return result;
};