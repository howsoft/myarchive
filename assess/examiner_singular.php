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
h3 {
	color: blue;
}
</style>
</head>
<body>

<h3>Y033 examiner</h3>

<p>Enter your OUCU (Open University Computer Username) and click the button to see a list of links to the work of the students allocated to you</p>

<form method="post" action="examiner_singular_process.php">
<div class='record'>
<input type="text" size="20" name="oucu" />
<input type="submit" value="see a list of my allocated students"/>
</div>
</form>

</body>
</html>