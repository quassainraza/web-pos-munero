import { Response, Request } from "express";
import axios from "axios";
import crypto from 'crypto';

function generateSignature(requestUrl: string, method: string, queryParams: any, giftlovDate: string, authToken: string, apiEncryptionKey: string): string {
    // Step 1: Sorting request parameters
    const sortedParams = Object.entries(queryParams).sort(([a], [b]) => a.localeCompare(b));

    // Step 2: Concatenating values
    const concatenatedValues = sortedParams.map(([key, value]) => `${value}`).join('');

    // Step 3: Prepending to signature string
    const requestPart = requestUrl.split(process.env.REACT_APP_BASE_URL + '/api/Base/')[1]; // Extract request part
    const signatureString = `${requestPart}${method}`;

    // Step 4: Appending to signature string
    const signatureWithDateAndToken = `${signatureString}${concatenatedValues}${giftlovDate}${authToken}`;

    // Step 5: Hashing the signature
    const hash = crypto.createHmac('sha512', apiEncryptionKey).update(signatureWithDateAndToken).digest('hex');

    return hash;
}

export const catalog = async (req: Request , res: Response) => {
    try {
        // Retrieve the token and UTC date from the request headers
        const token = req.headers.authorization?.split(' ')[1]; // Using optional chaining
        const giftlovDate = req.headers['X-GIFTLOV-DATE'] as string;

        // Make sure both token and UTC date are present
        if (!token || !giftlovDate) {
            return res.status(400).json({ error: 'Token and UTC date are required.' });
        }

        // Giftlov API Encryption Key
        const apiEncryptionKey = process.env.REACT_APP_API_ENCRYPTION_KEY;

        // Generate signature
        const queryParams = req.query;
        const signature = generateSignature(req.originalUrl, req.method, queryParams, giftlovDate, token!, apiEncryptionKey ?? ""); // Asserting token as string using ! operator

        // Make request to fetch items in the catalog using the token
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Base/items`, {
            headers: {
                'X-GIFTLOV-DATE': giftlovDate,
                'signature': signature,
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        // Send the response from the external API to the client
        res.json(response.data);
    } catch (error) {
        console.error('Catalog failed:', error);
        res.status(500).json({ error: 'Failed to fetch items. Please try again later.' });
    }
}
