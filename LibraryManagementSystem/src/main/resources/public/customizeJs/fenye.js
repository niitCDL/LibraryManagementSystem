$(document).ready(function (e) {
    $("#right").click(function () {
        var isNotAllowed = $(this).css("cursor");
        if (isNotAllowed == "not-allowed") {
            return;
        }
        currentPage += 1;
        console.log("right: "+currentPage);
        pageChange(currentPage, pages);
        console.log("right AfterChange: "+currentPage);
        if (currentPage + 1 > pages) {
            $(this).css("color", "black");
            $(this).css("cursor", "not-allowed");
        }else {
            $(this).css("color", "#007bff");
            $(this).css("cursor","");
        }
    })

    $("#left").click(function () {
        var isNotAllowed = $(this).css("cursor");
        if (isNotAllowed == "not-allowed") {
            return;
        }
        currentPage -= 1;
        console.log("left: "+currentPage);
        pageChange(currentPage, pages);
        console.log("left AfterChange: "+currentPage);
        if (currentPage - 1 == 0) {
            $(this).css("color", "black");
            $(this).css("cursor", "not-allowed");
        }else {
            $(this).css("color", "#007bff");
            $(this).css("cursor","");
        }
    })
})

