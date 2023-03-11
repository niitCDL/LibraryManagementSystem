var pages, currentPage = 1;
//.select-picker-search-checked
$(function () {
    
    fillTypeList();

    var pageSize = parseInt($(".select-picker-search-checked").text());
    page(1, isNaN(pageSize) ? 5 : pageSize, true);

    $("#searchButton").click(function () {
        var search_bookName = $("#search-bookName").val();
        var search_type = $("#search-type").val();
        var typeFlag = false;
        $("#hidden-bookName").val(search_bookName);
        $("#hidden-type").val(search_type);
        $.each($("#typelist").children("option"), function () {
            if (search_type == "" || search_type == $(this).text()) {
                typeFlag = true;
            }
        })
        if (!typeFlag) {
            $("#search-type").val("");
            $("#returnMsg").text("类别参数不合法,请重新输入!");
            return;
        }
        $("#returnMsg").text("");
        pageChange(1, pages);
    })


    $(".select-picker-search-checked").bind("DOMNodeInserted", function (e) {
        pageChange(1, pages);
    })

    $("#updateButton").click(function () {
        var id = $("#update_id").val();
        $.ajax({
            url: "/book/updateBook",
            data: {
                id: id,
                bookName: $("#update-BookName").val(),
                author: $("#update-author").val(),
                categoryName: $("#update-category").val(),
                isbn: $("#update-ISBN").val(),
                price: $("#update-price").val(),
                profile: $("#update-profile").val(),
                stockNum: $("#update-stockNum").val()
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

    $("#testButton").click(function () {
        console.log();
    })

    $("#saveButton").click(function () {
        $("#hidden-bookName").val("");
        $("#hidden-type").val("");
        $.ajax({
            url: "/book/saveBook",
            data: {
                bookName: $("#insert-bookName").val(),
                author: $("#insert-author").val(),
                categoryName: $("#insert-category").val(),
                isbn: $("#insert-ISBN").val(),
                price: $("#insert-price").val(),
                profile: $("#insert-profile").val(),
                stockNum: $("#insert-stockNum").val()
            },
            dataType: "json",
            type: "POST",
            success: function (data) {
                if (data == true) {
                    $("#closeInsertUserModal").click();
                    var pageSize = parseInt($(".select-picker-search-checked").text());
                    page(1, isNaN(pageSize) ? 5 : pageSize, true);
                } else {
                    alert("注册失败");
                }
            }
        })
    })

    $("#logOutButton").click(function () {
        window.location.href = "/admin/logout";
    })
})

function updateModal(e, id) {
    $("#update_id").val(id);
    $.ajax({
        url: "/book/fillUpdateBookModal",
        data: {
            id: id
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                $("#update-BookName").val(data.bookName);
                $("#update-author").val(data.author);
                $("#update-category").val(data.categoryName);
                $("#update-ISBN").val(data.isbn);
                $("#update-price").val(data.price);
                $("#update-profile").val(data.profile);
                $("#update-stockNum").val(data.stockNum);
            }
        }
    })
    $('#' + $(e).data('modal-id')).modal();
}

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
            $("#typelist").html(typeListHtml);
        }
    })
}

function deleteBook(id) {
    if (!confirm("是否要删除该图书"))
        return;
    $.ajax({
        url: "/book/deleteBook",
        data: {
            id: id
        },
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data.success == "true") {
                var pageSize = parseInt($(".select-picker-search-checked").text());
                page(currentPage, isNaN(pageSize) ? 5 : pageSize, true);
            } else {
                alert(data.msg);
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
    var bookBodyHtml = "";
    $("#search-bookName").val($("#hidden-bookName").val())
    $("#search-type").val($("#hidden-type").val())
    $.ajax({
        url: "/book/getBookPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            bookName: $("#search-bookName").val(),
            categoryId: $(".kind-" + $("#search-type").val()).attr("id")
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
                bookBodyHtml += "<tr>\n" +
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
                    " </a>\n" +
                    " </div>\n" +
                    " </div>\n" +
                    " </div>\n" +
                    " </td>\n" +
                    " <td>" + ele.bookName + "</td>\n" +
                    " <td>" + ele.author + "\n" +
                    " </td>\n" +
                    " <td>" + ele.publicationDateStr + "\n" +
                    " </td>\n" +
                    " <td>" + ele.categoryName + "" +
                    " </td>\n" +
                    " <td>" + ele.price + "</td>\n" +
                    " <td>" + ele.stockNum + "</td>\n" +
                    " <td class=\"relative\">\n" +
                    "    <a class=\"action-btn \" href=\"javascript:void(0); \">\n" +
                    "      <svg class=\"default-size \" viewbox=\"0 0 341.333 341.333 \">\n" +
                    "                 <g>\n" +
                    "                     <g>\n" +
                    "                         <g>\n" +
                    "                             <path d=\"M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z \"></path>\n" +
                    "                             <path d=\"M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z \"></path>\n" +
                    "                             <path d=\"M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z \"></path>\n" +
                    "                         </g>\n" +
                    "                     </g>\n" +
                    "                 </g>\n" +
                    "             </svg>\n" +
                    "         </a>\n" +
                    "         <div class=\"action-option \">\n" +
                    "             <ul>\n" +
                    "                 <li>\n" +
                    "                     <a href=\"javascript:void(0); \" onclick=updateModal(this,\'" + ele.id + "\') class=\"click\"\n" +
                    "                        data-modal-id=\"modal-register1\"><i\n" +
                    "                             class=\"far fa-edit mr-2 \"></i>修改</a>\n" +
                    "                 </li>\n" +
                    "                 <li>\n" +
                    "                     <a href=\"javascript:void(0); \" onclick=deleteBook(\'" + ele.id + "\')><i\n" +
                    "                             class=\"far fa-trash-alt mr-2 \"></i>删除</a>\n" +
                    "                 </li>\n" +
                    "             </ul>\n" +
                    "         </div>\n" +
                    "     </td>\n" +
                    " </tr>"
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
            $("#book-body").html(bookBodyHtml);
        }
    })
}


