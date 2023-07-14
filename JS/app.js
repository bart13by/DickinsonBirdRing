//app.js


function main()
{
	const ringbox = document.getElementById('ring-container');
	window.addEventListener('DOMContentLoaded', centerElement);
	let zoomed = false;
	// let currentTransX = -25;
	// let currentTransY = 25;
	let scale = 1;
	let zoomScale = 2;

	

	function getQuandrant(event) {
	  
	  const rect = container.getBoundingClientRect();
	  const mouseX = event.clientX - rect.left;
	  const mouseY = event.clientY - rect.top;
	  const width = container.clientWidth;
	  const height = container.clientHeight;

	  if (mouseX < width / 2) {
	    if (mouseY < height / 2) {
	      return "NW";
	    } else {
	      return "SW";
	    }
	  } else {
	    if (mouseY < height / 2) {
	      return "NE";
	    } else {
	      return "SE";
	    }
	  }

	}

	function centerElement() {
	  //var element = document.getElementById('element');
	  ringbox.style.visibility = 'hidden'; // Hide the element initially to prevent flickering

	  // Center the element vertically and horizontally
	  const windowHeight = window.innerHeight;
	  const windowWidth = window.innerWidth;
	  const elementHeight = ringbox.offsetHeight;
	  const elementWidth = ringbox.offsetWidth;

	  ringbox.style.top = (windowHeight / 2) - (elementHeight / 2) + 'px';
	  ringbox.style.left = (windowWidth / 2) - (elementWidth / 2) + 'px';

	  ringbox.style.visibility = 'visible'; // Make the element visible again
	}
	

	function onClickHandler(event)
	{
		
		if (zoomed)
		{
			zoomed = false;
			var circles = document.getElementsByClassName("circle");
			// Loop through each circle and hide it
			for (var i = 0; i < circles.length; i++) {
			    circles[i].style.display = "none";
			}

			ringbox.style.transform = `scale(${scale})`;	
			centerElement();

		}
		else
		{
			zoomed = true;
			let tx = ringbox.offsetWidth / 4
			let ty = ringbox.offsetHeight / 4;

			switch (getQuandrant(event))
			{
			case 'NW':
		drawCircles();		
				break;
			case 'NE':
				tx = -tx;
				break;
			case 'SW':
				ty = -ty;
				break;
			case 'SE':
				tx = -tx;
				ty = -ty;
				break;

			}

			console.log(`tx: ${tx} yx: ${ty}`);
			ringbox.style.transform = `scale(${zoomScale}) translate(${tx - 5}px, ${ty + 20}px)`;	

			
		}
	}
	function drawCircles() {
		console.log("draw circles");
		// Number of circles to create
		var numCircles = 24;

		// Northwest quadrant dimensions
		var quadrantWidth = window.innerWidth / 2;
		var quadrantHeight = window.innerHeight / 2;

		// Create circles and position them randomly in the Northwest quadrant
		var container = document.getElementById("container");
		for (var i = 0; i < numCircles; i++) {
		    var radius = getRandomNumber(6, 18);
		    var circle = createCircle(radius);

		    var position = getRandomPosition();
		    var xPos = position.x;
		    var yPos = position.y;

		    // Make sure the circle is within the Northwest quadrant
		    xPos = Math.min(xPos, quadrantWidth - radius);
		    yPos = Math.min(yPos, quadrantHeight - radius);

		    circle.style.left = xPos + "px";
		    circle.style.top = yPos + "px";
		    circle.style.backgroundColor = getBgColor();

		    container.appendChild(circle);
	}

	function getBgColor(){
		const array = ["beige", "salmon", "lightgreen", "lightblue", "tan", "lightorange"];
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}
		
	// Function to generate a random number between min and max (inclusive)
	function getRandomNumber(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// Function to generate a random position within the Northwest quadrant
	function getRandomPosition() {
	    var x = getRandomNumber(0, window.innerWidth / 2);
	    var y = getRandomNumber(0, window.innerHeight / 2);
	    return { x, y };
	}

	// Function to create a circle element with a random radius
	function createCircle(radius) {
	    var circle = document.createElement("div");
	    circle.className = "circle";
	    circle.style.width = radius * 2 + "px";
	    circle.style.height = radius * 2 + "px";
	    
	    return circle;
	}



	}

window.addEventListener('click', onClickHandler);

}



