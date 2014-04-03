
$(document).ready(function() {

    $('#instructions').width( $('#thetext').width() );

    function oucu_format(s) {

        var new_s = '', groups = s.split('*');

        for(var i=0; i<groups.length; i++) {

            var roles = groups[i].split(':');

            new_s += "\n\nTutor: " + roles[0];
            new_s += "\n------------\n";
            new_s += roles[1];

        }

        return new_s;
    }

    function get_output_string() {

        var lines = [], output_string = '', students_in_line = [], student_oucus = [];

        lines = $('#thetext').val().split('\n');

        for(var i=0; i<lines.length; i++) {

            var line = $.trim(lines[i]);

            if(line === '') {
                /*  blank line  */
                continue;
            }

            if(line.indexOf(',') === -1 && line.length > 1) {    /* assume is a tutor */

                /* if not the first tutor remove trailing comma */
                if(output_string.length > 0) {
                    output_string = output_string.substring(0, output_string.length - 1);
                }

                output_string += "*" + line + ":";

            }

            if(line.indexOf(',') != -1) { /* a line containing student oucus */

                students_in_line = [], student_oucus = line.split(',');            

                for(var j=0; j<student_oucus.length; j++) {
                    if(student_oucus[j].trim() !== '') {
                        students_in_line.push(student_oucus[j].trim());
                    }
                }

                for(j=0; j<students_in_line.length; j++) {

                    output_string += students_in_line[j];
                    output_string += ',';
                 }
            }
        }

        output_string = output_string.substring(1,output_string.length); /* remove first '*'  */
        output_string = output_string.substring(0, output_string.length - 1); /* remove last comma */

        return output_string;

    }

    $('#btn_delete').click(function() {
        $('#thetext').val('');
    });

    $('#submit1').click(function() {
		$('#txt2go').val( get_output_string() );
	    $('form').submit();
    });

    $('#btn_preview').click(function() {
        alert( oucu_format(get_output_string()) );
    });

});
