import axios from "axios";
import { Response, Request } from "express";
export const loginPos = async (req : Request, res : Response) => {
    console.log("reqbody: ",req.body);
    try {
      const { username, password } = req.body;
      // Verify if username and password are provided
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }

     // Fetch base URL from environment variables
     const baseUrl = process.env.REACT_APP_BASE_URL;

     // Construct complete API URL
     const apiUrl = `${baseUrl}/api/Base/generateToken`;

     // Fetch token from GIFTLOV API
     const response = await axios.post(apiUrl, {
         username,
         password
     });


      // Send the token back to the frontend
      res.json(response.data);
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ error: 'Failed to generate token. Please try again later.' });
    }
  };
