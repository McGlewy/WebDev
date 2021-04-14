


<?php
//Code from https://www.cloudways.com/blog/connect-mysql-with-php/
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'Images';
$conn = new mysqli($host, $user, $pass, $db);

	function closeConnection($conn)
	{
		global $conn;
		$conn -> close();
	}
//Code from https://www.cloudways.com/blog/connect-mysql-with-php/



?>

