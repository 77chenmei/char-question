
<script>
//设置默认头像
$('#fileImage').prop('src','./img/tx.jpg');
//改变图片
$('#filename').change(function(){
    $('#fileImage').prop('src','./img/tx.jpg'); 
})



function uploads(){
    var formData = new FormData();
    formData.append('images',filename.files[0]);
    $.ajax({
        url:'/upload',
        type:'post',
        cache:false,
        processData:false,
        contentType:false,
        data:formData,
        success:function(result){
            if(result.error == 0){
                $('#fileImage').prop('src','./img/' + result.data);
            }
        }
    })
}
//上传头像
// $('#filename').change(function(){
//     console.log('./img/' + $('#filename'))
//     $('#fileImage').prop('src','./img/' + $('#filename').val());
// })
/*
var uploader = WebUploader.create({
    swf: './webuploader/Uploader.swf',
    server: '/upload',
    pick: '#file',
    resize: false,
    // accept:{
    //     extensions: 'gif,jpg,jpeg,bmp,png',
    //     mimeTypes: 'image/*'
    // },
    thumb:{
        allowMagnify: true,
    },
    fileNumLimit:1,
    fileSingleSizeLimit:1*1024*1024, 
});
uploader.on('fileQueued', function (file) {
  //  $('#file').append(`<div class = "progress"></div>`);

    uploader.makeThumb(file, function (error, src) {
        //console.log(src)
       // console.log(src.split('/').pop())
        if (!error) {
            $('#fileImage').prop('src',src);
            console.log( $('#fileImage').prop('src'))
        }
    }, 100, 100)
})

// uploader.on('uploadProgress', function (file, per) {
//     //同一个文件上传自动屏蔽
//     $('#file .progress').html('<progress value = "0" max = "1"></progress>');
//     $('#file progress').prop('value', per)
// })

// uploader.on('uploadSuccess', function (file) {
//     $('#file .progress').html('已上传');
// });

// uploader.on('uploadError', function (file) {
//     $('#file .progress').text('上传出错');
// });

// uploader.on('uploadComplete', function (file) {
//     $('##file').fadeOut();
// });

*/   
