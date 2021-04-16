


<?php
//Code from https://www.cloudways.com/blog/connect-mysql-with-php/
	function openConnection()
	{
		$host = 'localhost';
		$user = 'root';
		$pass = '';
		$db = 'Images';
		$conn = new mysqli($host, $user, $pass, $db);
		return $conn;
	}
		

	function closeConnection($conn)
	{
		$conn -> close();
	}
//Code from https://www.cloudways.com/blog/connect-mysql-with-php
?>

