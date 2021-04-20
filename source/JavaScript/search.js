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
	for (var count = 0; count < images.length; count++)
	{
		var item = images[count].children[0];

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
	$("#pictable").empty();
	$("#panel").empty();

	if (visible.length == 0)
	{
		$("#error").append("No Items Found");
	}
	else
	{
		$("#error").empty();
		organizeImages(visible, 3);
		applyPanel();
	}
}