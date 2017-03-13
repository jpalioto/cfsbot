const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/helpDialog', 
    [
        s => 
        { 
            s.send('This bot can help you with Menus and Recipies.');
            s.endDialog();
        }    
    ]);
};