<?php

	require_once ('../../config.php');
	require_once('../../functions.php');

	


$sqlString = "SELECT * FROM photoshare_tblUsers";


echo $sqlString;

exit;


$keys = array ();
$dbRowCount = 0;
$dbDataArray = array ();
odbc_sql_select($dbDataArray, $keys, $dbRowCount, $sqlString);


$name=trim($dbDataArray[0]['name']);
$courses=trim($dbDataArray[0]['courses_studied']);
$location=trim($dbDataArray[0]['location']);
$experience=trim($dbDataArray[0]['experience']);
$flickrname=trim($dbDataArray[0]['flickrname']);
$facebookname=trim($dbDataArray[0]['facebookname']);
$otherurl=trim($dbDataArray[0]['otherurl']);
$Lstylevisual=trim($dbDataArray[0]['LstyleVisual']);
$Lstyleverbal=trim($dbDataArray[0]['LstyleVerbal']);
$Lstylesocial=trim($dbDataArray[0]['LstyleSocial']);









?>