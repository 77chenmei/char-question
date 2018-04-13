module.exports = function(req,res){
    const conn = require('./conn.js');
    const md5 = require('md5');
    // console.log(req.body)
    //判断用户输入的时手机号 邮箱 用户名
    var loginName = /[@]/.test(req.body.username) ? 'email' : /\D/.test(req.body.username)? 'username' : 'phone';
    console.log(req.body)
    var data = 'select `password` from `users` where `type` =  "'+ req.body.type +'" and `'+ loginName +'` = "'+ req.body.username + '"';
    conn.query(data,function(err,result,files){
        if(err == null){
            if(result == ''){
                res.json({
                    error:1,
                    message:'该用户不存在',
                    data:null,
                    errorInfo:null
                })
            }else if(result[0].password != req.body.password){
                res.json({
                    error:2,
                    message:'密码输入错误，请重新输入',
                    data:null,
                    errorInfo:null
                })
            }else{
                res.cookie('username',req.body.username)
                res.cookie('type',req.body.type)
                res.json({
                    error:0,
                    message:'登录成功',
                    data:null,
                    errorInfo:null
                })
            }
        }else{
            res.json({
                error:3,
                message:'失败',
                data:null,
                errorInfo:err
            })
        } 
    })
}