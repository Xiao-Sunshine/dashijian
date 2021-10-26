$(function(){
    var layer=layui.layer;
    getUserIofo();
    // 获取用户基本信息
    function getUserIofo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.code != 0){
                    return layer.msg('获取用户信息失败！    ')
                }
                // 成功之后拿到信息渲染页面
                renderAvatar(res.data);
            }
        })
    }
    // 渲染用户头像
    function renderAvatar(user){
        // 1.获取用户名
        var name= user.nickname || user.username;
        // 2.设置昵称
        $('#welcome').html('欢迎'+name);
        // 3.设置头像
        if(user.user_pic){
            $('.layui-nav-img').attr('src',user.user_pic);
            $('.text-avatar').hide();
        }else{
            $('.layui-nav-img').hide();
            $('.text-avatar').show();
            $('.text-avatar').text(name[0].toUpperCase());
        }
    }
})