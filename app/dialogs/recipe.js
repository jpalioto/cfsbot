const builder = require('botbuilder');
const cfsApi  = require('../utilities/apihandler.js');
const resources = require('../utilities/resources.js')

function parseResult(res)
{
    // TODO: Add parsing logic here as required.  For now, return the result.
    return res;
}

module.exports = function (bot) {
    bot.dialog('/recipeDialog', 
    [
        s => 
        { 
            var recipe = cfsApi.callApi('recipe', '1', parseResult);
            recipe.then( r => {s.send(r);} );
        }  
    ]);
};