var btn_save = null;

function init() {
    btn_save = $('#id_savebutton');
    btn_save.click( check_form );

    $("#id_title").attr("size", 100);
    $("#id_reference").attr("size", 100);

    $(".felement img").attr("width", "640");
}

function check_form(e) {

    var problems = false;

    e.preventDefault(); // stops form submitting

    if( $(".filepicker-filename a").length < 1 && $(".fitem div img").length < 2) {
        alert("Please add an image");
        problems = true;
    }

    var dropdowntext = $("#id_category").val();

    if(dropdowntext.indexOf("please select") !== -1) {
        alert("Please select a category from the drop down list.");
        problems = true;
    }

    if( ! problems ) {
        btn_save.unbind("click");
        btn_save.click();

    }

}
