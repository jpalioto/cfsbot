const builder = require('botbuilder');
const cfsApi  = require('../utilities/apihandler.js');

const resources = require('../utilities/resources.js')

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
                    resources.menuIngredients, 
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