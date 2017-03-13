const builder = require('botbuilder');
const resources = require('../utilities/resources.js');

module.exports = function (bot) {
    bot.dialog('/helpDialog', 
    [
        s => 
        { 
            s.send(resources.helpText);
            s.endDialog();
        }    
    ]);
};