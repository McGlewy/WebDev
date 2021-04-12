<html>
<script src="../JavaScript/show_item.js" type="text/javascript"></script> 
<?php 
	require 'database_connection.php';
	$conn = openConnection();
	
	$sql_request = 'SELECT * FROM Carts WHERE cookie = "testcookie";';
	
	$result = $conn -> query($sql_request);
	if ($result->num_rows > 0) {
		echo "<table>";
		while($row = $result->fetch_assoc()) 
		{
			$sql_item_request = 'SELECT * FROM Photos WHERE id = '.$row["item"].';';
			$item_request = $conn -> query($sql_item_request);
			while($inner_row = $item_request->fetch_assoc())
			{
				$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = '.
					$inner_row["artist"].';');
				//Puts the data into the script 
				echo '<script> var list = ["'.$inner_row["title"].'","'.$artist_info->fetch_assoc()["name"].
					'","'.$inner_row["description"].'",'.$inner_row["price"].
					',"'.$inner_row["link"].'"];
					item(list);</script></br>"';
			}				
		}
		echo "</table>";
	}	
	else 
	{
		echo "Empty";
	}
?>
</html>