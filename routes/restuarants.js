const route=require('express').Router();
const restuarantOperation=require('../services/restuarants');

route.post('/addRestuarant',(req,res)=>{
    restuarantOperation.addResturant(req.body,res);
})

route.post('/menu',(req,res)=>{
    restuarantOperation.createMenu(req.body,res);
})

route.post('/forgetPassword',(req,res)=>{
    restuarantOperation.forgetPassword(req.body,res)
})

// route.put('/updateItem',(req,res)=>{
//     itemOperation.updateItem(req.body,res)
// })

module.exports=route;