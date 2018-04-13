const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extented: false }))

app.use(express.static('files'))

const conn = require('./src/conn.js');

app.get('/getUser', function (req, res) {
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

app.post('/delUser', function (req, res) {
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

app.get('/profile', function (req, res) {
    var data = 'select * where `id` = "' + req.query.id + '";';
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

app.post('/editSave', function (req, res) {
    var person = req.body;
    person.hobby = person.hobby.join(',')
    var data = 'update  `users` set `username` = "' + person.username + '",`email` = "' + person.email + '",`phone` = "' + person.phone + '",`age` = "' + person.age + '",`sex` = "' + person.sex + '",`adr` = "' + person.adr + '",`hobby` = "' + person.hobby + '" where `id` = "' + person.id + '";';
    conn.query(data,function(err,result){
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
var server = app.listen(86)