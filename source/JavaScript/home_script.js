$(document).ready(function () {
	console.log("Initial AJAX call made");
	$.ajax
	({
		url: "../php/initial_propogation.php",
		type: "GET",
		dataType: "JSON",
		success: function (response)
		{
			console.log("Data Received");
			var table = $("#pictable");
			var row = 0;

			for (var count = 0; count < response.length; count++)
			{
				var data = response[count];

				if (count % 3 == 0)
				{
					table.append("<tr id='row-" + row + "'></tr>");
				}

				//Adds image to table and data to image
				$("#row-" + row).append("<td><img class='imgs' src='../images/Full/" + data.link + "'"
					+ " alt = '" + data.title + "'data-id ='" + data.id + "' data-artist='" + data.artist + "' data-desc='"
					+ data.desc + "' data-price='" + data.price + "' data-cart='" + data.cart + "'/></td>"
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
	var close = document.createElement("button");
	close.innerHTML = "X";
	close.onclick = function ()
	{
		panel.innerHTML = "";
		//add reformat picture table function here
	}

	for (var x = 0; x < images.length; x++)
	{
		onClickApplication(images[x], panel, close);
	}
}

function onClickApplication(orgImage, panel, close)
{
	var image = orgImage.cloneNode(false);
	orgImage.onclick = function ()
	{
		panel.innerHTML = "";
		panel.append(close);
		$(panel).append("</br>");
		panel.append(image);
		$(panel).append("</br>");
		panel.append("Title: " + $(image).attr("alt"));
		$(panel).append("</br>");
		panel.append("Artist: " + $(image).attr("data-artist"));
		$(panel).append("</br>");
		$(panel).append("</br>");
		panel.append($(image).attr("data-desc"));
		$(panel).append("</br>");
		$(panel).append("</br>");
		panel.append("Price: $" + $(image).attr("data-price"));
		$(panel).append("</br>");
		$(panel).append("</br>");
		var add = document.createElement("button");
		var remove = document.createElement("button");
		add.innerHTML = "Add to Cart";
		remove.innerHTML = "Remove from Cart";

		if (parseInt($(image).attr("data-cart")) == 0) {
			$(panel).append(add);
		}
		else
		{
			$(panel).append(remove);
		}

		add.onclick = function ()
		{
			$.ajax({
				url: "../php/add_to_cart.php",
				type: "POST",
				data:
				{
					id: parseInt($(image).attr("data-id"))
				},
				success: function ()
				{
					console.log("Success with AJAX call");
					console.log($(image).attr("data-cart").toString());
					$(image).attr("data-cart", "1");
					console.log($(image).attr("data-cart").toString());
					$(add).replaceWith(remove);

				},
				error: function ()
				{
					console.log("Failure");
				}
			})
		}
		remove.onclick = function ()
		{
			console.log("Remove Function Initiated")
			$.ajax({
				url: "../php/remove_item.php",
				type: "POST",
				data:
				{
					id: parseInt($(image).attr("data-id"))
				},
				success: function ()
				{
					
					console.log("Success with AJAX call");
					console.log(parseInt($(image).attr("data-id")));
					console.log($(image).attr("data-cart").toString());
					$(image).attr("data-cart", "0");
					console.log($(image).attr("data-cart").toString());
					$(remove).replaceWith(add);
				},
				error: function ()
				{
					console.log("Failure");
				}
			})
		}
	}
}