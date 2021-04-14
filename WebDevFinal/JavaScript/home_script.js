window.onload = function() {

	//store all images and create image element for each image in html page.
	var images = document.querySelectorAll("img");

	for (var x = 0; x < images.length; x++) {
		var originalImage = images[x];
		var newImage = document.createElement("IMG");

		originalImage.onclick = function() {
			var src = this.getAttribute("src");
			this.setAttribute("src", src);
			this.setAttribute("width", "500");
			this.setAttribute("height", "300");
			document.getElementById('bottom').appendChild(this);
			//this.parentNode.appendChild(newImage);
		};

		newImage.onclick = function() {
			originalImage.style.visibility = 'visible';
			this.remove(this);
		};
	}
}