const route=require('express').Router();
const userOperation=require('../services/usersCrud');

route.post('/signUp',(req,res)=>{
    userOperation.signUpUser(req.body,res);
})

route.post('/signIn',(req,res)=>{
    userOperation.signInUser(req.body,res);
})

route.post('/forgetPassword',(req,res)=>{
    userOperation.forgetPassword(req.body,res)
})

// route.put('/updateItem',(req,res)=>{
//     itemOperation.updateItem(req.body,res)
// })

module.exports=route;