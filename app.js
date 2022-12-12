import express from "express";
import mongoose from "mongoose";
import router from "./routes/usuarioRoute";
import cors from "cors";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

app.use("/api/usuario", router); // aq eu trago as rotas do usuario
mongoose
    .connect(
        "mongodb+srv://visiarte:visiarte@visiarte.pckzwgr.mongodb.net/visiarte?retryWrites=true&w=majority"
    )
    .then(() => app.listen(5000))
    .then(() => console.log("Conectou com o banco"))
    .catch((err) => console.log(err));
