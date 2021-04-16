$(document).ready(function () {
	console.log("ajax started");
	$.ajax
	({
		url: "../php/home_script.php",
		type: "get",
		dataType: "JSON",
		success: function (response)
		{
			var table = $("#pictable");
			var row = 0;

			for (var count = 0; count < response.length; count++)
			{
				var data = response[count];

				if (count % 3 == 0)
				{
					table.append("<tr id='row-" + row + "'></tr>");
				}

				$("#row-" + row).append("<td><img class='imgs' src='../images/Full/" + data.link + "'"
					+ " alt = '" + data.title + "'/></td>"
				);

				if (count % 3 == 2)
				{
					row++;
				}
			}
			applyPanel();
		},
		error: function (response)
		{
			console.log("fail");
			console.log(response);
		}
	});
});

function applyPanel() {
	//store all images and create image element for each image in html page.
	var images = document.getElementsByClassName("imgs");
	var panel = document.getElementById("panel");
	var remove = document.createElement("button");
	remove.setAttribute("value", "X");
	remove.onclick = function () {
		panel.innerHTML = "";
		//add reformat picture table function here
	}
	console.log(images)
	console.log(images.length)
	console.log("made it this far");

	for (var x = 0; x < images.length; x++)
	{
		onClickApplication(images[x]);
	}
}

function onClickApplication(orgImage)
{
	var image = orgImage.cloneNode(false);
	originalImage.onclick = function () {
		console.log("inner ajax start");
		$.ajax({
			url: "../php/panel.php",
			type: "get",
			data:
			{
				title: $(orgImage).attr("alt")
			},
			dataType: "JSON",
			success: function (response) {
				panel.innerHTML = "";
				$(panel).append(remove);
				$(panel).append(image);
				$(panel).append(
					"<p>" + response.title + "</p><p>" + response.name
					+ "</p></br><p>" + response.desc + "</p></br><p>" + response.price + "</p>"
				);

				var add = document.createElement("button");
				add.setAttribute("value", "Add to Cart");
				add.onclick = function () {
					$.ajax({
						url: "../php/add_to_cart.php",
						type: "POST",
						data:
						{
							id: response.id
						},
						success: function () {
							console.log("success");
						},
						error: function () {
							console.log("failure");
						}
					})
				}
			}
		})
	};
}