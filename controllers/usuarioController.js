import User from "../model/Usuario.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(404).json({
            message: "Nenhum usuario encontrado",
        });
    }

    return res.status(200).json(users);
};

export const cadastrar = async (req, res) => {
    var {
        nome_usuario,
        nome_completo,
        bio,
        email,
        senha,
        data_nascimento,
        foto_perfil,
        foto_capa,
        quant_seguindo,
        quant_seguidores,
    } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (existingUser) {
        return res.status(400).json({ message: "Usuario já cadastrado!" });
    }
    senha = bcrypt.hashSync(senha);

    const usuario = {
        nome_usuario,
        nome_completo,
        bio,
        email,
        senha,
        data_nascimento,
        foto_perfil,
        foto_capa,
        quant_seguindo,
        quant_seguidores,
    };

    const user = new User(usuario);

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json(usuario);
};

export const login = async (req, res) => {
    const { usuarioLogin, senha } = req.body;

    let existingUserUsername;
    let existingUserEmail;

    try {
        existingUserUsername = await User.findOne({
            nome_usuario: usuarioLogin,
        });
    } catch (error) {
        return console.log(error);
    }

    try {
        existingUserEmail = await User.findOne({ email: usuarioLogin });
    } catch (error) {
        return console.log(error);
    }

    if (!existingUserEmail && !existingUserUsername) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    if (existingUserEmail) {
        const isPasswordCorrect = bcrypt.compareSync(
            senha,
            existingUserEmail.senha
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ mensagem: "Senha incorreta!" });
        }

        return res.status(200).json(JSON.stringify(existingUserEmail));
    }

    if (existingUserUsername) {
        const isPasswordCorrect = bcrypt.compareSync(
            senha,
            existingUserUsername.senha
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Senha incorreta!" });
        }

        return res.status(200).json(existingUserUsername);
    }
};
