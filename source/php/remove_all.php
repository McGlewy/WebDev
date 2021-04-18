<?php
	require 'database_connection.php';

	$conn = openConnection();

	$cookie = $_COOKIE["username"] ?? '';

	$conn->query('DELETE FROM Carts WHERE cookie = "'.$cookie.'"');

	closeConnection($conn);