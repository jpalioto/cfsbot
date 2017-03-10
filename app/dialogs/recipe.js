const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/recipeDialog', 
    [
        s => 
        { 
            s.send('recipe dialog');
            s.endDialog();
        }    
    ]);
};