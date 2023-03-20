const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;
    const user = await User.findById(reqUser.id);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    });

    if (!newPhoto) {
        res.status(422).json({ errors: ["Ocorreu um erro desconhecido ao adicionar foto."] });
        return;
    }

    res.status(201).json(newPhoto);
}

const deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req.user;

        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada."] });
            return;
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(404).json({ errors: ["A foto não pôde ser deletada pois não pertence ao usuário atual."] });
            return;
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." });
    } catch (error) {
        res.status(422).json({ errors: ["Ocorreu um erro desconhecido ao deletar foto."] });
    }
}

const getUserPhotos = async (req, res) => {
    const { id } = req.params;

    const photos = await Photo.find({ userId: id }).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();
    return res.status(200).json(photos);
}

const getPhotoById = async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] });
        return;
    }

    res.status(200).json(photo);
}

const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;

    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] });
        return;
    }

    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ["A foto não pôde ser editada pois não pertence ao usuário atual."] });
        return;
    }

    if (title) {
        photo.title = title;
    }

    await photo.save();
    res.status(422).json(photo)
}

const likePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] });
        return;
    }

    if (photo.likes.includes(reqUser._id)) {
        const idx = photo.likes.indexOf(reqUser._id);
        photo.likes.splice(idx, 1);
    } else {
        photo.likes.push(reqUser._id);
    }

    photo.likes.push(reqUser._id);
    photo.save();
    res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida." });
}

const commentPhoto = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] });
        return;
    }

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment);

    await photo.save();

    res.status({ comment: userComment, message: "Comentário adicionado com sucesso!" })
}

const searchPhotos = async (req, res) => {
    const  {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

    res.status(200).json(photos);
}


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
};
