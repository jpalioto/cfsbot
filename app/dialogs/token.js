const builder = require('botbuilder');
const resources = require('../utilities/resources.js');
const cfsApi  = require('../utilities/apihandler.js');
var endpoints  = require('../utilities/endpoints.js');

module.exports = function (bot) {
    bot.dialog('/tokenDialog', 
    [
        s => 
        { 
            var clientId     = process.env.CLIENT_ID || endpoints.devClientID;
            var clientSecret = process.env.CLIENT_SECRET || endpoints.devClientSecret;

            var uri = endpoints.msftOAuth;
            var body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default`;
            var headers = 'content-type=application/x-www-form-urlencoded';
            var res = cfsApi.postApi(uri, body, headers);
            res.then( p => { s.send(`Your token is ${p.access_token}`); } );
        
            s.endDialog();
        }    
    ]);
};