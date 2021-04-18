<?php
	require 'database_connection.php';
	
	$conn = openConnection();

	$id = $_POST["id"];
	$cookie = $_COOKIE["username"];
	$query = $conn->query('SELECT * FROM Carts WHERE cookie = "'.$cookie.'" AND item = '.$id);

	if($query->num_rows == 0)
	{
		$conn->query('INSERT INTO Carts (cookie, item) VALUES ("'.$cookie.'", '.$id.')');
	}

	closeConnection($conn);
?>