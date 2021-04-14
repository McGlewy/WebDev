<html>
	<head>
		<meta lang="eng">
		<script src="../JavaScript/cookies.js" type = "text/javascript"></script>
		<script src="../JavaScript/show_item.js" type="text/javascript"></script>
		<style type="text/css">
			ul {
				text-align: center;
				list-style-type: none;
			}
			li {
				text-align: center;
				display: inline;
				margin: 40px;
				padding: 20px;
			}
			.remove {
				color: red;
			}
			#remove-all{
				text-align: right
			}
			table, th, td{
				border: 1px solid black;
				border-collapse: collapse;
			}
			#paypal{
				size: 20px;
			}
		</style>
		<title>Company Name</title>
	</head>
	<body>
		<h1 align="center">Company Name</h1>
		<nav id="navbar">
			<ul>
				<li><a href="#">Menu</a></li>
				<li><a href="#">Home</a></li>
				<li><a href="#">Cart</a></li>
			</ul>
			<input type="text" placeholder="Search"/>
		</nav>
		
		<h2 align="left">Your Cart</h2>
		<input type="button" value="Remove All" class="remove" id="remove-all"/>
		<section id="cart">

		</section>

		<button id="paypal">Finish Shopping with <img src="../Images/paypal.png" alt="Paypal"/></button>

		<?php 
			require '..//php//database_connection.php';
			$result = $conn->query('SELECT * FROM Carts WHERE cookie = "testcookie"');
			if ($result->num_rows > 0) {
				echo '<table>';
				while($row = $result->fetch_assoc()) 
				{
					$sql_item_request = 'SELECT * FROM Photos WHERE id = '.$row["item"].';';
					$item_request = $conn->query($sql_item_request);
					while($inner_row = $item_request->fetch_assoc())
					{
						$artist_info = $conn->query('SELECT * FROM Artists WHERE artist = '.
							$inner_row["artist"].';');
						//Puts the data into the script 
						$title = $inner_row["title"];
						$name = $artist_info->fetch_assoc()["name"];
						$desc = $inner_row["description"];
						$price = $inner_row["price"];
						$htmllink = $inner_row["link"];
						
						echo '<tr id="item-'.$title.'">';
						echo '<td><img src="'.$htmllink.'" alt="'.$title.'"/></td>'; 
						echo '<td>'.$title.'</br>'.$name.'</td>';
						echo '<td>'.$price.'</br><input="button" value="Remove" class="remove" id="remove-'.$title.'"/></tr>';
					}				
				}
				echo "</table>";
			}	
			else 
			{
				echo "Empty";
			}
		?>		
	</body>
</html>
		