$(document).ready(function () {
	console.log("ajax started");
	$.ajax
	({
		url: "../php/home_script.php",
		type: "get",
		dataType: "JSON",
		success: function (response)
		{
			
			console.log("success");
			console.log(response);

			
			var table = $("#pictable");
			var row = 0;

			console.log(row)

			for (var count = 0; count < response.length; count++)
			{

				var data = response[count];

				if (count % 3 == 0)
				{
					console.log('created new tr');
					table.append("<tr id='row-" + row + "'></tr>");
				}


				console.log('append img');
				$("#row-" + row).append("<td><img class='imgs' src='../images/Full/" + data.link + "'"
					+ " alt = '" + data.title + "'/></td>"
				);

				if (count % 3 == 2)
				{
					console.log("end of row");
					row++;
				}
			}
		},
		error: function (response)
		{
			console.log("fail");
			console.log(response);
		}
	});

	applyPanel();
});

function applyPanel() {
	//store all images and create image element for each image in html page.
	var images = document.querySelectorAll(".imgs");
	var panel = document.getElementById("panel");
	var remove = document.createElement("button");
	remove.setAttribute("value", "X");
	remove.onclick = function () {
		panel.innerHTML = "";
		//add reformat picture table function here
	}

	for (var x = 0; x < images.length; x++) {
		var originalImage = images[x];
		var id;
		originalImage.onclick = function () {

			panel.innerHTML = "";
			panel.appendChild(originalImage);

			var add = document.createElement("button");
			add.setAttribute("value", "Add to Cart");
			add.onclick = function () {


			}

		};
	}


}