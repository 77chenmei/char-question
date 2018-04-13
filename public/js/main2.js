const demo = {};


//登录页面
demo.login = {
    log: function () {
        var username = student_login.username.value,
            password = student_login.password.value,
            type = student_login.type.value;
        $.post('/login', {
            type: type,
            username: username,
            password: password,
        }, function (res) {
            console.log(res);
            if (res.error == 3) {
                //错误3 表示服务器报错
            } else if (res.error == 1) {
                //错误1 表示用户名不存在
                alert(res.message)
                $('#student_login')[0].reset();  // logfrm.reset();
                $('#student_login .username').focus();
            } else if (res.error == 2) {
                //错误2 表示用户密码输入错误
                alert(res.message)
                $('#student_login .password').val('').focus();
            } else {
                //错误0 表示登录成功
                location.href = './index.html';
            }
        })

    }
}

//注册页面
demo.register = {
    file_img: 'tx.jpg',
    changeImage: function () {
        //模仿表单对象打包数据
        var newFrm = new FormData();
        newFrm.append('images', filename.files[0]); //以files的方式获取数据
        console.log(newFrm)
        $.ajax({
            url: '/upload', //通过url提交数据
            type: 'post',
            cache: false,
            data: newFrm,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.error == 0) {
                    //文件上传成功，重新设置头像
                    $('#fileImage').prop('src', './uploads/' + result.data);
                    demo.register.file_img = result.data;
                } else {
                    console.log(result.errorInfo);
                }
            }
        })
    }
}