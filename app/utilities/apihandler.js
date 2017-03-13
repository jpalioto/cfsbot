const rp = require('request-promise')
const endpoints = require('./endpoints.js')
const resources = require('./resources.js')

module.exports = 
{
    callApi: function(root, args)
    {
        var rootLoc =  process.env.CFS_ENDPOINT || endpoints.devRootLoc;

        var loc = rootLoc + root + (args ? args : '');

        return rp(loc)
            .then(function (result) {
                return JSON.parse(result);
            })
            .catch(function (err) {
                console.log(resources.apiError, loc, err.message);
                throw err;
            });
    }
}