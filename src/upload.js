const express = require('express');
const fs = require('fs');
const app = express();
const uuidV1 = require('uuid/v1');

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));

 
app.use(express.static('public'))

module.exports = function(req,res){
    var file = req.files[0];
    console.log(file)
    //判断文件是否存在
    if(!file){
        res.send({
            error:1,
            message:'请选择上传的文件'
        })
        return;
    }

    //获取文件后缀名
    var extname = file.originalname.split('.').pop();
    //允许的后缀名
    var allowExtname = ['jpg','png','html'];
    //判断后缀名是否合法
    if(allowExtname.indexOf(extname) < 0){
        res.send({
            error:2,
            message:'后缀名不合法，允许的后缀名' + allowExtname.join()
        })
        return ;
    }
    //限制上传文件的大小
    var size = req.files[0].size; //获取文件的大小 单位字节
    var allowSize = 2 * 1024 * 1024; //允许文件大小2M 转换为字节
    if(size > allowSize){
        res.send({
            error:3,
            message:'文件太大，超过允许2M'
        })
    }

    //随机生成文件名(文件名不重复)
    const name = uuidV1() + '.' + extname;

    //移动文件位置
    fs.rename(__dirname + '/../' + req.files[0].path, __dirname + '/../public/uploads/' + name, function (err) { 
        if(err == null){
            res.send({
                error:0,
                message:'文件上传成功',
                data:name,
                errorInfo:null
            })
        }else{
            res.send({
                error:4,
                message:'文件上传失败',
                data:null,
                errorInfo:err
            })
        }
    })
}

