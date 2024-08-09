import cors from "cors";
import Axios from "axios";
import express, { json } from "express";
import compilerroutes from "./routes/codeCompileRoute.js";
import questionroutes from "./routes/questionRoute.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const PORT = 8000;
connectDB();

app.use(cors());
app.use(json());

app.use('/api/compiler', compilerroutes);
app.use('/api/question', questionroutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
