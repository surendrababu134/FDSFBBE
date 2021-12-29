const db = require('../firbaseConfig/config');
var restuarantRef=db.ref("restuarants");
var menuRef=db.ref("menu");
const itemOperation={
    addResturant(obj,res){
        // var oneUser=userRef.child(obj.roll);
        restuarantRef.push(obj,(err)=>{
            if(err){
                // res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                // res.status(200).json({"msg":"user created sucessfully"});
            }
        }).then(resp=>{
            const entry = restuarantRef.child(resp.getKey());
            entry.once('value', snap => {
                let dataItem = snap.val();
                dataItem.key = resp.getKey()
                res.status(200).json({"msg":"restuarant created sucessfully",data:dataItem});
            })
        }).catch(err=>{
            res.status(300).json({"msg":"Something went wrong","error":err});
        })
    },
    createMenu(obj,res){
        menuRef.push(obj,(err)=>{
            if(err){
                // res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                // res.status(200).json({"msg":"user created sucessfully"});
            }
        }).then(resp=>{
            const entry = menuRef.child(resp.getKey());
            entry.once('value', snap => {
                let dataItem = snap.val();
                dataItem.key = resp.getKey()
                res.status(200).json({"msg":"menu created sucessfully",data:dataItem});
            })
        }).catch(err=>{
            res.status(300).json({"msg":"Something went wrong","error":err});
        })
    },
    getItemsList(res){
        itemRef.once('value',function(list){
            let itemsList = [];
            let itemObj = list.val();
            Object.keys(list.val()).map((itemEle,index)=>{
                itemObj[itemEle]["key"] = itemEle;
                itemsList.push(itemObj[itemEle])
            });
            res.json({"msg":"completed","data":itemsList})
        })
    },
    deleteItemFromList(deleteId,res){
        var idItemRef=db.ref("items/"+deleteId);
        idItemRef.remove();
        res.json({"msg":"deleted item"})
    },
    updateItem(data,res){
        const entry = itemRef.child(data.key);
        entry.once('value', snap => {
            let dataItem = snap.val();
            delete data.key;
            dataItem = {...dataItem,data}
            entry.update(data)
        })
        res.json({"msg":"update Item"})
    }
}

module.exports=itemOperation;