const route=require('express').Router();
const restuarantOperation=require('../services/restuarants');

route.post('/addRestuarant',(req,res)=>{
    restuarantOperation.addResturant(req.body,res);
})

route.get('/getResturant',(req,res)=>{
    restuarantOperation.getResturant(req.query.userId,res);
})

route.put('/updateResturant',(req,res)=>{
    restuarantOperation.updateResturant(req.body,res);
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