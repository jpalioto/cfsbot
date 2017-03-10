const builder = require('botbuilder');
const createHeroCard = require('../utilities/heroCard.js');

module.exports = function (bot) {
    bot.dialog('/greetingDialog', 
    [
        s => 
        { 
            s.send("Welcome to CFS!");
            var card = createHeroCard(s);
            var msg = new builder.Message(s).addAttachment(card);
            s.send(msg);
            s.endDialog();
        }    
    ]);
};