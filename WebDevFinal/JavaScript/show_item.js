
function item(list)
{
	console.log(list[0])
	console.log(list[1])
	console.log(list[2])
	console.log(list[3])
	console.log(list[4])

	document.writeln(
		'<tr id="item-' + list[0] + '">' +
		'<td><img src="' + list[4] + '" alt="' + list[0] + '"/></td>' + 
		'<td>' + list[0] + '</br>' + list[1] + '</td>' +
		'<td>' + list[3] + '</br><input="button" value="Remove" class="remove" id="remove-' + list[0] + '"/></tr>'
	);
	document.getElementById("remove-" + list[0]).addEventListener("click", e => 
	{
		document.getElementById("item-" + list[0]).remove();
		document.writeln(
			'<?php +
				
			?>')
	});

}
