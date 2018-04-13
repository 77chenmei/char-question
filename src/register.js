module.exports = function(req,res){
  console.log(req.body);
   const conn = require('./conn');
   const data = 'insert into `users` (`type`,`username`,`password`,`email`,`phone`,`realname`,`photo`) values ("'+req.body.type+'","'+ req.body.username+'","'+ req.body.password +'","'+ req.body.email +'","'+ req.body.phone +'","' + req.body.realname +'","'+ req.body.photo +'");';
   conn.query(data,function(err,result,files){
       if(err == null){
            res.json({
               error:0,
               message:'注册成功',
               data:null,
               errorInfo:null
            })
       }else{
            res.json({
                error:1,
                message:'注册失败',
                data:null,
                errorInfo:err
            })
       }
   }) 

}