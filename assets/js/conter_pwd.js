$(function () {
    var form = layui.form;
    form.verify({
        regpwd: [/^[\S]{6,15}$/, '密码最长是6-15位'],
        userpwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value == $('#old').val()) {
                return "新旧密码不能一样";
            }
        },
        samepwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return "俩次密码不一致";
            }
        }
    })
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
        type: "PATCH",
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            if (res.code != 0) {
                return layer.msg('密码修改失败！');
            }
            layer.msg('密码修改成功！');
            $('.layui-form')[0].reset();
        }
    })
    })
    
})