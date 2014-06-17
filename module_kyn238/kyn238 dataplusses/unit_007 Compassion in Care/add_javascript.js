function getUrlVars() { 
  var map = {}; 
  var parts = window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi, function(m,key,value) { map[key] = (value === undefined) ? true : value.substring(1); });
  return map; 
}

function init() {

    btn_save = $('#id_savebutton');
    btn_save.click(check_form);
    $("#id_Source").attr("size", 100);

    $('p').each(function() {
      if($(this).text().indexOf('Record added') != -1) {
          document.location = viewpage_url;
      }
    });
 


}

function check_form(e) {

    var problems = false;
   
    if ($(".filepicker-filename a").length < 1 && $("#image_span > .fitem > .felement > img").length < 1) {
        alert("Please add an image");
        problems = true;
    }


    if (!problems) { 
        btn_save.unbind("click");
        btn_save.click();
    } else {
		e.preventDefault(); // stops form submitting

	}

}

var btn_save = null, params = getUrlVars();

var viewpage_url = location.protocol + '//' + location.hostname + location.pathname + "?mode=view&id=" + params.id;


