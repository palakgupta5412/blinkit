import express from "express";
import indexRouter from "./Routes/indexRouter.js"
import dotenv from "dotenv";
import('./config/db.js');
import authRouter from "./Routes/auth.js";
import('./config/passport.js')

dotenv.config();
const app = express();

app.use('/',indexRouter);
app.use('/auth',authRouter);

app.listen(3000);