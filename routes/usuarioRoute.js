import express from "express";
import {
    getAllUsers,
    login,
    cadastrar,
} from "../controllers/usuarioController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", login);
router.post("/cadastrar", cadastrar);

export default router;
