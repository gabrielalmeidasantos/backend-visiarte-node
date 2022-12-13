import express from "express";
import mongoose from "mongoose";
import router from "./routes/usuarioRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/usuario", router); // aq eu trago as rotas do usuario

mongoose
    .connect(
        "mongodb+srv://visiarte:visiarte@visiarte.pckzwgr.mongodb.net/visiarte?retryWrites=true&w=majority"
    )
    .then(() => app.listen(5000))
    .then(() => console.log("Conectou com o banco"))
    .catch((err) => console.log(err));
