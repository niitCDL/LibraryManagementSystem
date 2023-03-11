$(document).ready(function (e) {
    $("#btn_ok").click(function () {
        $("[type=file]").click();
    })
})

function assignment() {
    document.getElementById('imgPic1').style.backgroundImage = "url('" + window.URL.createObjectURL(document.getElementById('file').files[0]);+ "')";
    document.getElementById('imgPic2').style.backgroundImage = "url('" + window.URL.createObjectURL(document.getElementById('file').files[0]); + "')";
    document.getElementById('view').style.backgroundImage = "url('" + window.URL.createObjectURL(document.getElementById('file').files[0]); + "')";
}