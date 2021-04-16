<?php
	include 'database_connection.php';

	$conn = openConnection();
	$data = array();

	$request = $conn->query('SELECT * FROM Photos');
	while($row = $request->fetch_assoc())
	{
		$data[] = array(
			"title" => $row["title"],
			"link" => $row["link"]
		);
	}

	closeConnection($conn);
	echo json_encode($data);
?>