var pages, currentPage = 1;
$(function () {

    
    page(1, 10, true);
    $("#searchButton").click(function () {
        var search_action = $("#search-action").val();
        var search_bookName = $("#search-bookName").val();
        var typeFlag = false;
        $("#hidden-action").val(search_action);
        $("#hidden-bookName").val(search_bookName);
        $.each($("#typelist").children("option"), function () {
            if (search_action == "" || search_action == $(this).text()) {
                typeFlag = true;
            }
        })
        if (!typeFlag) {
            $("#search-action").val("");
            $("#returnMsg").text("行为参数不合法,请重新输入!");
            return;
        }
        $("#returnMsg").text("");
        pageChange(1, pages);
    })

    $("#logOutButton").click(function () {
        window.location.href = "/admin/logout";
    })

})



function deleteBorrowLog(id) {
    if (!confirm("是否要删除该日志信息"))
        return;
    $.ajax({
        url: "/borrowlog/deleteBorrowLog",
        data: {
            id: id
        },
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data == true) {
                page(currentPage, 10, true);
            } else {
                alert("删除失败");
            }
        }
    })
}

//selectPickerWrapper
function pageChange(index, pages) {
    currentPage = index;
    var pageSize = parseInt($(".select-picker-search-checked").text());
    var beginIndex = index - 5;
    var endIndex = index + 4;
    if (beginIndex <= 1 || pages <= 10) {
        page(index, isNaN(pageSize) ? 5 : pageSize, true);
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
    var pageHtml = "";
    var borrowLogBodyHtml = "";
    $("#search-action").val($("#hidden-action").val())
    $("#search-bookName").val($("#hidden-bookName").val())
    $.ajax({
        url: "/borrowlog/getBorrowLogPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            action: $("#search-action").val(),
            bookName: $("#search-bookName").val()
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
                borrowLogBodyHtml += "<tr>\n" +
                    "<td>"+ele.id+"</td>\n" +
                    "<td>"+ele.userName+"\n" +
                    "</td>\n" +
                    "<td>"+ele.bookName+"</td>\n" +
                    "<td>"+ele.recordTimeStr+"</td>\n" +
                    "<td>"+ele.action+"</td>\n" +
                    "<td class=\"relative\">\n" +
                    "    <a class=\"action-btn \" href=\"javascript:void(0); \">\n" +
                    "        <svg class=\"default-size \" viewbox=\"0 0 341.333 341.333 \">\n" +
                    "            <g>\n" +
                    "                <g>\n" +
                    "                    <g>\n" +
                    "                        <path d=\"M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z \"></path>\n" +
                    "                        <path d=\"M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z \"></path>\n" +
                    "                        <path d=\"M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z \"></path>\n" +
                    "                    </g>\n" +
                    "                </g>\n" +
                    "            </g>\n" +
                    "        </svg>\n" +
                    "    </a>\n" +
                    "<div class=\"action-option \">\n" +
                    "<ul>\n" +
                    "<li>\n" +
                    "</li>\n" +
                    "<li>\n" +
                    "<a href=\"javascript:void(0); \" onclick=deleteBorrowLog(\'" + ele.id + "\')><i class=\"far fa-trash-alt mr-2 \"></i>删除</a>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
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

            $("#borrowLogBody").html(borrowLogBodyHtml);
        }
    })
}


