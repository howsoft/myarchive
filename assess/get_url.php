<?php

	$full_uri = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";	
	$index = strpos($full_uri, "/admin/assess/");
	$url_prefix = substr($full_uri, 0, $index) . "/weeks.php?action=mydesignwork&week=1&currentuser=";

?>