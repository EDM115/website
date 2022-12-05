/*
function themeify() {
	if (document.getElementById("theme").classList.contains("bx-moon")) {
		document.getElementById("theme").classList.remove("bx-moon");
		document.getElementById("theme").classList.add("bx-sun");
	} else if (document.getElementById("theme").classList.contains("bx-sun")) {
		document.getElementById("theme").classList.remove("bx-sun");
		document.getElementById("theme").classList.add("bx-moon");
	}
	toggleTheme();
	if (window.location.hash === "#theme") {
		window.location.hash = "";
		history.replaceState("", "", location.pathname)
	}
	let presentURL = window.location.href;
	if  ( presentURL.endsWith('#') ) {
		presentURL.replace(/#(\S)/g, '$1');
		window.location.href = presentURL;
	}
}

window.onload = function(){
	document.getElementById("theme").addEventListener("click", themeify);
	document.getElementById("theme2").addEventListener("click", themeify);
}

// function to toggle between day and night theme
function toggleTheme() {
	if (localStorage.getItem("theme") === "day"){
		setTheme("night");
	} else {
		setTheme("day");
	}
}
// function to set a given theme/color-scheme
function setTheme(themeName) {
	localStorage.setItem("theme", themeName);
	document.getElementById("themeify").className = themeName;
}
// Immediately invoked function to set the theme on initial load
(function () {
	if (localStorage.getItem("theme") === "night") {
		setTheme("night");
		document.getElementById("theme").classList.remove("bx-moon");
		document.getElementById("theme").classList.add("bx-sun");
	} else {
		setTheme("day");
		document.getElementById("theme").classList.remove("bx-sun");
		document.getElementById("theme").classList.add("bx-moon");
	}
 })();
*/

// Make the gradient angle evolving on scroll

let last_known_scroll_position = 0;
let ticking = false;
const body = document.querySelector('body');
const html = document.querySelector('html');

function gradAngle(scroll_pos) {
	const bodyHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	// set scrollPercentage, if we have available scroll (0 otherwise):
	const availableScroll = bodyHeight - viewportHeight;
	const percentage = availableScroll > 0 ? scroll_pos * 100/availableScroll : 0;
	const fromPercent = (from,to,current) => ((to - from) * current/100) + from;
	body.style.backgroundImage = `
	linear-gradient(${fromPercent(0, 360, percentage)}deg, rgba(60,153,111,1) 0%, rgba(179,27,158,1) 40%, rgba(217,201,51,1) 100%)
	`;
}

window.addEventListener('scroll', function(e) {
	last_known_scroll_position = window.scrollY;
	if (!ticking) {
		window.requestAnimationFrame(function() {
    		gradAngle(last_known_scroll_position);
			ticking = false;
		});
	ticking = true;
	}
});

// Initiate the Plyr instances

const plyrplayer1 = new Plyr('#plyr-player-1', {
	"settings": ["quality", "speed", "loop"],
	"quality": {
		"default": 480,
		"options": [144, 360, 480, 720, 1080, 1440, 2160]
	},
	"youtube": {
		"controls": 0,
		"disablekb": 1,
		"iv_load_policy": 3,
		"modestbranding": 1,
		"origin": "https://edm115.eu.org/underrated"
	}
});
window.player = plyrplayer1;

const plyrplayer2 = new Plyr('#plyr-player-2', {
	"settings": ["quality", "speed", "loop"],
	"quality": {
		"default": 480,
		"options": [144, 360, 480, 720, 1080, 1440, 2160]
	},
	"youtube": {
		"controls": 0,
		"disablekb": 1,
		"iv_load_policy": 3,
		"modestbranding": 1,
		"origin": "https://edm115.eu.org/underrated"
	}
});
window.player = plyrplayer2;

const plyrplayer3 = new Plyr('#plyr-player-3', {
	"settings": ["quality", "speed", "loop"],
	"quality": {
		"default": 480,
		"options": [144, 360, 480, 720, 1080, 1440, 2160]
	},
	"youtube": {
		"controls": 0,
		"disablekb": 1,
		"iv_load_policy": 3,
		"modestbranding": 1,
		"origin": "https://edm115.eu.org/underrated"
	}
});
window.player = plyrplayer3;


// Dynamic hyperlinking for archives
// Reference : https://stackoverflow.com/questions/61810147/dynamic-hyperlink-in-html
/*
var archive1 = document.getElementById("archive1");
var archive2 = document.getElementById("archive2");
var archive3 = document.getElementById("archive3");
*/
/*Date.prototype.getWeek = function () {
  var firstOfJanuary = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - firstOfJanuary) / 86400000) + firstOfJanuary.getDay() + 1) / 7);
};*/
/**
* Returns the week number for this date.  dowOffset is the day of week the week
* "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
* the week returned is the ISO 8601 week number.
* @param int dowOffset
* @return int
*/
/*
Date.prototype.getWeek = function (dowOffset) {
	dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 1; //default dowOffset to one
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - 
	(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			// if the next year starts before the middle of the week, it is week #1 of that year
			weeknum = nday < 4 ? 1 : 53;
		}
	}
	else {
		weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};

var todaysDate = new Date();
var formattedDate1 = todaysDate.getFullYear() + '/' + (todaysDate.getWeek() + 1);
var formattedDate2 = todaysDate.getFullYear() + '/' + todaysDate.getWeek();
var formattedDate3 = todaysDate.getFullYear() + '/' + (todaysDate.getWeek() - 1);

archive1.setAttribute("href", "./" + formattedDate1);
archive2.setAttribute("href", "./" + formattedDate2);
archive3.setAttribute("href", "./" + formattedDate3);

if (todaysDate.getWeek() == 1) {
  archive3.setAttribute("href", "./" + (todaysDate.getFullYear() - 1) + '/52');
}
if (todaysDate.getWeek() == 52) {
  archive1.setAttribute("href", "./" + (todaysDate.getFullYear() + 1) + '/1');
}
if (todaysDate.getFullYear() + '/' + todaysDate.getWeek() == formattedDate1) {
	archive1.style.display = "none";
}
if (window.location.href.split("/")[-2] == "2022" && window.location.href.split("/")[-1] == "38") {
	archive3.style.display = "none";
}
if (todaysDate.getFullYear() == "2022" && todaysDate.getWeek() == "38") {
	archive3.style.display = "none";
}
*/