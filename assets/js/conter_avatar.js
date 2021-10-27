$(function () {
    // 获取裁剪区域的图片
    var image = $('#image');
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'//指定预览区域
    }
    // $.ajax({
    //     type: 'get',
    //     url: '/my/update/avatar',
    //     success: function (res) {
    //         if (res.code != 0) {
    //             return layer.msg('更新头像失败！');
    //         }
    //         layer.msg('更新头像成功！');
    //         window.parent.getUserIofo();
    //     }
    // })
    // 创建裁剪区域
    image.cropper(options);
    $('#selectImg').click(function () {
        $('#file').click();

    })
    var layer = layui.layer;
    $('#file').on('change', function (e) {
        var files = e.target.files;
        if (files.length == 0) {
            return layer.msg('请选择文件!');
        }
        // 取到用户上传的文件
        var file = files[0];
        // 
        var url = URL.createObjectURL(file)
        // 重新初始化裁剪区
        image.cropper('replace', url);
    })
    // 点击上传头像按钮 请求接口
    $('#btnUPload').click(function () {
        var dataUrl = image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100,
        }).toDataURL('image/png');//将canvas画布上的内容 转成 base64格式的字符串
        console.log(dataUrl);
        // 请求后端接口 将base64传过去
        $.ajax({
            method: 'patch',
            url: '/my/update/avatar',
            data: {
                avatar: dataUrl
            },
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('更新头像失败！');
                }
                layer.msg('更新头像成功！');
                window.parent.getUserIofo();
            }
        })
    })

})