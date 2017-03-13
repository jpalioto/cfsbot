const builder = require('botbuilder');
const cfsApi  = require('../utilities/apihandler.js');

const resources = require('../utilities/resources.js')

function parseResult(res)
{
    var mealItems = [];
    res.forEach( e => {
        e.MealItems.forEach( mi => mealItems.push(mi.Name) );
    });

    return mealItems;
}

module.exports = function (bot) {
    bot.dialog('/menuDialog', 
    [
        (s) => 
        { 
            var  mealItems;
            var menu = cfsApi.callApi('menu', null, parseResult);

            menu
                .then( mealItems => {
                    builder.Prompts.choice(s, 
                        resources.menuIngredients, 
                        mealItems.join('|'),
                        {
                            listStyle: builder.ListStyle.list
                        })
                    }
                )
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