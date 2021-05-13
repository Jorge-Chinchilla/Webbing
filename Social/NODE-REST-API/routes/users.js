const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//Manejo de usuarios
router.route('/:id')
    //Actualizar un usuario
    .put(async(req, res)=>{
        if(req.body.userId === req.params.id || req.body.isAdmin){
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }catch (e) {
                    return res.status(500).json(e);
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                });
                res.status(200).json("Account updated");
            } catch (e) {
                return res.status(500).json(e);
            }
        }else{
            return res.status(403).json("You can only update your account");
        }
    })
    //Eliminar un usuario
    .delete(async(req, res)=>{
        if(req.body.userId === req.params.id || req.body.isAdmin){
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account deleted");
            } catch (e) {
                return res.status(500).json(e);
            }
        }else{
            return res.status(403).json("You can only delete your account");
        }
    })
    //Obtener un usuario
    .get(async(req, res)=>{
        try{
            const user = await User.findById(req.params.id);
            //destructuramos en un array el objeto, guardando la información que deseamos imprimir en "others"
            const {password, updatedAt, ...other} = user._doc;
            res.status(200).json(other);
        } catch (e) {
            res.status(500).json(e);
        }
    });

//Seguir a un usuario
router.route('/:id/follow')
    .put(async(req,res)=>{
        if(req.body.userId !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if(!user.followers.includes(req.body.userId)){
                    //si el usuario no existe en la lista de seguidores
                    await user.updateOne({$push: {followers: req.body.userId}});
                    await currentUser.updateOne({$push: {following: req.params.id}});
                    res.status(200).json("User has been followed");
                }else{
                    //si el usuario ya existe en la lista de seguidores
                    res.status(403).json("You already follow this user");
                }
            }catch (e) {
                res.status(500).json(e);
            }
        }else{
            res.status(403).json("You can't follow yourself");
        }
    });
//Dejar de seguir a un usuario
router.route('/:id/unfollow')
    .put(async(req,res)=>{
        if(req.body.userId !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if(user.followers.includes(req.body.userId)){
                    //si el usuario no existe en la lista de seguidores
                    await user.updateOne({$pull: {followers: req.body.userId}});
                    await currentUser.updateOne({$pull: {following: req.params.id}});
                    res.status(200).json("User has been unfollowed");
                }else{
                    //si el usuario ya existe en la lista de seguidores
                    res.status(403).json("You don't follow this user");
                }
            }catch (e) {
                res.status(500).json(e);
            }
        }else{
            res.status(403).json("You can't unfollow yourself");
        }
    });


module.exports = router