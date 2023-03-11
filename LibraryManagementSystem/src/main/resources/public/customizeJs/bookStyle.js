var pages, currentPage = 1;
//.select-picker-search-checked
$(function () {
    
    // $(".select-picker-search-checked").bind("DOMNodeInserted", function (e) {
    //     pageChange(1, pages);
    // })

    var pageSize = parseInt($(".select-picker-search-checked").text());
    page(1, isNaN(pageSize) ? 5 : pageSize, true);
    $("#searchButton").click(function () {
        var search_categoryName = $("#search-categoryName").val();
        var typeFlag = false;
        $("#hidden-categoryName").val(search_categoryName);
        $.each($("#typelist").children("option"), function () {
            if (search_categoryName == "" || search_categoryName == $(this).text()) {
                typeFlag = true;
            }
        })
        if (!typeFlag) {
            $("#search_categoryName").val("");
            $("#returnMsg").text("类别参数不合法,请重新输入!");
            return;
        }
        $("#returnMsg").text("");
        pageChange(1, pages);
    })


    $("#updateButton").click(function () {
        var id = $("#update_id").val();
        $.ajax({
            url: "/category/updateCategory",
            data: {
                id: id,
                category: $("#update-categoryName").val(),
            },
            dataType: "json",
            type: "POST",
            success: function (data) {
                if (data == true) {
                    $("#closeUpdateModalButton").click();
                    var pageSize = parseInt($(".select-picker-search-checked").text());
                    page(currentPage, isNaN(pageSize) ? 5 : pageSize, true);
                } else {
                    alert("修改失败,该类别存在未归还的图书");
                }
            }
        })
    })

    $("#testButton").click(function () {
        console.log();
    })

    $("#saveButton").click(function () {
        $("#hidden-categoryName").val("");
        $.ajax({
            url: "/category/saveCategory",
            data: {
                category: $("#insert-category").val()
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
        url: "/category/fillUpdateCategoryModal",
        data: {
            id: id
        },
        dataType: "json",
        type: "GET",
        success: function (data) {
            $("#update-categoryId").text(data.id);
            $("#update-categoryName").val(data.category);
        }
    })
    $('#' + $(e).data('modal-id')).modal();
}


function deleteCategory(id) {
    if (!confirm("是否要删除该图书类别"))
        return;
    $.ajax({
        url: "/category/deleteCategory",
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
                alert("删除失败,该类别存在未归还的图书");
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
    var bookStyleBodyHtml = "";
    $("#search-categoryName").val($("#hidden-categoryName").val())
    $.ajax({
        url: "/category/getCategoryPage",
        data: {
            pageNo: pageNo,
            pageSize: pageSize,
            category: $("#search-categoryName").val()
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
                bookStyleBodyHtml += "<tr>\n" +
                    "<td>" + ele.id + "</td>\n" +
                    "<td>" + ele.category + "\n" +
                    "</td>\n" +
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
                    "<a href=\"javascript:void(0); \" onclick=updateModal(this,\'" + ele.id + "\') class=\"click\" data-modal-id=\"modal-register1\"><i class=\"far fa-edit mr-2 \"></i>修改</a>\n" +
                    "</li>\n" +
                    "<li>\n" +
                    // "<a href=\"javascript:void(0); \" onclick=deleteBook(\'" + ele.id + "\')><i class=\"far fa-trash-alt mr-2 \"></i>Delete</a>\n" +
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
            $("#bookStyleBodyHtml").html(bookStyleBodyHtml);
        }
    })
}


