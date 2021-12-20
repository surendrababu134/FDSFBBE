const route=require('express').Router();
const itemOperation=require('../services/itemCrud');

route.post('/addItem',(req,res)=>{
    itemOperation.addItem(req.body,res);
})

route.get('/getItems',(req,res)=>{
    itemOperation.getItemsList(res);
})

route.get('/deleteItem/:id',(req,res)=>{
    itemOperation.deleteItemFromList(req.params.id,res)
})

route.put('/updateItem',(req,res)=>{
    itemOperation.updateItem(req.body,res)
})

module.exports=route;