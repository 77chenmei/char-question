
module.exports = function(req,res){
    const conn = require('./conn.js');
    const data = 'select * from `users` where `username` = "'+req.query.username+'" and `type` = "'+req.query.type+'";';
    conn.query(data,function(err,result,files){
        if(err == null){
            console.log(result)
            res.json({
                error:0,
                message:'数据查找成功',
                data:result[0],
                errorInfo:null
            })
        }else{
            res.json({
                error:1,
                message:'数据查找失败',
                data:result,
                errorInfo:err
            })
        }
    }) 
}











