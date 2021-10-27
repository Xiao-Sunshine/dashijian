$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6位之间!"
            }
        }
    })
    getUserIofo();
    // 获取用户基本信息
    function getUserIofo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('getUserIofo', res.data);
            }
        })
    }
    // 重置按钮注册点击事件
    $('#reset').click(function (e) {
        e.preventDefault();
        getUserIofo();
    })
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'put',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('用户信息更新成功！');
                parent.getUserIofo();
            }
        })
    })
})