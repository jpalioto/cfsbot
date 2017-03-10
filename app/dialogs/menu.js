const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/menuDialog', 
    [
        s => 
        { 
            s.send('Menu dialog');
            s.endDialog();
        }    
    ]);
};