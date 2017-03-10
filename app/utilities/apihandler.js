const rp = require('request-promise')

module.exports = 
{
    callApi: function(root, args)
    {
        var devRootLoc = 'http://chefsforseniorstest.azurewebsites.net/api/';
        var rootLoc =  process.env.CFS_ENDPOINT || devRootLoc;

        var loc = rootLoc + root + (args ? args : '');

        return rp(loc)
            .then(function (result) {
                return JSON.parse(result);
            })
            .catch(function (err) {
                // Crawling failed...
            });
    }
}