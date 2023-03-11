$(function () {

    borrowStaus();

    $("#borrowButton").click(function () {
        if ($("#borrowButton").val() == "已借阅") {
            return;
        }
        $.ajax({
            url: "/book/borrowBook",
            data: {
                uid: $("#uid").val(),
                bid: $("#bid").val()
            },
            dataType: "json",
            type: "GET",
            success: function (data) {
                if (data.status == "true") {
                    $("#borrowButton").val("已借阅");
                    $("#borrowButton").css("background-color", "gray");
                    $("#borrowButton").css("cursor", "not-allowed");
                } else {
                    alert(data.msg);
                }
            }
        })
    })
})


function borrowStaus(){
    $.ajax({
        url: "/book/isBorrowBook",
        data: {
            uid: $("#uid").val(),
            bid: $("#bid").val()
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data == false){
                $("#borrowButton").val("已借阅");
                $("#borrowButton").css("background-color", "gray");
                $("#borrowButton").css("cursor", "not-allowed");
            }
        }
    })
}