
$(function () {
    $("#loginButton").click(function () {
        var userName = $("#userName").val();
        var password = $("#password").val();
        if (userName == "" || password == "") {
            $("#loginMsg").text("用户名或密码不能为空");
            return;
        }
        if (userName == "admin") {
            $.ajax({
                url: "admin/login",
                data: {
                    adminName: userName,
                    password: password
                },
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if (data.msg == "true") {
                        window.location.href = "/admin/adminMain.html";
                    } else {
                        $("#loginMsg").text(data.msg);
                    }
                }
            })
        } else {
            console.log("进入了user")
            $.ajax({
                url: "user/login",
                data: {
                    userName: userName,
                    password: password
                },
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if (data.msg == "true") {
                        window.location.href = "/user/index.html";
                    } else {
                        $("#loginMsg").text(data.msg);
                    }
                }
            })
        }
    })


        $("#registerButton").click(function () {
            var userName = $("#reg_userName").val();
            var password = $("#reg_password").val();
            var confirmPassword = $("#reg_confirmPassword").val();
            var address = $("#reg_address").val();
            if (userName == "") {
                $("#register_msg").text("用户名不能为空")
                return;
            }
            if (password == "") {
                $("#register_msg").text("密码不能为空")
                return;
            }
            if (confirmPassword == "") {
                $("#register_msg").text("确认密码不能为空")
                return;
            }
            if (address == "") {
                $("#register_msg").text("地址不能为空")
                return;
            }
            if (password != confirmPassword) {
                $("#reg_confirmPassword").val("");
                $("#register_msg").text("确认密码与密码不一致,请重新输入")
                return;
            }

            $.ajax({
                url: "user/register",
                data: {
                    userName: userName,
                    password: password,
                    address: address
                },
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if (data.msg == "true") {
                        console.log("注冊成功")
                        window.location.reload();
                    } else {
                        $("#register_msg").text(data.msg);
                    }
                }
            })
        })


        $("#reg_userName,#reg_password,#reg_confirmPassword,#reg_address").blur(function () {

            var id = $(this).attr("id");
            var value = $(this).val();
            if (id == "reg_userName") {
                if (value == "") {
                    $("#register_msg").text("用户名不能为空");
                }
            } else if (id == "reg_password") {
                if (value == "") {
                    $("#register_msg").text("密码不能为空");
                }
            } else if (id == "reg_confirmPassword") {
                if (value == "") {
                    $("#register_msg").text("确认密码不能为空");
                }
                //else if ($("#reg_password").val() != value){
                //     $("#reg_confirmPassword").val("")
                //     $("#register_msg").text("密码不一致");
                // }
            } else if (id == "reg_address") {
                if (value == "") {
                    $("#register_msg").text("地址不能为空");
                }
            }
        })
})