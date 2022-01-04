const db = require("../firbaseConfig/config");
var userRef = db.ref("usersSupplier");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const possible =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const itemOperation = {
  signUpUser(obj, res) {
    userRef.once('value',function(list){
        let isUser = false;
        let constUserList = list.val();
        let dataList = [];
        if(list.val() === null){
            var text = "";
            for (var i = 0; i < 12; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            var ciphertext = CryptoJS.AES.encrypt(obj.password, text);

            // var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), text);
            // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            obj.password = ciphertext.toString();
            obj.passCode = text;
            delete obj.confirmPassword;
            userRef.push(obj, (err) => {
            if (err) {
                res.status(300).json({ msg: "User not created", failure:true, error: err });
            } else {
                userRef.once('value',function(listdata){
                let userDataValue = {};
                let dataUserList = [];
                let pushingObject = {}
                Object.keys(listdata.val()).forEach((itemEle,index)=>{
                    pushingObject = listdata.val()[itemEle];
                    pushingObject.key = itemEle
                    dataUserList.push(pushingObject);
                });
                dataUserList.forEach((itemData,index)=>{
                    if(itemData.userName === obj.userName){
                        userDataValue = itemData;
                    }
                });
                res.status(200).json({ msg: "User created successfully.", failure:false, data:userDataValue });
            });
        }
            });
        }else{
            Object.keys(list.val()).forEach((itemEle,index)=>{
                dataList.push(list.val()[itemEle]);
            });
            dataList.forEach((itemData,index)=>{
                if(itemData.userName === obj.userName){
                    isUser = true;
                }
            });
            if(isUser){
                res.status(200).json({ msg: "User already available.", failure:true });
            }else{
                var text = "";
                for (var i = 0; i < 12; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
    
                var ciphertext = CryptoJS.AES.encrypt(obj.password, text);
    
                
                obj.password = ciphertext.toString();
                obj.passCode = text;
                delete obj.confirmPassword;
                userRef.push(obj, (err) => {
                if (err) {
                    res.status(300).json({ msg: "User not created", failure:true, error: err });
                } else {

                    userRef.once('value',function(listdata){
                        let userDataValue = {};
                        let dataUserList = [];
                        let pushingObject = {}
                        Object.keys(listdata.val()).forEach((itemEle,index)=>{
                            pushingObject = listdata.val()[itemEle];
                            pushingObject.key = itemEle
                            dataUserList.push(pushingObject);
                        });
                        dataUserList.forEach((itemData,index)=>{
                            if(itemData.userName === obj.userName){
                                userDataValue = itemData;
                            }
                        });
                        res.status(200).json({ msg: "User created successfully.", failure:false, data:userDataValue });
                    });
                }
                });
            }
        }
        
    })
  },
  signInUser(obj, res) {
    userRef.once('value',function(listdata){
        if(listdata.val() !== null){
        let userDataValue = {};
        let dataUserList = [];
        let pushingObject = {}
        Object.keys(listdata.val()).forEach((itemEle,index)=>{
            pushingObject = listdata.val()[itemEle];
            pushingObject.key = itemEle
            dataUserList.push(pushingObject);
        });
        dataUserList.forEach((itemData,index)=>{
            if(itemData.userName === obj.userName){
                userDataValue = itemData;
            }
        });
        if(Object.keys(userDataValue).length>0){
            var bytes = CryptoJS.AES.decrypt(userDataValue.password, userDataValue.passCode);
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            if(userDataValue.userName === obj.userName && plaintext === obj.password){
                res.status(200).json({ msg: "User found.", data:userDataValue });
            }else{
                res.status(200).json({ msg: "User not found." });
            }
        }else{
            res.status(200).json({ msg: "User not found." });
        }
    }else{
        res.status(200).json({ msg: "User not found." });
    }
    });
  },
  deleteItemFromList(deleteId, res) {
    var idItemRef = db.ref("items/" + deleteId);
    idItemRef.remove();
    res.json({ msg: "deleted item" });
  },
  updateItem(data, res) {
    const entry = itemRef.child(data.key);
    entry.once("value", (snap) => {
      let dataItem = snap.val();
      delete data.key;
      dataItem = { ...dataItem, data };
      entry.update(data);
    });
    res.json({ msg: "update Item" });
  },
};

module.exports = itemOperation;
