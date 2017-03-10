const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/helpDialog', 
    [
        s => 
        { 
            s.send('Help dialog');
            s.endDialog();
        }    
    ]);
};