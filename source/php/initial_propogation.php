<?php
	require 'database_connection.php';

	$conn = openConnection();
	$data = array();

	$request = $conn->query('SELECT * FROM Photos');
	while($row = $request->fetch_assoc())
	{
		$artist_query = $conn->query('SELECT * FROM Artists WHERE artist = '.$row["artist"]);
		$artist = $artist_query->fetch_assoc();

		$data[] = array(
			"id" => $row["id"],
			"title" => $row["title"],
			"desc" => $row["description"],
			"artist" => $artist["name"],
			"price" => $row["price"],
			"link" => $row["link"]
		);
	}
	
	closeConnection($conn);
	echo json_encode($data);
?>