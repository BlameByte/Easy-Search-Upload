Easy-Search-Upload
==================

This was created as an idea I have had for a while, which is basically being able to upload an image to a website by searching Google images. I believe this has some useful cases such as uploading an avatar (as most people will use an image from a tv show, film, game, or something they like). So I feel this is useful as they do not have to look for an image, save it to their computer, then upload it.

Features
=============

The user is able to choose between uploading a file from their computer or searching Google. Then the user may hover an image to preview it at a larger resolution or select an image from the results and submit it to be uploaded.

There is also a translation javascript file included which has basic translation for the following languages: English, French, Spanish and German. The translation module translates the text upon page load completion. The script detects the browser language and sets that to the defaults, but falls back on English if it is unable to detect the language or the language is not supported. The user may also select a language by clicking a language flag, and this effect takes into effect immediately without the need to refresh. Selecting a language will also store a cookie so it will stay in this language even if the page is reloaded.

There is a sample upload.php file included which is not recommended to be use for a production site, it is provided purely for as an example to demonstrate how it works. There are some checks in place to ensure it is a supported image, it is not too large (in terms of disk space). The image is uploaded with a random number (there is a check in place to ensure that it will not overwrite an existing image). However there are no checks to prevent duplicate images from being uploaded.

How it works
=============
The way the project works is that it uses Google Custom Search API. Which is basically an API which allows you to request search data to Google Images. It comes back as JSON data which is processed using JavaScript to display the images on the page. Each image has data assigned to it so when you select the image, you send upload.php the URL to the image on the internet. The PHP server then downloads and stores the image on the server.

Requirements
=============
As it was made to be simple and easy, the requirements are low:
- PHP Server to receive the uploaded / select search image.
- (?) Google Custom Search API (I have included mine in this example, but they allow up to 100 free requests per day, you can sign up for your own to have your own 100 free as mine will be shared between all).
- JavaScript enabled on client's browser (required for image searching).

Testing
=============
I have tested this project using a few different browsers, checking for bugs and adding to the user experience.

I have tested and can confirm it is working perfectly on:
- Google Chrome (38.0.2125.111)
- FireFox (33.0.2)
- Internet Explorer (11.0.9600.17358)

Also using W3C validator, I have also tested the HTML (index.html) which passed without any errors using XHTML 1.0 Transitional / utf-8.

Why was this created?
=============
It was an idea I had for a project I have had for a while, I always new it would be something to be intentionally simple and not too hard to create. So I had some free time so I looked up how to use the Google Custom Search API and got to work on the project. I also think it has use for certain applications and can be quite easily included into many existing sites.

How well did it turn out?
=============
I think it turned out pretty well, it was quite a quick project (as it is quite simple and limited on what I could add). That said I was thinking of adding more but ultimately I feel it is complete, I may come back to it if I have some good idea or if it has bugs / issues. Although I still have some ideas right now it is fine for now.

One of my favorite things is the translation JavaScript (translate.js), I feel that is has so much use and that was just an example of an additional feature I decided to add. I think it turned out really well, as it works, and my favorite part is that it is almost its own project. The fact that it could easily be standalone you could easily just take that file, add it to a page and add some translation lines and it would work!

I also thank Google for their good documentation and how easy it was to implement their API, also giving 100 requests each day for free. I would say that the code could do with some error management on the API side, like if you run out of requests, or if it can not contact the API for whatever reason.

But overall I am pretty satisified, it makes a good change to create a small project in my spare time and upload and share it with the public. It would be pretty awesome to see if anyone finds a use for it, even if nobody needs / wants it I still think it is a cool project.

index.html
=============
This file is basically all of the elements required for the base.js and for the project to work. It is basic with some simple css, it only uses one image (which is for the language flags). It is dependent on the base.js file to work, however the default tab uploading an image to the server should work fine without JavaScript. Also as the country flags are created by the translate.js file, they will also be missing.

There are various elements which are the tabs: tab_upload and tab_search. These tabs are not required as you could remove either allow them to both be displayed at the same time. They both use the changeTab(option) located in base.js to change the tab and with little change they could support 3 or more tabs.

The langselect element is used by translate.js, and displays the country flags. It is not required and can also be removed, it can also be hidden / remove with little editing while keeping the translate.js code working correctly (would only remove the functionally to manually change language, it can still auto detect browser language).

The two forms, once which is for the uploading of the image and the other which is for submitting a searched image. The forms are required, you only need one though, so you can remove one to disable that specific functionality. They are used by the translate.js, but you can easily remove their text. (see translate.js below for steps).

Finally the content element, this one is required for the searching images, and is where the images are placed when you search. The images are adding using the base.js file and you can use CSS to change various aspects, such as changing the width / height to make them all appear in a row / column. Or you can give it a background.

base.js
=============
This is the main file for this project, it has all of the functions like changing the tab (from upload or search) and all the functions required for the image search. There is also some a backup function for the image loading from searching for images. If the image does not load it will just display the thumbnail.

It holds everything required for this project to work, therefore it is the only script you actually need. It is not quite as user friendly as translate.js. However if you know the basics of JavaScript I am sure you could easily modify it.

The two most important functions for the search upload are loadImgs() and searchCB(response). The loadImgs() function requires the Google Custom Search API key and requests the search from Google Images. Once the search returns it callbacks to the searchCB(response) (and response is the JSON data from Google), which then is parsed into HTML added to the content DIV.

translate.js
=============
This is the file responsible for translating the page into the desired language, it also handles the cookie stored for saving the selected language, and also has all the translation phrases for each language.

This file has been made to be very robust, there is a translation(txt, lang) function which translation the desired text-id into the correct language. However it has the following in place to prevent it from failing: It checks to make sure that the language chosen exists for the specific text line, then it checks it in the defaultLanguage (defaults: English). So it will try to get the preferred language then fallback to English. 

This is definately the most versatile file in the project, as it could easily be taken and used in another completely different project in case you wanted a client-side translation solution. Nothing inside of this file conflicts or is required by the rest of the project, so you can safely remove it if you do not want the translation functionality. It has also been made to be quite easy to add more translation text and languages.

Here are the steps you must do in order to add translation line: 
- You must have a unique id element on the div, input, span, etc you want to translation (for example: tab_upload). 
- You must also add the translation lines to translate.js. To do this find the loadTxtStrings() function and add a new translation line.

Here is an example: txts.my_element_id= {'en': 'English', 'fr': 'French'};

You replace my_element_id with the id you created before, and the rest is formated as JSON. You can add as many languages as you please to any piece of text, however if a language is missing it will fall back to English (or whatever is set as defaultLang), so ensure that one is present under all translation lines.

upload.php
=============
This file is not recommended for production use, and is an example. It does have some safeguards in place to prevent misuse (like checking the disk space of the image, checking it is a supported image, and a few other checks). Due to the fact that it has only had basic prevents and has not been thoroughly tested or checked for security or performance issues.

This file is a small part of the project and as it is only for testing purposes it is intended to show you an example of how you can use the data from the search and upload to both check which method was used, how to download it from another server and so it can be properly tested.

This PHP file has a class inside, and uses the __construct() function to handle the submitted image. 

The getFilename($ext) function makes the script generate a random number and checks to make sure it doesn't exist. This is used for both uploading and searching for images, and is done because accepting the raw filename causes various issues (like 2 files having the same name, its name containing characters not allowed in file name, or malicious file names).

The deleteIfExists($filename) function basically checks to see if the file exists and deletes it. This is basically just to safely clean up any failed transfers, mostly in the case of downloading from another server.

The rest is up to the __construct() function which checks over the input, a useful way I used to check to see if the file was an upload or a search was first: $file = isset($_POST['upload']) ? $_POST['upload'] : $_FILES['upload']['name'];
Getting to the name of the file regardless of if it was part of $_FILES or $_POST, then checking with the substr function to see if the first 4 chracters contained http. Of course this is not an optimal way, but that is not the intention of this script.

So I would recommend either taking some parts which would make it easier to implement in your own project, or redoing / adding more safeguards to prevent security risks and better error tracking / handling. I believe there is a lot to be desired, however I do feel that it is a good start for a non production grade project.
