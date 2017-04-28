const builder = require('botbuilder');
const resources = require('../utilities/resources.js');
const cfsApi  = require('../utilities/apihandler.js');
var endpoints  = require('../utilities/endpoints.js');

module.exports = function (bot) {
    bot.dialog('/membersDialog', 
    [
        s => 
        { 
            
            s.endDialog();
        }    
    ]);
};