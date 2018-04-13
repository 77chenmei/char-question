module.exports = function(req,res){
    const conn = require('./conn.js');
    const data = 'update `users` set `username ` = "'+req.body.username+'",`age` = "'+req.body.age+'",`sex` = "'+req.body.sex +'",`email` = "'+req.body.email+'",`phone`="'+req.body.phone+'",`realname` = "'+req.body.realname+'",`photo` = "'+req.body.photo+'");';
    conn.query(data,function(err,result,files){
        if(err == null){
            console.log(result)
            res.json({
                error:0,
                message:'数据修改成功',
                data:result[0],
                errorInfo:null
            })
        }else{
            res.json({
                error:1,
                message:'数据修改失败',
                data:result,
                errorInfo:err
            })
        }
    }) 
}