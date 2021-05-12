const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.route('/')
    .get((req,res) => {
        res.send("Hey its auth route");
    });

//Registrar
router.route('/register')
    .post(async (req,res)=>{

        try {
            //generar una contraseña encriptada
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            //crear nuevo usuario
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            });
            //guardar usuario y retornar una respuesta
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err){
            res.status(500).json(e);
        }
    });

//Login
router.route('/login')
    .post( async (req, res)=>{
        try {
            //Buscamos el email
            const user = await User.findOne({email:req.body.email});
            !user && res.status(404).send("User not found");
            //manejamos una contraseña valida
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword && res.status(400).json("Wrong password");
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    })


module.exports = router