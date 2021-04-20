$(document).ready(function () {
	console.log("Initial AJAX Call Made");
	$.ajax
	({
		url: "../php/user_items.php",
		type: "get",
		dataType: "JSON",
		success: function (response) {
			console.log("Initial AJAX Call Successful");
			if (response.length == 0)
			{
				$("#remove-all").css("visibility", "hidden");
				$("#download").css("visibility", "hidden");
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
		alert("Cart successfully emptied");
	}
	document.getElementById("download").onclick = function ()
	{
		requestDownload();
	}
});



function onClickApplication(data, count, table)
{
	var row = "row-" + count;
	var button = document.createElement("button");
	button.innerHTML = "Remove";
	$(button).addClass("remove");
	table.append("<tr id='" + row + "'><td><img class='imgs' src='../Images/Full/" + data.link
		+ "' alt='" + data.link + "'/></td>"
		+ "<td>" + data.title + "</br>" + data.artist + "</td>"
		+ "<td>" + data.price + "</td></tr>"
	);
	$('#' + row).append(button);
	button.onclick = function () {
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
				$("#cart").html("Empty");
				$("#remove-all").css("visibility", "hidden");
				$("#download").css("visibility", "hidden");
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
				$("#download").css("visibility", "hidden");
			}
		},
		error: function () {
			alert("Failed to remove item from cart")
		}
	});
}

function requestDownload()
{
	var data = [];
	data[0] = document.createElement("button");
	data[0].innerHTML = "X";
	data[1] = "<p>You are about to download the following:</p>";

	var images = $(".imgs");
	console.log(images.length, images);
	for (var count = 0; count < images.length; count++)
	{
		data[count + 2] = "<p>" + $(images[count]).attr("alt") + "</p>";
		console.log(data[count + 2]);
	}

	for (var count = 0; count < data.length; count++)
	{
		$("#cartpanel").append(data[count].valueOf());
	}

	var button = document.createElement("button");
	button.innerHTML = "Download";

	$("#cartpanel").append(button);

	data[0].onclick = function ()
	{
		$("#cartpanel").empty();
		$("#body").removeClass("invisible");
    }

	button.onclick = function ()
	{
		downloadFiles();
		requestRemoveAll();
		alert("Files Downloaded");
		$("#cartpanel").empty();
		$("#body").removeClass("invisible");
		$("#download").css("visibility", "hidden");
	}

	$("#body").addClass("invisible");

}

//Code from user Dan at https://stackoverflow.com/questions/18451856/how-can-i-let-a-user-download-multiple-files-when-a-button-is-clicked

function downloadFiles()
{
	console.log("made it to download")
	var link = document.createElement("a");
	document.body.appendChild(link);

	var images = $(".imgs");

	for (var count = 0; count < images.length; count++)
	{
		var download = images[count];
		console.log($(download).attr("src"), $(download).attr("alt"));
		$(link).attr("href", $(download).attr("src"));
		$(link).attr("download", $(download).attr("alt"));

		link.click();
	}

	document.body.removeChild(link);
}

//End of code from user Dan at https://stackoverflow.com/questions/18451856/how-can-i-let-a-user-download-multiple-files-when-a-button-is-clicked