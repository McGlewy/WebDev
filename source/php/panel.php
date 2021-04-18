<?php
	require 'database_connection.php';

	$conn = openConnection();

	$cookie = $_COOKIE['username'] ?? '';
	$title = $_GET['title'] ?? '';

	$result = $conn->query('SELECT * FROM Photos WHERE title = "'.$title.'"');
	$info = $result->fetch_assoc();

	$artist = $info["artist"] ?? '';

	$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = '.$artist)->fetch_assoc();
	//$name = $artist_info->fetch_assoc();
	$desc = $info["description"];
	$price = $info["price"];
	$link = $info["link"];
	$id = $info["id"];
	
	$check = $conn->query('SELECT * FROM Carts WHERE cookie ="'.$cookie.'" AND item = '.$id);
	$cart = 0;

	if($check->fetch_assoc())
	{
		$cart = 1;
	}
	
	$data = array(
		"title" => $title,
		"name" => $artist_info["name"],
		"desc" => $desc,
		"price" => $price,
		"id" => $id,
		"cart" => $cart
	);

	closeConnection($conn);
	echo json_encode($data);
?>