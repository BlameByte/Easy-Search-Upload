// This is the base.js from Easy Search Upload project.
// If you need help in editing this or need more details check: https://github.com/BlameByte/Easy-Search-Upload#basejs.

// This function changes the tab from either uploading a file or to searching for a file.
function changeTab(option) {
	if (option == 'search') {
		document.getElementById('upload').style.display = 'none';
		document.getElementById('search').style.display = 'block';
	} else {
		document.getElementById('search').style.display = 'none';
		document.getElementById('upload').style.display = 'block';
	}
}

// This function loads a script by url, it is used for the Google Custom Search API callback.
function loadScript(url) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
}

// This function calls the Google Custom Search API, which creates a new JavaScript element, which then callbacks the searchCB(response) function.
function loadImgs() {
	var key = 'AIzaSyAUF6p70gh0uB6eWfrd7q7NQX5aB_dQFW0';
	var cx = '003201412322273164230:dzwud6n2cq0';
	var q = document.getElementById('q').value;
	loadScript('https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+q+'&searchType=image&callback=searchCB');
}

// This function enlarges the image you are hovering over when you are searching for images.
function enlargeImg(img, src, toggle) {
	var html = '';
	var enlarge = document.getElementById('enlarge');
	if (toggle) {
		html = '<img src="'+src+'" onerror="backupThumnail(this, \''+img.src+'\')"/>';
		enlarge.style.display = 'block';
		up(this);
	} else {
		enlarge.style.display = 'none';
		down(this);
	}
	enlarge.innerHTML = html;
}

var lastimg = null;
// This function selects the image when you click it turns red and is passed into a hidden textbox to be sent to upload.php.
function selectImg(img, src) {
	if (lastimg != null && lastimg != img) {
		lastimg.style.border = '1px solid blue';
	}
	img.style.border = '1px solid red';
	lastimg = img;
	var simg = document.getElementById('simg');
	simg.value = src;
}

// This function adds an EventListener when the mouse is moved.
function up(e) {
	window.addEventListener("mousemove", move, true);
	enlarge.style.cursor="move";
}

// This function removes an EventListener when the mouse is moved.
function down(e) {
	window.removeEventListener("mousemove", move, true);
	enlarge.style.cursor="default";
}

// This function moves the enlarged image to track the mouse cursor.
function move(e) {
	enlarge.style.left = e.clientX + "px";
	enlarge.style.top = e.clientY+10 + "px";
}

// This function is when the large image URL cannot load and will fallback to the small thumbnail.
function backupThumnail(img, src) {
	img.src = src;
}

// This function does the callback from the loadImgs() function which has the search results from Google Images, it is then processed and added to the content element.
function searchCB(response) {
	document.getElementById("content").innerHTML = '';
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		var image = item.image;
		document.getElementById("content").innerHTML += '<div class="image" onclick="selectImg(this, \''+item.link+'\')"><img width="'+image.thumbnailWidth+'" height="'+image.thumbnailHeight+'" src="'+image.thumbnailLink+'" onmouseover="enlargeImg(this, \''+item.link+'\', true)" onmouseout="enlargeImg(this, \'\', false)"/></div>';
	}
}