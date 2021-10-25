$(function () {
    // 导入layui提示框
    var layer = layui.layer;
    // 点击去注册链接 注册页展示
    $('#link_reg').click(function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').click(function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 从 layui 对象中获取 form
    var form = layui.form;
    form.verify({
        regpwd: [/^[\S]{6,15}$/, '密码最长是6-15位'],
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return "俩次密码不一致";
            }
        }
    })
    //监听表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val(),
            repassword: $('#form_reg input[name=repassword]').val()
        }
        // 发送post请求
        $.post('/api/reg', data, function (res) {
            if (res.code != 0) {
                return layer.msg(res.message);;
            }
            layer.msg('注册成功');
            $('#link_login').click()
        })
    })
    //监听登录按钮
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg input[name=username]').val(),
            password: $('#form_reg input[name=password]').val(),
        }
        // 发送post请求
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg(res.message);;
                }
                layer.msg('登录成功');
                // 将登录成功之后得到 token 字符串 ，存在localStorage
                localStorage.setItem("token", res.token);
                // 跳转到首页
                location.href='./index.html'
                        }
        })
    })
})