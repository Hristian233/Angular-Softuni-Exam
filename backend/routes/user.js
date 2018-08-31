const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const router = express.Router();

router.post('/signup', (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
        .then(hash =>{
            const user = new User({
                email: req.body.email,
                password: hash,
                roles: ['ROLE_USER']
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error:err
                    })
                })
        });
});

router.post('/login', (req,res,next)=>{
    let fetchedUser;
    User.findOne({ email: req.body.email}).then(user =>{
        if(!user){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        fetchedUser = user;
        console.log(user);
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_should_be_longer', { expiresIn: "1h"});
        console.log(token);
        res.status(200).json({
            token:token,
            user:fetchedUser
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            message: 'Auth failed'
        });
    });
});

router.get('/all', (req,res,next)=>{
    User.find({}).then(users=>{
        res.status(200).json(users)
    })
})

router.delete('/:id', (req,res,next)=>{
    User.findByIdAndRemove(req.params.id)
        .then((response)=>{
            res.status(200).json({response});
        })
        .catch(()=>{
            res.status(500).json({
                message: 'Deletion unsuccessfull'
            })
        })
    // console.log(req.params._id);
})

module.exports = router;