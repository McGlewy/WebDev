<!DOCTYPE html>
<html>

	<head>
		<style>
		  .center {
			text-align: center
		  }

		  .container {
			display: flex;
			justify-content: space-evenly;
		  }

		  .imagecenter {
			display: block;
			margin-left: auto;
			margin-right: auto;
		  }
		</style>
		<script src="../JavaScript/cookies.js" type="text/javascript"></script>
		<script src="../Javascript/home_script.js" type="text/javascript"></script> 
		
	</head>
	
	<body style="background-color:rgba(63, 127, 191, 0.45);">
		<img src="logo.png" alt="logo" class="imagecenter" style="width:500px; height:100px;">
		<h2>
		  <div class="center">
			<div class="container">
			  <a href="#home">Menu</a>
			  <a href="webdev_cart.php">Cart</a>
			</div>
		  </div>
		</h2>

		<p class="center"><input type="text" placeholder="Search.." size="100" /></p>

		<div class="container">
		  <table border="0">
			<tbody>
				<?php
					require '../php/database_connection.php';
				
					$result = $conn->query('SELECT * FROM Photos');
					$numopen = 0;
					$numclosed = 0;
					if ($result->num_rows > 0) {
						$item_count = 0;
						while($row = $result->fetch_assoc()) 
						{
							$item_count += 1;
							if($item_count % 3 === 1)
							{
								echo '<tr>';
								$numopen += 1;
							}
							
							echo '<td><img class="pictures" src="../Images/Full/'.$row["link"].'" alt="'.$row["title"].'"/></td>';
							
							if($item_count % 3 === 3)
							{
								echo '</tr>';
								$numclosed += 1;
							}
						}
						if($numopen > $numclosed)
						{
							echo '</tr>';
						}
					}
					else 
					{
						echo "Empty";
					}
				?>
			</tbody>
		  </table>
		</div>
	</body>
</html>