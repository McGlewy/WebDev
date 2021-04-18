$(document).ready(function () {
	console.log("Initial AJAX Call Made");
	$.ajax
	({
		url: "../php/user_items.php",
		type: "get",
		dataType: "JSON",
		success: function (response) {
			console.log("Initial AJAX Call Successful");
			console.log(response.length);
			if (response.length == 0)
			{
				$("#remove-all").css("visibility", "hidden");
				$("#paypal").css("visibility", "hidden");
				$("#cart").html("Empty");
			}
			else
			{
				var table = $("#cart");
				for (var count = 0; count < response.length; count++)
				{
					onClickApplication(response[count], count, table);
				}
			}
		},
		error: function (response) {
			console.log("Initial AJAX Call Failure");
			console.log(response);
		}
	});
	document.getElementById("remove-all").onclick = function ()
	{
		requestRemoveAll();
	}
});



function onClickApplication(data, count, table)
{
	var row = "row-" + count;
	var button = document.createElement("button");
	button.innerHTML = "Remove";
	$(button).addClass("remove");
	table.append("<tr id='" + row + "'><td><img class='imgs' src='../Images/Full/" + data.link
		+ "' alt='" + data.title + "'/></td>"
		+ "<td>" + data.title + "</br>" + data.artist + "</td>"
		+ "<td>" + data.price + "</td></tr>"
	);
	$('#' + row).append(button);
	console.log("i appended here")
	button.onclick = function () {
		console.log("button clicked");
		requestRemove(parseInt(data.id), this);
	}
}

function requestRemoveAll() 
{
	if ($("#cart").html() == 'Empty') {
		alert("No items in cart to remove");
	}
	else {
		$.ajax
		({
			url: "../php/remove_all.php",
			type: "GET",
			success: function () {
				alert("Cart successfully emptied");
				$("#cart").html("Empty");
				$("#remove-all").css("visibility", "hidden");
				$("#paypal").css("visibility", "hidden");
			},
			error: function () {
				alert("Failed to remove items from cart")
			}
		});
	}
}



function requestRemove(id, button)
{
	console.log(id,button)
	$.ajax
	({
		url: "../php/remove_item.php",
		type: "POST",
		data: {
			id: id
        },
		success: function ()
		{
			alert("Item successfully removed from cart");
			$(button).parent().remove();
			if ($("#cart").html() == '')
			{
				$("#cart").html("Empty");
				$("#remove-all").css("visibility", "hidden");
				$("#paypal").css("visibility", "hidden");
			}
		},
		error: function () {
			alert("Failed to remove item from cart")
		}
	});
}