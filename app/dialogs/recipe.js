const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/recipeDialog', 
    [
        s => 
        { 
            builder.Prompts.choice(s,'Which recipe?', 'A|B|C');
            
        },
        (s,r) =>
        {
            if( r.response.entity )
            {           
                var choice = r.response.entity;
                s.send('You chose ' + choice);
                s.endDialog();
            }
        }    
    ]);
};