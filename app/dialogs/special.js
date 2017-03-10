const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/specialDialog', 
    [
        s => 
        { 
            if( s.message.text =='2bebe5f5-027c-4401-aaf6-c323a8a4c684')
            {
                bot.beginDialog('/menuDialog');
            } 
            else if( s.message.text == '428199ac-eecc-4921-b7f8-0578d7e9e1e5')
            {
                bot.beginDialog('/recipeDialog');
            }
            s.endDialog();
        }    
    ]);
};