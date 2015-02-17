var fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn;

var converter = function(req, res) {
    var upload = req.payload.fileUpload;
    if (upload) {
        var temppath = __dirname + '/tmp/' + upload.hapi.filename;
        var file = fs.createWriteStream(temppath);

        upload.pipe(file);
        upload.on('end', function (err) {
            if (!err) {
                var filename = path.basename(temppath, '.pdf');
                var thumbpath = __dirname + '/thumbs/';
                var pngOutput = thumbpath + filename + '_thumb_page_%d.png';

                var commandArray = [temppath, '-scene', 1, pngOutput];
                var command = spawn('convert', commandArray);

                command.stderr.on('data', function(data) {
                    return res('Unable to create thumbnails from uploaded document.').code(400);
                });
                command.on('close', function() {
                    // Using ls & grep command to get files,
                    // fs.readDir does not provide filtering.
                    var allthumbs = spawn('ls', [thumbpath]);
                    var thumblist = spawn('grep', [filename]);

                    allthumbs.stderr.on('data', function(data) {
                        return res('Failed to locate thumbs').code(500);
                    })

                    allthumbs.stdout.on('data', function(data) {
                        thumblist.stdin.write(data);
                    })

                    allthumbs.on('close', function(code) {
                        if (code !== 0) {
                            console.log('ls process exited with code ' + code);
                        }
                        thumblist.stdin.end();
                    })

                    thumblist.stderr.on('data', function (data) {
                        return res('Failed to locate thumbs').code(500);
                    });

                    thumblist.stdout.on('data', function (data) {
                        var output = data.toString().split('\n');

                        var response = [];
                        output.forEach(function(thumb){
                            if (thumb.length > 0) {
                                response.push({
                                    name: filename,
                                    url: req.headers.origin + '/thumbs/' + thumb
                                });
                            }
                        });
                        // Clean up and respond.
                        fs.unlinkSync(temppath);
                        return res(response);
                    });
                });
            } else {
                return res("File was unable to upload to server, please try again.").code(400);
            }
        });
    } else {
        return res("Please attach a file to upload.").code(400);
    }
}

module.exports = converter;
