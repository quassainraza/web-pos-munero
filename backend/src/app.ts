import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';



const app = express();

app.use(bodyParser.json());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
const authRouter = require ("../src/modules/auth/routes/auth.routes");
app.use(`/api/auth`,authRouter.router);
const PORT = process.env.PORT || 4000;



//app.use(cors(corsOptions)); // Use the cors middleware with the options
let authToken: string | null = null;



// Endpoint to handle user login

// Middleware to check if token is available
const checkToken = (req: Request, res: Response, next: Function) => {
  if (!authToken) {
    res.status(401).json({ error: 'Authorization token not available. Please try again later.' });
  } else {
    next();
  }
};


(async () => {
    try {
     // await fetchToken();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  })();
