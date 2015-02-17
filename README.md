# Lob Coding Exercise
This is a repository for a Node.js project I worked on for the Lob Coding Challenge.

## Dependencies
* [Imagemagick](http://www.imagemagick.org/)

## Run Server
	
	node index.js


##Challenge
Build an API that converts a file into an array of thumbnails (one for each page) and then responds with URLs for each generated thumbnail. 

###Output:
* One PNG thumbnail for each page of the PDF input
* Each thumbnail should be served with the format `<name>_thumb_<page_number>.png`
	* i.e. You can view the created thumbnails by going to `http://localhost:8000/thumbs/<file_name>`
* Response:
	* array of objects that have a name and url key i.e. 
	  `[{ name: “myupload”, url: ‘http://localhost:8000/thumbs/myupload_thumb_page_1.png’}]`
* Limitations
	* Input can only be a PDF
	* Start with the Hapi (https://github.com/hapijs/hapi) skeleton provided by Lob
	* You may not use any Node packages for the file conversion (such as https://github.com/rsms/node-imagemagick)
	* You may use any of the core Node APIs (http://nodejs.org/api/all.html)
	* You may use any of the modules included in the package.json
	* You may use outside command line programs such as:
		* http://www.imagemagick.org/
		* http://www.graphicsmagick.org/
		* https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/

