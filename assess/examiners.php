<html>
<head>
<style type="text/css">
body {
	background: -webkit-linear-gradient(#efefef, blue); /* For Safari 5.1 to 6.0 */
	background: -o-linear-gradient(#efefef, blue); /* For Opera 11.1 to 12.0 */
	background: -moz-linear-gradient(#efefef, blue); /* For Firefox 3.6 to 15 */
	background: linear-gradient(#efefef, blue); /* Standard syntax */
	
	font-family: verdana;
	font-size: 8pt;
}
.record {
	background-color: white;
	margin-top: 20px;
	padding: 4px;
}
.tutor {
	background-color: #efefef;
	margin-bottom: 8px;
}
.studentlink {
	margin-left: 10px;
	
}
h3 {
	color: blue;
}
</style>
</head>
<body>
<h3>Links for examiners Y033</h3>
<?php

	require_once ('../../config.php');
	require_once('../../functions.php');
	require_once('get_url.php');
	
	$keys = array ();
	$dbRowCount = 0;
	$dbDataArray = array ();
	
	$sqlString = "select distinct flickr_imageid from photoshare_tblHitormiss";
	odbc_sql_select($dbDataArray, $keys, $dbRowCount, $sqlString);
	
	foreach($dbDataArray as $record) {
	
		$dbDataArray2 = array ();
		$tutor = $record['flickr_imageid'];
		
		echo "<div class='record'><div class='tutor'>Tutor: " . $tutor . "</div>";
		
		$sqlString = "select distinct flickr_userid from photoshare_tblHitormiss where flickr_imageid = '$tutor'";
		odbc_sql_select($dbDataArray2, $keys, $dbRowCount, $sqlString);
		
		foreach($dbDataArray2 as $s_record) {
			$student = $s_record['flickr_userid'];
			echo "<div class='studentlink'><a target='_blank' href='$url_prefix" . "$student'>$student</a></div>" . "<br/>";
			
		}	
		
		echo "</div><hr/>";		
	}
?>
</body>
</html>