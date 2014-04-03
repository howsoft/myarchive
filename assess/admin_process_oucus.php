<?php

	require_once ('../../config.php');
	require_once('../../functions.php');
	
	$keys = array ();
	$dbRowCount = 0;
	$dbDataArray = array ();
	
	$sqlString = "delete from photoshare_tblHitormiss";
	odbc_sql_select($dbDataArray, $keys, $dbRowCount, $sqlString);
	
	$s = $_POST["glob"];
	
	$groups = explode('*', $s);
	
	foreach($groups as $group) {
	
		$roles = explode(':', $group);
		
		$tutor = $roles[0];
		$students = explode(',', $roles[1]);
		
		foreach($students as $student) {
			$sqlString = "insert into photoshare_tblHitormiss (flickr_imageid, flickr_userid) values('$tutor', '$student')";
			odbc_sql_select($dbDataArray, $keys, $dbRowCount, $sqlString);
		}
		
	}

		header("Location: examiners.php");


?>