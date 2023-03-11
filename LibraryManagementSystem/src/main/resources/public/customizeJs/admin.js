var pages, currentPage = 1;
//select-picker-search-checked
// "<td>" + ele.password + "</td>\n" +
$(function () {
    
    $("#demo2").mySelect();
    var pageSize = parseInt($(".select-picker-search-checked").text());
    page(1, isNaN(pageSize) ? 5 : pageSize, true);
    $("#saveButton").click(function () {
        $("#hidden-username").val("");
        $("#hidden-return").val("");
        var userName = $("#save-username").val();
        var password = $("#save-password").val();
        var address = $("#save-address").val();
        $.ajax({
            url: "/admin/saveUser",
            data: {
                userName: userName,
                password: password,
                address: address
            },
            dataType: "json",
            type: "POST",
            success: function (data) {
                if (data == true) {
                    $("#closeInsertUserModal").click();
                    var pageSize = parseInt($(".select-picker-search-checked").text());
                    page(1, isNaN(pageSize) ? 5 : pageSize, true);
                } else {
                    alert("注册失败,用户名已存在");
                }
            }
        })
    })

    $("#updateButton").click(function () {
        var id = $("#update_id").val();
        $.ajax({
            url: "/admin/updateUser",
            data: {
                id: id,
                userName: $("#update_username").val(),
                password: $("#update_password").val(),
                address: $("#update_address").val()
            },
            dataType: "json",
            type: "POST",
            success: function (data) {
                if (data == true) {
                    $("#closeUpdateModalButton").click();
                    var pageSize = parseInt($(".select-picker-search-checked").text());
                    page(currentPage, isNaN(pageSize) ? 5 : pageSize, true);
                } else {
                    alert("修改失败");
                }
            }
        })
    })

    $("#searchButton").click(function () {
        var search_username = $("#search-username").val();
        var search_return = $("#search-return").val();
        $("#hidden-username").val(search_username);
        $("#hidden-return").val(search_return);
        if (search_return == "" || search_return == "已归还" || search_return == "未归还") {
            $("#returnMsg").text("");
        } else {
            $("#search-return").val("");
            $("#returnMsg").text("是否归还参数不合法,请重新输入!");
            return;
        }
        pageChange(1, pages);
    })

    $(".select-picker-search-checked").bind("DOMNodeInserted", function (e) {
        pageChange(1, pages);
    })

    $("#logOutButton").click(function () {
        window.location.href = "/admin/logout";
    })


})

function updateModal(e, id) {
    $("#update_id").val(id);
    $.ajax({
        url: "/admin/fillUpdateUserModal",
        data: {
            id: id
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                $("#update_username").val(data.userName);
                $("#update_password").val(data.password);
                $("#update_address").val(data.address);
            }
        }
    })
    $('#' + $(e).data('modal-id')).modal();
}

function deleteUser(id) {
    if (!confirm("是否要删除该用户"))
        return;
    $.ajax({
        url: "/admin/deleteUser",
        data: {
            id: id
        },
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data == true) {
                var pageSize = parseInt($(".select-picker-search-checked").text());
                page(currentPage, isNaN(pageSize) ? 5 : pageSize, true);
            } else {
                alert("删除失败");
            }
        }
    })
}

function pageChange(index, pages) {
    currentPage = index;
    var pageSize = parseInt($(".select-picker-search-checked").text());
    var beginIndex = index - 5;
    var endIndex = index + 4;
    if (beginIndex <= 1 || pages <= 10) {
        page(index, isNaN(pageSize) ? 5 : pageSize, true);
        return;
    } else if (endIndex > pages) {
        pagesFill(pages - 9, pages, index);
        page(index, isNaN(pageSize) ? 5 : pageSize);
    } else {
        pagesFill(beginIndex, endIndex, index);
        page(beginIndex, isNaN(pageSize) ? 5 : pageSize);
    }
}

function pagesFill(beginIndex, endIndex, targetIndex) {
    var pageHtml = "";
    for (var index = beginIndex; index <= endIndex; index++) {
        pageHtml += "<li id=page" + (index + 1) + " class=\"page-item " + (index == targetIndex ? " active" : "") + " \">\n" +
            "<a class=\"page-link \" onclick=pageChange(" + index + "," + pages + ") href=\"javascript:void(0); \">" + index + "</a>\n" +
            "</li>"
    }
    $("#pageUl").html(pageHtml);
}


function page(pageNo, pageSize, flag) {
    $("#search-username").val($("#hidden-username").val())
    $("#search-return").val($("#hidden-return").val())
    var realReturnVal = $("#search-return").val();
    if (realReturnVal == "") {
        realReturnVal = -1;
    } else {
        realReturnVal = realReturnVal == "已归还" ? 0 : 1;
    }
    var pageHtml = "";
    var userBodyHtml = "";
    $.ajax({
        url: "/admin/getUserPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            userName: $("#search-username").val(),
            noReturn: realReturnVal
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            
            if (data.total == 0){
                $("#rightItem").css("display","none");
                $("#leftItem").css("display","none");
                $("#totalDiv").css("display","none");
            }else {
                $("#rightItem").css("display","block");
                $("#leftItem").css("display","block");
                $("#totalDiv").css("display","block");
            }
            if (pageNo == 1) {
                $("#left").css("color", "black");
                $("#left").css("cursor", "not-allowed");
                $("#right").css("color", "#007bff");
                $("#right").css("cursor", "");
            } else if (pageNo == data.pages) {
                $("#right").css("color", "black");
                $("#right").css("cursor", "not-allowed");
                $("#left").css("color", "#007bff");
                $("#left").css("cursor", "");
            } else {
                $("#left").css("color", "#007bff");
                $("#left").css("cursor", "");
                $("#right").css("color", "#007bff");
                $("#right").css("cursor", "");
            }
            $("#totalNum").text(data.total);
            $.each(data.dataList, function (index, ele) {
                userBodyHtml += "<tr>\n" +
                    "<td>" + ele.id + "</td>\n" +
                    "<td>" + ele.userName + "</td>\n" +

                    "<td>" + ele.address + "</td>\n" +
                    " <td>" + (ele.noReturn == 0 ? "已归还" : "未归还") + "</td>\n" +
                    " <td>" + ele.joinDateStr + "</td>\n" +
                    " <td  class=\"relative\">\n" +
                    "     <a class=\"action-btn \" href=\"javascript:void(0); \">\n" +
                    "         <svg class=\"default-size \" viewbox=\"0 0 341.333 341.333 \">\n" +
                    "             <g>\n" +
                    "                 <g>\n" +
                    "                     <g>\n" +
                    "                         <path d=\"M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z \"></path>\n" +
                    "                         <path d=\"M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z \"></path>\n" +
                    "                         <path d=\"M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z \"></path>\n" +
                    "                     </g>\n" +
                    "                 </g>\n" +
                    "             </g>\n" +
                    "         </svg>\n" +
                    "     </a>\n" +
                    "     <div class=\"action-option \">\n" +
                    "         <ul>\n" +
                    "             <li>\n" +
                    "                 <a href=\"javascript:void(0); \" onclick=updateModal(this,\'" + ele.id + "\') class=\"click\"\n" +
                    "                    data-modal-id=\"modal-register1\"><i\n" +
                    "                         class=\"far fa-edit mr-2 \"></i>修改</a>\n" +
                    "             </li>\n" +
                    "             <li>\n" +
                    "                 <a href=\"javascript:void(0); \" onclick=deleteUser(\'" + ele.id + "\')><i\n" +
                    "                         class=\"far fa-trash-alt mr-2 \"></i>删除</a>\n" +
                    "             </li>\n" +
                    "         </ul>\n" +
                    "     </div>\n" +
                    " </td>\n" +
                    " </tr>\n"
            })
            if (flag) {
                pages = data.pages;
                for (var index = 0; index < (data.pages < 10 ? data.pages : 10); index++) {
                    pageHtml += "<li id=page" + (index + 1) + " class=\"page-item " + (index + 1 == pageNo ? " active" : "") + " \">\n" +
                        "<a class=\"page-link \" onclick=pageChange(" + (index + 1) + "," + data.pages + ") href=\"javascript:void(0); \">" + (index + 1) + "</a>\n" +
                        "</li>"
                }
                $("#pageUl").html(pageHtml);
            }
            $("#user-body").html(userBodyHtml);
        }
    })

}