module.exports = function(req,res){
    const reqBody = req.body;
    const conn = require('./conn.js');
    var type = reqBody.type,
        inpName = reqBody.inpName,
        val = reqBody[inpName];
        console.log(type,inpName,val)
    const data = 'select * from `users` where `' + inpName + '` ="' + val + '" and `type` = "'+ type +'";';
    conn.query(data,function(err,result,file){
        console.log(result == '')
        if(result == ''){
            res.json(true)
                //{
                
                // error:0,
                // message:'未注册',
                // data:null,
                // errorInfo:null
           // }
        }else{
            res.json(false)
            // res.json({
            //     error:1,
            //     message:'已注册',
            //     data:null,
            //     errorInfo:null
            // })
        }
    })
}