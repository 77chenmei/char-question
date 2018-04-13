
const express = require('express');
const app = express();

//使用post方法的时候需要body-parser模块解析数据
const bodyParser = require('body-parser');
//加密模块
const md5 = require('md5');

const multer = require('multer'); //加载multer加载模式
//cookie模块
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

//登录
app.post('/login', require('./src/login.js'));

//给register中的用户名 邮箱 手机号码 是否在存在数据库中
app.post('/regex', require('./src/regex.js'))

//注册
app.post('/register', require('./src/register.js'));
//注册时图片的上传
app.use(multer({
    dest: './tmp' //设置临时目录，临时存放上传文件
}).array('images')); //array()中参数为文件上传的name
app.post('/upload', require('./src/upload.js'));

const conn = require('./src/conn')

// =========== 用户个人中心界面 ===================
// ===== 获取用户个人信息 =====
app.get('/profile/user', (req, res) => {
    const data = 'select * from `users` where `username` = "' + req.query.username + '" and `type` = "' + req.query.type + '";';
    conn.query(data, function (err, result, files) {
        if (err == null) {
            console.log(result)
            res.json({
                error: 0,
                message: '数据查找成功',
                data: result[0],
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '数据查找失败',
                data: result,
                errorInfo: err
            })
        }
    })
});
// ===== 用户修改个人信息 保存 =====
app.post('/profile/saveProfile', (req, res) => {
    const data = 'update `users` set `username ` = "' + req.body.username + '",`age` = "' + req.body.age + '",`sex` = "' + req.body.sex + '",`email` = "' + req.body.email + '",`phone`="' + req.body.phone + '",`realname` = "' + req.body.realname + '",`photo` = "' + req.body.photo + '" where `username` = "' + req.body.username + '",`type` =  "' + req.body.type + '";';
    conn.query(data, function (err, result, files) {
        if (err == null) {
            console.log(result)
            res.json({
                error: 0,
                message: '数据修改成功',
                data: result[0],
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '数据修改失败',
                data: result,
                errorInfo: err
            })
        }
    })
})

// =========== 用户修改密码界面 ===================
// ===== 用户修改密码 保存 =====
app.post('/profile/password', (req, res) => {
    console.log(req.body)
    const data = 'update `users` set `password` = "' + req.body.password + '" where `username` = "' + req.body.username + '" and `type` =  "' + req.body.type + '";';
    conn.query(data, function (err, result) {
        if (err == null) {
            console.log(result)
            res.json({
                error: 0,
                message: '密码修改成功',
                data: result[0],
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '密码修改失败',
                data: result,
                errorInfo: err
            })
        }
    })
})

// =========== 用户管理界面 ===================
// ===== 获取用户信息列表 =====
app.get('/users/getUser', (req, res) => {
    var data = 'select * from `users`;';
    conn.query(data, function (err, result) {
        if (err == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: err
            })
        }
    })
})
// ===== 删除某一用户信息 =====
app.post('/users/delUser', (req, res) => {
    console.log(req.body.id)
    var data = 'delete  from `users` where `id` = "' + req.body.id + '";'
    conn.query(data, function (err, result) {
        if (err == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: err
            })
        }
    })
})
// ===== 获取某一用户信息 =====
app.get('/users/profile', (req, res) => {
    var data = 'select * from `users` where `id` = "' + req.query.id + '";';
    conn.query(data, function (err, result) {
        if (err == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: err
            })
        }
    })
})
// ===== 保存某一用户信息的修改 =====
app.post('/users/editSave', (req, res) => {
    var person = req.body;
    var data = 'update  `users` set `username` = "' + person.username + '", `password` = "' + person.password + '",`sex` = "' + person.sex + '",`age` = "' + person.age + '",`email` = "' + person.email + '",`phone` = "' + person.phone + '",`realname` = "' + person.realname + '",`type` = "' + person.type + '" where `id` = "' + person.id + '";';
    conn.query(data, function (err, result) {
        console.log(result)
        if (err == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: err
            })
        }
    })
})
// ===== 新增某一用户的信息 =====
app.post('/users/addSave', (req, res) => {
    const data = 'insert into `users` (`type`,`username`,`password`,`email`,`phone`,`realname`,`photo`,`sex`,`age`) values ("' + req.body.type + '","' + req.body.username + '","' + req.body.password + '","' + req.body.email + '","' + req.body.phone + '","' + req.body.realname + '","tx.jpg","' + req.body.sex + '","' + req.body.age + '");';
    //链接数据库，添加单一数据选项卡
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})

// =========== 选项管理界面 ===================
// ===== 获取选项列表 =====
app.get('/items', (req, res) => {
    var data = 'select * from `items` ORDER BY `group` ASC;'
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 获取选项组数 =====
app.get('/items/getGroup', (req, res) => {
    conn.query('select `id`,`group` from `items` group by `group`;', (error, result) => {
        if (error == null) {
            var group = Number(result.length);
            res.json({
                error: 0,
                message: '成功',
                data: group,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 删除某一选项卡 =====
app.get('/items/del', (req, res) => {
    var data = 'delete  from `items` where `id` = "' + req.query.id + '";'
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 添加选项 ===== 
/* == 添加新选项卡 == */
app.post('/items/additem', (req, res) => {
    var data = 'insert into `items` (`group`,`item`,`sort`) values ("' + req.body.group + '","' + req.body.value + '","0");';
    //链接数据库，添加单一数据选项卡
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
/* == 添加新选项组 == */
app.post('/items/additems', (req, res) => {
    //获取当前数据的组数
    conn.query('select `id`,`group` from `items` group by `group`;', function (error, result) {
        if (error == null) {
            var group = Number(result.length);
            ///拼接添加数据
            var data = 'insert into `items` (`item`,`group`,`sort`) values';
            for (var i in req.body) {
                data += '("' + req.body[i] + '","' + (group + 1) + '","0"),'
                //组数：比如当前共有5组，则添加的数据则是第6组数据
            }
            data = data.substr(0, data.length - 1) + ';'
            //链接数据库，添加组数据
            conn.query(data, function (error, result) {
                if (error == null) {
                    res.json({
                        error: 0,
                        message: '成功',
                        data: null,
                        errorInfo: null
                    })
                } else {
                    res.json({
                        error: 1,
                        message: '失败',
                        data: null,
                        errorInfo: error
                    })
                }
            })
        }
    })
})
// ===== 选项卡的编辑保存 ===== 
app.post('/items/updateItem', (req, res) => {
    var data = 'update  `items` set `item` = "' + req.body.text + '" where `id` = "' + req.body.id + '";';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 选项卡的查询 ===== 
app.get('/items/selection', (req, res) => {
    var data = 'select * from `items` where `item` = "' + req.query.val + '" or `group` = "' + req.query.val + '";'
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})

// =========== 问卷创建界面 ===================
// ===== 问卷题目 ===== 
app.get('/outlines', (req, res) => {
    var data = 'select `id`,`text`,`pid` from `outlines`;'
    conn.query(data, (error, result) => {
        //分组读取题目
        var dataPa = result.filter((item, index) => {
            var itchildren = result.filter((citem, i) => {
                citem.items = [];
                //返回pid等于父级id的子集
                return citem.pid == item.id;
            })
            if (itchildren.length != 0) {
                item.children = itchildren;
            }
            return item.pid == 0;
        })
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: dataPa,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 问卷选项 ===== 
app.get('/items/getItems', (req, res) => {
    var data = 'select `id`,`item` from `items` where `group` = "' + req.query.group + '";'
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 删除选项 ===== 
app.get('/outlines/delteLeader', (req, res) => {
    var id = req.query.id;
    var pid = req.query.pid;
    if (pid == 0) {
        //删除的是根目录，同时要删除其下子集
        var data = 'delete  from `outlines` where `id` = "' + id + '" or `pid` = "' + id + '";'
    } else {
        //删除的不是根目录
        var data = 'delete  from `outlines` where `id` = "' + id + '";'
    }
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 编辑选项 ===== 
app.get('/outlines/editgroup', (req, res) => {
    var data = 'update  `outlines` set `text` = "' + req.query.text + '" where `id` = "' + req.query.id + '";';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 增加选项 ===== 
/* == 添加新选项卡 == */
app.post('/outlines/addgroup', (req, res) => {
    var addNew = req.body.addNew.split(' '),
        data = 'insert into `outlines` (`text`,`pid`) values'
    addNew.forEach((el) => {
        data += '("' + el + '","' + req.body.id + '"),';
    });
    data = data.substr(0, data.length - 1) + ';';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
/* == 添加新选项组 == */
app.post('/outlines/addgroups', (req, res) => {
    var data = 'insert into `outlines` (`text`,`pid`) values ("' + req.body.leader + '","0");';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result.insertId,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 生成试卷 ===== 
app.post('/outlines/createQ', (req, res) => {
    var data = "insert into `questions` (`tittle`,`content`,`create_id`) values ('" + req.body.tittle + "','" + req.body.question + "','" + req.body.creater + "');";
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})

// =========== 问卷管理界面 ===================
app.get('/questions/getdata', (req, res) => {
    var data = 'select * from `questions` where `create_id` = "' + req.query.creater + '";';
    conn.query(data, (error, result) => {
        if (error == null) {
            if (error == null) {
                res.json({
                    error: 0,
                    message: '成功',
                    data: result,
                    errorInfo: null
                })
            } else {
                res.json({
                    error: 1,
                    message: '失败',
                    data: null,
                    errorInfo: error
                })
            }
        }
    })
})
// ===== 删除某一问卷 =====
app.get('/questions/del', (req, res) => {
    var data = 'delete  from `questions` where `id` = "' + req.query.id + '";'
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 查看某一问卷 =====
app.get('/questions/read', (req, res) => {
    var data = 'select * from `questions` where `id` = "' + req.query.id + '";'
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 删除某一题目 =====
app.get('/questions/delGroup', (req, res) => {
    var data = "update  `questions` set `content` = '" + req.query.content + "' where `id` = '" + req.query.id + "';";
    conn.query(data, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 修改试卷标题 =====
app.get('/questions/changetit',(req,res)=>{
    var data = 'update  `questions` set `tittle` = "' + req.query.tittle + '" where `id` = "' + req.query.id + '";';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
// ===== 修改试卷状态 =====
app.get('/questions/setStatus',(req,res) => {
    var data = 'update  `questions` set `status` = "' + req.query.status + '" where `id` = "' + req.query.id + '";';
    conn.query(data, (error, result) => {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: null,
                errorInfo: null
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: null,
                errorInfo: error
            })
        }
    })
})
app.listen(80);