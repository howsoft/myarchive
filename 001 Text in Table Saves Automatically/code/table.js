/*jslint browser: true */
/*global $, VLE, setInterval */
(function () {
	"use strict";

	var separator = "<-=*=->", activity_id, textarea_rows, textblob = "";

	function when_data_read_ok(values) {
		var texts = values.blob_text.split(separator);
		$('textarea').each(function (index) {
			$(this).val(texts[index]);
		});
	}

	function on_error_reading_data() {}
	function when_data_written_ok() {}
	function on_error_writing_data() {}

	function save_data() {
		var oldtextblob = textblob;
		textblob = "";
		$('textarea').each(function () {  /* only trouble the VLE if the text has changed */
			textblob += $(this).val() + separator;
		});
		if (textblob !== oldtextblob) {
			VLE.set_server_data(true, { 'blob_text' : textblob }, when_data_written_ok, on_error_writing_data, undefined, null, activity_id);
		}
	}

	$(document).ready(function () {
    /*
        if a parameter 'parent_activity_id' is set in Structured Content then use
        that - otherwise assume that this *is* the parent activity, which should
        have an id (set in SC), and use the '_a' parameter set by the VLE to get it
     */
		activity_id = VLE.get_param('parent_activity_id') || VLE.get_param('_a');

		textarea_rows = VLE.get_param('rows') || 3;   /*  can set rows in each textarea in SC  */
		$("textarea").attr("rows", textarea_rows);   /* assumes there aren't any other textareas */

		VLE.get_server_data(true, ['blob_text'], function (values) { when_data_read_ok(values); }, on_error_reading_data, activity_id);

		setInterval(save_data, 1000);  /* run save_data every second */
	});
}());  /* end of all-enclosing function */
