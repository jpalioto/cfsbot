const builder = require('botbuilder');
const codes = require('../recognizers/special.js');

module.exports = function (bot) {
    bot.dialog('/specialDialog', 
    [
        s => 
        { 
            var t = s.message.text;
            var code = codes.getCodes().find( c => { if( c.code == t ) return c; } );
            if( code ) { s.replaceDialog('/' + code.dialog + 'Dialog'); }

            s.endDialog();
        }    
    ]);
};