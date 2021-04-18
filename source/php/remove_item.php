<?php
	require 'database_connection.php';

	$conn = openConnection();

	$item = $_POST["id"] ?? '';
	if(!is_numeric($item))
	{
		$item = intval($item);
	}

	$cookie = $_COOKIE["username"] ?? '';
	$conn->query('DELETE FROM Carts WHERE item = '.$item.' AND cookie = "'.$cookie.'"');

	closeConnection($conn);
?>