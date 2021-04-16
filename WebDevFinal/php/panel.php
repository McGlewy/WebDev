<?php
	require 'database_connection.php';

	$info =	($conn->query('SELECT * FROM Photos WHERE title = "'.$_POST[.'"'))->fetch_assoc();
	$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = '.$info["artist"]);
	$title = $info["title"];
	$name = $artist_info -> fetch_assoc()["name"];
	$desc = $info["description"];
	$price = $info["price"];
	$htmllink = $info["link"];



	//Sends ID of picture to JS to it can be tested with add to cart button
	echo '<script type="text/javascript">id = '.$info["id"].'</script>';
	//Fills the panel with proper info
	echo '<p>'.$title.'</p><p>'.$name.'</p></br><p>'.$desc.'</p></br><p>'.$price.'</p>';			
?>