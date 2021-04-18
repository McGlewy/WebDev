<?php
	require 'database_connection.php';

	$conn = openConnection();
	$data = array();

	$request = $conn->query('SELECT * FROM Photos');
	while($row = $request->fetch_assoc())
	{
		$artist_query = $conn->query('SELECT * FROM Artists WHERE artist = '.$row["artist"]);
		$artist = $artist_query->fetch_assoc();

		$id = $row["id"];
		$cookie = $_COOKIE["username"] ?? '';

		//Check to see if item in cart
		$check = $conn->query('SELECT * FROM Carts WHERE cookie ="'.$cookie.'" AND item = '.$id);
		$cart = 0;

		if($check->fetch_assoc())
		{
			$cart = 1;
		}

		$data[] = array(
			"id" => $id,
			"title" => $row["title"],
			"desc" => $row["description"],
			"artist" => $artist["name"],
			"price" => $row["price"],
			"link" => $row["link"],
			"cart" => $cart
		);
	}
	
	closeConnection($conn);
	echo json_encode($data);
?>