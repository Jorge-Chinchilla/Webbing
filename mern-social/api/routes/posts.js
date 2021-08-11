const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.route("/")
    //Crear publicación
    .post(async(req,res)=>{
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }catch (e) {
            res.status(500).json(e);
        }
    });
//Actualizar publicación
router.route("/:id")
    //Obtener publicación
    .get(async (req, res)=>{
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }catch (e) {
            res.status(500).json(e);
        }
    })
    .put( async (req, res)=>{
        try {
            const post = await Post.findById(req.params.id);
            if(post.userId === req.body.userId){
                await post.updateOne({$set:req.body});
                res.status(200).json("Post updated");
            }else{
                res.status(403).json("You can only update your posts");
            }
        } catch (e) {
                res.status(500).json(e);
        }
    })
    //Eliminar publicación
    .delete( async (req, res)=>{
        try {
            const post = await Post.findById(req.params.id);
            if(post.userId === req.body.userId){
                await post.deleteOne();
                res.status(200).json("Post deleted");
            }else{
                res.status(403).json("You can only delete your posts");
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

//Like y dislike publicación
router.route("/:id/like")
    .put(async (req, res)=>{
        try {
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push: {likes:req.body.userId}});
                res.status(200).json("The post has been liked");
            } else{
                await post.updateOne({$pull:{likes: req.body.userId}});
                res.status(200).json("The post has been disliked");
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

//Obtener el feed
router.route("/timeline/:userId")
    .get(async (req, res)=>{
        try {
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.following.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.status(200).json(userPosts.concat(...friendPosts))
        } catch (err) {
            res.status(500).json(err);
        }
    });

//Obtener el feed de un usuario
router.route("/profile/:username")
    .get(async (req, res)=>{
        try {
            const user = await User.findOne({username:req.params.username});
            const posts = await Post.find({userId:user._id});
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;