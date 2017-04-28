const rp = require('request-promise')
const endpoints = require('./endpoints.js')
const resources = require('./resources.js')
const querystring = require('query-string')
const qs = require('qs')

module.exports = 
{
    callApi: function(root, args, callback)
    {
        var rootLoc =  process.env.CFS_ENDPOINT || endpoints.devRootLoc;

        // Make sure we have a trailing slash
        rootLoc = rootLoc.replace(/\/?$/, '/');

        // add in our argument
        var loc = rootLoc + root + (args ? '/' + args : '');

        var p = rp(loc)
            .then(function (result) {
                return callback(JSON.parse(result));
            })
            .catch(function (err) {
                console.log(resources.apiError, loc, err.message);
                throw err;
            });

            return p;
    },

    postApi: function( uri, body, headers )
    {
        var b = qs.parse(body);
        var h = qs.parse(headers);

        var options = {
            method: 'POST',
            uri: uri,
            form: b,
            headers: h,
            json: true
        };   

        var p = rp(options)
            .then(function (parsedBody) {
                return parsedBody;
            })
            .catch(function (err) {
                console.log(resources.apiError, err.message);
                throw err;
            });

        return p;
    }
}