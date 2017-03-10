const builder = require('botbuilder');
const cfsApi  = require('../utilities/apihandler.js');

module.exports = function (bot) {
    bot.dialog('/menuDialog', 
    [
        s => 
        { 
            var menu = cfsApi.callApi('menu');

            menu.then( res => {

                res.forEach( e => {
                    e.MealItems.forEach( mi => {
                        s.send(mi.Name);
                    })
                } );

                s.endDialog();
            });
        }    
    ]);
};