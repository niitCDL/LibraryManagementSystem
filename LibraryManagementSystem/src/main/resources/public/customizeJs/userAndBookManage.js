var pages, currentPage = 1, total, pageSize;
$(function () {

    fillTypeList();

    $("#logOutButton").click(function () {
        window.location.href = "/admin/logout";
    })

    pageSize = parseInt($(".select-picker-search-checked").text());
    page(1, isNaN(pageSize) ? 5 : pageSize, true);
    total = $("#totalNum").val();
    page2(1, 3);

    $("#searchButton").click(function () {
        $("#hidden-bookName").val($("#search-bookName").val());
        $("#hidden-status").val($("#search-status").val());
        $("#hidden-category").val($("#search-category").val());
        pageChange(1, pages);
    })

    $(".select-picker-search-checked").bind("DOMNodeInserted", function (e) {
        pageChange(1, pages);
    })


})

function fillTypeList() {
    var typeListHtml = "";
    $.ajax({
        url: "/book/fillTypeList",
        dataType: "json",
        type: "GET",
        success: function (data) {
            $.each(data, function (index, ele) {
                typeListHtml += "<option class=kind-" + ele.category + " id=" + ele.id + ">" + ele.category + "</option>"
            })
            $("#typelist2").html(typeListHtml);
        }
    })
}

function returnBook(id) {
    $.ajax({
        url: "/book/returnBook",
        data: {
            id: id
        },
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data == true) {
                page2(1, 3);
                pageChange(1, pages);
            } else {
                alert("归还失败")
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

function page2(pageNo, pageSize) {
    var noReturnBodyHtml = "";
    $.ajax({
        url: "/borrow/getNoReturnBookPage",
        data: {
            uid: $("#hidden-uid").val()
        },
        dataType: "json",
        type: "GET",
        success: function (data) {

            $.each(data.dataList, function (index, ele) {
                noReturnBodyHtml += "<tr>\n" +
                    "<td>" + ele.id + "</td>\n" +
                    "<td>\n" +
                    "<div class=\"full-screen-portfolio\" id=\"portfolio\">\n" +
                    "<div class=\"container-fluid\">\n" +
                    "<div class=\"portfolio-item\">\n" +
                    "<a href=\"../image/BEFCE12138317B9AD0E7D69968C69463.jpg\"\n" +
                    "data-lightbox=\"../image-1\">\n" +
                    "<div class=\"thumb\">\n" +
                    "<div id=\"img1\" class=\"../image\">\n" +
                    "<img src=\"../image/BEFCE12138317B9AD0E7D69968C69463.jpg\"\n" +
                    "width=\"50\">\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "<td>" + ele.bookName + "</td>\n" +
                    "<td>" + ele.author + "\n" +
                    "</td>\n" +
                    "<td>" + ele.categoryName + "\n" +
                    "</td>\n" +
                    "<td>" + ele.publicationDateStr + "</td>\n" +
                    "<td class=\"relative\">\n" +
                    "<a class=\"action-btn \" href=\"javascript:void(0); \">\n" +
                    "<svg class=\"default-size \" viewbox=\"0 0 341.333 341.333 \">\n" +
                    "<g>\n" +
                    "<g>\n" +
                    "<g>\n" +
                    "<path d=\"M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z \"></path>\n" +
                    "<path d=\"M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z \"></path>\n" +
                    "<path d=\"M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z \"></path>\n" +
                    "</g>\n" +
                    "</g>\n" +
                    "</g>\n" +
                    "</svg>\n" +
                    "</a>\n" +
                    "<div class=\"action-option \">\n" +
                    "<ul>\n" +
                    "<li>\n" +
                    "<a onclick=returnBook('" + ele.id + "') href=\"#\"><i\n" +
                    "class=\"far fa-trash-alt mr-2 \"></i>归还</a>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    " </tr>";
            })

            $("#noReturnBody").html(noReturnBodyHtml);
        }
    })
}


function page(pageNo, pageSize, flag) {
    console.log("pageNo:" + pageNo);
    console.log("pageSize:" + pageSize);
    var pageHtml = "";
    var returnBodyHtml = "";
    var status = $("#search-status").val();
    $("#search-status").val($("#hidden-status").val())
    $("#search-category").val($("#hidden-category").val())
    $("#search-bookName").val($("#hidden-bookName").val())
    $.ajax({
        url: "/borrow/getBorrowBookPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            categoryName: $("#search-category").val(),
            bookName: $("#search-bookName").val(),
            status: status,
            uid: $("#hidden-uid").val()
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
            if (pageNo == 1 && data.pages != 1) {
                $("#left").css("color", "black");
                $("#left").css("cursor", "not-allowed");
                $("#right").css("color", "#007bff");
                $("#right").css("cursor", "");
            } else if (pageNo == 1 && data.pages == 1) {
                $("#left").css("color", "black");
                $("#left").css("cursor", "not-allowed");
                $("#right").css("color", "black");
                $("#right").css("cursor", "not-allowed");
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
                returnBodyHtml += "<tr>\n" +
                    "<td>" + ele.logId + "</td>\n" +
                    "<td>\n" +
                    "<div class=\"full-screen-portfolio\" id=\"portfolio2\">\n" +
                    "<div class=\"container-fluid\">\n" +
                    "<div class=\"portfolio-item\">\n" +
                    "<a href=\"../image/BEFCE12138317B9AD0E7D69968C69463.jpg\"\n" +
                    "data-lightbox=\"../image-1\">\n" +
                    "<div class=\"thumb\">\n" +
                    "<div id=\"img2\" class=\"../image\">\n" +
                    "<img src=\"../image/BEFCE12138317B9AD0E7D69968C69463.jpg\"\n" +
                    "width=\"50\">\n" +
                    "</div>\n" +
                    " </div>\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "<td>" + ele.bookName + "</td>\n" +
                    "<td>" + ele.author + "\n" +
                    "</td>\n" +
                    "<td>" + ele.categoryName + "\n" +
                    "</td>\n";
                $.ajax({
                    async: false,
                    url: "/book/judgeStatus",
                    data: {
                        bid: ele.id,
                        uid: $("#hidden-uid").val()
                    },
                    dataType: "json",
                    success: function (data) {
                        returnBodyHtml += "<td>" + data.status + "</td></tr>";
                    }
                })
            })
            if (flag) {
                if (total == undefined) {
                    pages = data.pages;
                } else {
                    if (total <= pageSize) {
                        pages = 1;
                    } else {
                        pages = total / pageSize == 0 ? total / pageSize : total / pageSize + 1;
                    }
                }
                for (var index = 0; index < (data.pages < 10 ? data.pages : 10); index++) {
                    pageHtml += "<li id=page" + (index + 1) + " class=\"page-item " + (index + 1 == pageNo ? " active" : "") + " \">\n" +
                        "<a class=\"page-link \" onclick=pageChange(" + (index + 1) + "," + pages + ") href=\"javascript:void(0); \">" + (index + 1) + "</a>\n" +
                        "</li>"
                }
                $("#pageUl").html(pageHtml);
            }

            $("#returnBody").html(returnBodyHtml);
        }
    })
}


