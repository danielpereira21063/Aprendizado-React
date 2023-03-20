const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

//Generate usee token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({ erros: "Usuário ou senha incorretos." });
        return;
    };


    if (!(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ erros: "Usuário ou senha incorretos." });
        return;
    }

    res.status(201).json({
        _id: user.id,
        profileImage: user.profileImage,
        token: generateToken(user.id)
    });
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize um outro-email."] });
        return;
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro desconhecido. Por favor, tente mais tarde."] });
        return;
    }

    res.status(201).json({
        _id: newUser.id,
        token: generateToken(newUser.id)
    });
}

const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

const update = async (req, res) => {
    const { name, password, bio } = req.body;
    let profileImage = null;

    if (req.file) {
        profileImage = req.file.fileName;
    }

    const reqUser = req.user;
    const user = await User.findById(reqUser._id).select("-password");

    if (name) {
        user.name = name;
    }

    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio;
    }

    await user.save();

    res.status(200).json(user);
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado."] });
        return;
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}