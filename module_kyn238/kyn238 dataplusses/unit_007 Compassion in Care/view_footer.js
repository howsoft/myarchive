<div id="dp_content" class="clearer"></div>
<script type="text/javascript">

    var SHORT_CAPTION_LENGTH = 30;

    var parameters = getUrlVars();

    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/, '');
    };

    function striphtml(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    }

    //// FUNCTIONS THAT DEFINE A RECORD //////
    function Record(image, source, why, more, creator, record_number, the_id) {

        if (image.indexOf("<img") == -1) {
            this.image = "<img src='/includes/headers-footers/oulogo-56.jpg' />";
        } else {
            this.image = image;
        }
        this.source = source;
        this.why = why;
        this.more = more;
        this.creator = creator;
        this.record_number = record_number;
        this.the_id = the_id;

        this.jquery_ref = null;

        this.html = record_html;

    }

    function record_html() {

        var link = "view.php?mode=single&ri=" + this.the_id + "&id=" + parameters["id"];

        return "<div class='thumbnail' id='record_" + this.record_number + "'><a href='" + link + "'>" + this.image + "</a><div class='title_div'>" + this.why.replace("<p>", "").replace("</p>","") + "</div></div>";

    }
    //// end FUNCTIONS THAT DEFINE A RECORD ///

    function show_defaultview() {
        content_node.append($('<div class="clearer"></div>'));
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var record_html = record.html();
            if (record_html == "")
                continue;

            content_node.append(record_html);
        }
    }

    function getUrlVars() {
        var map = {};
        var parts = window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi, function(m, key, value) {
            map[key] = (value === undefined) ? true : value.substring(1);
        });
        return map;
    }

    ////////// execution starts here ///////////

    // temprecords was filled by the code in the
    // record template in dataplus. Now make
    // each record into an object which is stored
    // in the array 'records' defined in the header
    // section.
    for (var i = 0; i < temprecords.length; i++) {


        records.push(
                new Record(
                        temprecords[i][0],
                        temprecords[i][1],
                        temprecords[i][2],
                        temprecords[i][3],
                        temprecords[i][4],
                        temprecords[i][5],
                        temprecords[i][6],
                        temprecords[i][7]
                )
        );
    }

    temprecords = null; // maybe save a bit of memory

    // assumes that a parameters variable has been declared
    // in the header section:
    parameters = getUrlVars();

    function init() {

        content_node = $("#dp_content");

        show_defaultview();

        for (var j = 0; j < records.length; j++) {
            var theid = "#record_" + records[j].record_number;
            records[j].jquery_ref = $(theid);
        }
        
        var css_s = "" + (records.length * 70) + "px";
        
        $("body #region-main #region-main-inner").css('min-height', css_s);


    }

</script>