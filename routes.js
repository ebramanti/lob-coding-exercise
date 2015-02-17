var Joi = require('joi'),
    converter = require('./converter');

var pdfSchema = {
    fileUpload: Joi.object({
        hapi: Joi.object({
            filename: Joi.string().min(5).regex(/^.*\.(pdf)$/ig).required()
        }).unknown()
    }).unknown()
};

var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function(req, res) {
            //return upload page here
            res.file('index.html')
        }
    },
    {
        method: 'POST',
        path: '/convert',
        handler: converter,
        config: {
            payload: {
                output: 'stream',
                // Max size for PDF upload is 100MB
                maxBytes: 104857600
            },
            validate: {
                payload: pdfSchema
            }
        }
    },
    {
        method: 'GET',
        path: '/thumbs/{thumb*}',
        handler: {
            directory: {
                path: './thumbs'
            }
        }
    }
];

module.exports = routes;
