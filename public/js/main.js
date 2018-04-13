const demo = {};
//index 首页
demo.index = {
    init: function () {
        if (Cookies.get('username')) {
            $('.login2').hide();
            $('#username span').text(Cookies.get('username'));

            $.get('/profile', {
                username: Cookies.get('username'),
                tablename: Cookies.get('type'),
            }, function (res) {
                console.log(res)
            })
        } else {
            $('.login1').hide();
        }
    }(),
    //点击导航栏中的标签，相对应的模块加载到首页content div中去
    jump: function (page) {
        $.get('./' + page + '.html', function (res) {
            $('#content').html(res)
        })
        if (page == 'profile') {
            // demo.profile.init();
        }
    },
    //点击注销，清除cookie
    logOut: function logOut() {
        Cookies.remove('username');
        location.reload();
    }
}
// demo.index.init();

//登录页面
demo.login = {
    log: function (demo) {
        var typeName = demo.split('_').shift(),
            username = $('#' + demo + ' input[type=text]').val(),
            password = $('#' + demo + ' input[type=password]').val();
        $.post('/login', {
            dataName: typeName,
            userName: username,
            passWord: password,
        }, function (res) {
            console.log(res);
            if (res.error == 3) {
                //错误3 表示服务器报错
            } else if (res.error == 1) {
                //错误1 表示用户名不存在
                alert(res.message)
                $('#' + demo)[0].reset();  // logfrm.reset();
                $('#' + demo + '.username').focus();
            } else if (res.error == 2) {
                //错误2 表示用户密码输入错误
                alert(res.message)
                $('#' + demo + '.password').val('').focus();
            } else {
                //错误0 表示登录成功
                if (typeName == 'student') {
                    location.href = './index.html';
                }

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

//个人信息页面--------------------------------------------------
demo.profile = {
    init: function () {
        console.log(Cookies.get('username'))

        console.log($('#profile_frm'))
        // $.get('/profile',{
        //     username:Cookies.get('username'),
        //     tablename:Cookies.get('tableName'),
        // },function(res){
        //     if(res.error == 0){
        //         for(var prop in res.data){
        //             profile_frm[prop] = res.data[prop]
        //         }
        //         console.log(res.data)
        //     }else{
        //         console.log(res.errorInfo)
        //     }
        // })
    }
}

//获取profile_frm 中的nameinput

$('#username').click(function () {
    // console.log(profile_frm)
    // var proname = $('#profile_frm').find('[name]');
    // console.log(proname)

    $.get('/profile', {
        username: Cookies.get('username'),
        tablename: Cookies.get('tableName'),
    }, function (res) {
        var data = res.data;
        if (res.error == 0) {
            profile_frm.username.value = data.username;
            profile_frm.email.value = data.email;
            profile_frm.phone.value = data.phone;
            profile_frm.realname.value = data.realname;
            // profile_frm.partment.value = data.partment;
        } else {
            console.log(res.errorInfo)
        }
    })
})

var bus = new Vue();
//个人中心
var vm = new Vue({
    el: '#box',
    data: {
        person: {
            username: '',
            email: '',
            phone: '',
            filename: '',
            age: '',
            sex: '',
            realname: ''
        }
    },

    create() {
        bus.$on('temp2Event', (value) => {
            console.log(value)
            this.person = value;
        })
    },
    methods: {
        jump(page) {
            $.get('./' + page + '.html', (res) => {
                $('#content').html(res)
                switch (page) {
                    case 'profile':
                        this.profile()
                        break;
                }
            })
        },
        profile() {
            $.get('/profile', {
                username: Cookies.get('username'),
                tablename: Cookies.get('tableName'),
            }, (res) => {
                if (res.error == 0) {
                    bus.$emit('temp2Event', res.data)
                    this.person = res.data;
                } else {
                    console.log(res.errorInfo)
                }
            })
        }
    },
})
