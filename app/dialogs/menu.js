const builder = require('botbuilder');
const cfsApi  = require('../utilities/apihandler.js');

const menuPrompts = ['What menu item would you like ingredients for?']

module.exports = function (bot) {
    bot.dialog('/menuDialog', 
    [
        (s,r,n) => 
        { 
            var menu = cfsApi.callApi('menu');
            var  mealItems = [];

            menu.then( res => {
                
                res.forEach( e => {
                    
                    e.MealItems.forEach( mi => mealItems.push(mi.Name) );

                });

                builder.Prompts.choice(s, 
                    'Which menu item would you like ingredients for?', 
                    mealItems.join('|'),
                    {
                        listStyle: builder.ListStyle.list
                    });
            });
        },
        (s,r,n) =>
        {
            // TODO: Get menu items for choice
            var choice = r.response.entity;
            s.send('You chose ' + choice);
            s.endDialog();
        }    
    ]);
};