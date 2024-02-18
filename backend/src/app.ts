import express from 'express';
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
const catalogRouter = require("../src/modules/catalog/routes/catalog.routes");
app.use(`/api/auth`,authRouter.router);
app.use(`/api/catalog`,catalogRouter.router);
const PORT = process.env.PORT || 4000;



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
