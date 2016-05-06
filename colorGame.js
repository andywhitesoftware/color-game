var numSquares = 6;
var colors = [];

var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var newColorsBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// set up mode buttons event listeners
	setupModeButtons();
	setupSquares();

	reset();
}

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			// determine how many squares to show
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			// pick new colors
			// pick new pickedColor
			// update page to reflect changes
			reset();
		});
	}

}

function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// grab color of clicked square
			var clickedColor = this.style.background;
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				newColorsBtn.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			}
			else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);

	// pick a new random color from array
	pickedColor = selectRandomColor();

	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;

	// set message to reflect no text
	messageDisplay.textContent = "";

	// changed button text to reflect "new colors"
	newColorsBtn.textContent = "New Colors";

	// change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];		
		}
		else {
			squares[i].style.display = "none";
		}	
	}

	h1.style.background = "steelblue";

}

newColorsBtn.addEventListener("click", function() {
	reset();
});

function changeColors(color) {
	// loop through all squares
	for(i = 0; i < squares.length; i++) {
		// change each color to match picked color
		squares[i].style.background = color;
	}
}

function selectRandomColor() {
	var randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];
}

function generateRandomColors(num) {
	// make an empty array
	var randomColors = [];

	// add num random colors to the array
	for(var i = 0; i < num; i++) {
		// get random color and push into randomColors array
		randomColors.push(randomColor());
	}
	// return new color array
	return randomColors;
}

function randomColor() {
	// select a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	// select a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	// select a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);

	// return random color
	return "rgb(" + r + ", " + g + ", " + b + ")";
}