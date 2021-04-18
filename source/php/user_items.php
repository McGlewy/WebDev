<?php
	require 'database_connection.php';

	$conn = openConnection();
	$data = array();

	$request = $conn->query('SELECT * FROM Carts WHERE cookie = "'.$_COOKIE["username"].'"');
	while($row = $request->fetch_assoc())
	{
		$result = $conn->query('SELECT * FROM Photos WHERE id = '.$row["item"]);
		$item = $result->fetch_assoc();

		$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = "'.$item["artist"].'"');
		$artist = $artist_info->fetch_assoc();

		$data[] = array(
			"id" => $item["id"],
			"title" => $item["title"],
			"artist" => $artist["name"],
			"price" => $item["price"],
			"link" => $item["link"]
		);
	}

	closeConnection($conn);
	echo json_encode($data);
?>