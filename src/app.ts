import express, { Application, Response, Request } from "express";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import apiRouter from "./routes/api";
import dotenv from "dotenv";
import dbInit from "./db/init";

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/api", apiRouter);

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        code: 200,
        message: `Server working. Endpoints available at http://${HOST}:${PORT}/api/`
    });
});

try{
    dbInit();

    app.listen(PORT || 3000, () => {
        console.log(`Server running on ${PORT}...`);
    });
}catch(e){
    console.log(`App: Error ${e}`);
}