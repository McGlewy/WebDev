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
			var list = createImages(response);
			organizeImages(list, 3);
			applyPanel();
		},
		error: function (response)
		{
			console.log("fail");
			console.log(response);
		}
	});
});



function applyPanel()
{
	//store all images and create image element for each image in html page.
	var images = document.getElementsByClassName("imgs");
	var panel = document.getElementById("panel");
	var close = document.createElement("button");
	close.innerHTML = "X";
	close.onclick = function ()
	{
		panel.innerHTML = "";
		organizeImages(toArray(document.getElementsByClassName("imgs")), 3);
	}

	for (var x = 0; x < images.length; x++)
	{
		onClickApplication(images[x], panel, close);
	}
}

function createImages(response)
{
	var list = [];

	for (var count = 0; count < response.length; count++)
	{
		var data = response[count];
		var td = document.createElement("td");

		$(td).append("<img class='imgs' src='../images/Full/" + data.link 
			+ "' alt = '" + data.title + "' data-id ='" + data.id + "' data-artist='" + data.artist + "' data-desc='"
			+ data.desc + "' data-price='" + data.price + "' data-cart='" + data.cart + "'/>"
		);
		list.push(td);		
	}
	return list;
}

function organizeImages(response, rows)
{
	console.log("Entering organizeImages,", response, rows);

	var table = $("#pictable");
	var row = 0;

	for (var count = 0; count < response.length; count++)
	{
		if (count % rows == 0 && document.getElementById("row-" + count) == null)
		{
			table.append("<tr id='row-" + row + "'></tr>");
		}

		if (document.getElementById("item-" + count) == null)
		{
			$("#row-" + row).append("<td id='item-" + count + "'></td>");
		}
		else
		{
			$("#row-" + row).append($("#item-" + count));
		}

		$("#item-" + count).append(response[count]);

		console.log(document.getElementById("row-" + row), count, row, response.length);

		if (count % rows == rows - 1)
		{
			row++;
		}
	}
}

function toArray(list)
{
	var array = new Array();
	
	for (var count = 0; count < list.length; count++)
	{
		var data = list[count];
		var title = data.getAttribute("data-title");
		var link = data.getAttribute("src").substring(String.prototype.indexOf(data.getAttribute("src")));
		var id = data.getAttribute("data-id");
		var desc = data.getAttribute("data-desc");
		var artist = data.getAttribute("data-artist");
		var price = data.getAttribute("data-price");
		var cart = data.getAttribute("data-cart");

		array[count] = {
			title: title,
			link: link,
			id: id,
			desc: desc,
			artist: artist,
			price: price,
			cart: cart
		}
	}
	return array;
}

function onClickApplication(orgImage, panel, close)
{
	var image = orgImage.cloneNode(false);
	orgImage.onclick = function ()
	{
		panel.innerHTML = "";
		organizeImages(toArray(document.getElementsByClassName("imgs")), 2);
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
			console.log(document.getElementsByClassName("imgs"));

			$.ajax({
				url: "../php/add_to_cart.php",
				type: "POST",
				data:
				{
					id: parseInt($(image).attr("data-id"))
				},
				success: function ()
				{

					console.log("Success with addition AJAX call");
					$(image).attr("data-cart", "1");
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
			console.log(document.getElementsByClassName("imgs"));

			$.ajax({
				url: "../php/remove_item.php",
				type: "POST",
				data:
				{
					id: parseInt($(image).attr("data-id"))
				},
				success: function ()
				{
					console.log("Success with removal AJAX call");
					$(image).attr("data-cart", "0");
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