$(document).ready(function ()
{
	$(document).keyup(function (e)
	{
		if (e.which === 13) {
			search();
		}
	});
});

function search()
{
	var images = createImages(initialResponse);
	var data = document.getElementById("search").value.toLowerCase();
	console.log(data);
	for (var count = 0; count < images.length; count++)
	{
		var item = images[count].children[0];

		console.log($(item).attr("data-artist"), $(item).attr("data-desc"), $(item).attr("data-price"))

		if (!$(item).attr("src").substring(String.prototype.indexOf($(item).attr("src"))).toLowerCase().includes(data) &&
			!$(item).attr("data-desc").toLowerCase().includes(data) &&
			!$(item).attr("data-artist").toLowerCase().includes(data) &&
			!$(item).attr("data-price").toLowerCase().includes(data))
		{
			$(item).addClass("invisible");
		}
		else
		{
			$(item).removeClass("invisible");
		}
	}

	var visible = [];
	for (var count = 0; count < images.length; count++)
	{
		var item = images[count].children[0]
		if (!item.classList.contains("invisible"))
		{
			visible.push(item);
		}
	}
	console.log(visible);
	if (visible.length == 0)
	{
		//visbile empty text here
	}
	else
	{
		$("#pictable").empty();
		$("#panel").empty();
		organizeImages(visible, 3);
		applyPanel();
	}
}