<?php
	include 'database_connection.php';

	$conn = openConnection();
	
	$title = $_GET['title'];

	$result = $conn->query('SELECT * FROM Photos WHERE title = "'.$title.'"');
	$info = $result->fetch_assoc();

	$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = '.$info["artist"]);
	$name = $artist_info -> fetch_assoc()["name"];
	$desc = $info["description"];
	$price = $info["price"];
	$link = $info["link"];
	$id = $info["id"];

	$data = array(
		"title" => $title,
		"name" => $name,
		"desc" => $desc,
		"price" => $price,
		"id" => $id
	);

	closeConnection($conn);
	echo json_encode($data);
?>