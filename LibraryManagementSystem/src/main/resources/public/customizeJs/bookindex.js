var pages, currentPage = 1;
$(function () {
    fillTypeBody();
    page(1, 5, true);
    $("#searchButton").click(function () {
        var search_bookName = $("#search-bookName").val();
        $("#hidden-bookName").val(search_bookName);
        page(1, 5, true, $("#hidden-cid").val());
    })

    $("#allButton").click(function () {
        $("#hidden-cid").val("");
        page(1, 5, true);
    })


})

function borrowBook(e,id) {
    if ($(e).val() == "已借阅"){
        return;
    }
    $.ajax({
        url: "/book/borrowBook",
        data: {
            uid: $("#hidden-uid").val(),
            bid: id
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data.status == "true"){
                $(e).val("已借阅");
                $(e).css("background-color","gray");
                $(e).css("cursor","not-allowed");
            }else {
                alert(data.msg);
            }
        }
    })
}


function fillTypeBody() {
    var typeBodyHtml = "";
    $.ajax({
        url: "/book/getAllType",
        dataType: "json",
        type: "GET",
        success: function (data) {
            $.each(data, function (index, ele) {
                typeBodyHtml += "<a href=\"#\" onclick=page(1,5,true,\'" + ele.id + "\')><div class=\"type\">" + ele.category + "</div></a>";
            })
            $("#bookTypeBody").html(typeBodyHtml);
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


function page(pageNo, pageSize, flag, id) {
    if (id != undefined) {
        $("#hidden-cid").val(id);
    }
    var pageHtml = "";
    var bookBodyHtml = "";
    $("#search-bookName").val($("#hidden-bookName").val());
    $.ajax({
        url: "/book/getBookPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            categoryId: id == '' ? undefined : id,
            bookName: $("#search-bookName").val()
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data.total == 0) {
                $("#rightItem").css("display", "none");
                $("#leftItem").css("display", "none");
                $("#totalDiv").css("display", "none");
            } else {
                $("#rightItem").css("display", "block");
                $("#leftItem").css("display", "block");
                $("#totalDiv").css("display", "block");
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
                var statusHtml = "";
                $.ajax({
                    async:false,
                    url: "/book/isBorrowBook",
                    data: {
                        uid: $("#hidden-uid").val(),
                        bid: ele.id
                    },
                    dataType: "json",
                    type: "GET",
                    success: function (data) {
                        if (data == true){
                            statusHtml = "<input onclick=borrowBook(this,\'" + ele.id + "\') type=\"button\" class=\"btn1\" value=\"借阅\" style=\"margin-top:0px;\">";
                        }else {
                            statusHtml = "<input onclick=borrowBook(this,\'" + ele.id + "\') type=\"button\" class=\"btn1\" value=\"已借阅\" style=\"margin-top:0px;background-color: gray;cursor: not-allowed\">";
                        }
                    }
                })

                bookBodyHtml += "<div class=\"nei\">\n" +
                    "<a href=/book/detail.html/" + ele.id + ">\n" +
                    "    <img src=\"../image/lryh.png\" style=\"background-size:contain;\" width=\"128\" class=\"im\" height=\"160\">\n" +
                    "</a>\n" +
                    "<div class=right>\n" +
                    "    <a href=/book/detail.html/" + ele.id + ">\n" +
                    "        <div style=\"float: left; font-weight: 600; margin-top: 17px; font-size: 20px; width: 100%;\">\n" +
                    "            " + ele.bookName + "\n" +
                    "        </div>\n" +
                    "    </a>\n" +
                    "    <div class=zi>作者：" + ele.author + "</div>\n" +
                    "    <div class=zi>出版日期：" + ele.publicationDate + "</div>\n" +
                    "    <div class=zi style=\" line-height: 1.5em;\">简介:&nbsp;&nbsp;" + ele.profile + "</div>\n" +
                    "    <div class=zi>关键词:&nbsp;&nbsp;" + ele.bookName + statusHtml + "</div>\n" +
                    "</div>\n" +
                    "</div>";
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
            $("#bookBody").html(bookBodyHtml);
        }
    })
}


