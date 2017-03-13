const builder = require('botbuilder');
const codes = require('../recognizers/special.js');

module.exports = function (bot) {
    bot.dialog('/specialDialog', 
    [
        (s,r,n) => 
        { 
            var t = s.message.text;
            var code = codes.getCodes().find( c => { if( c.code == t ) return c; } );
            if( code ) { s.beginDialog('/' + code.dialog + 'Dialog'); }

            // We do not want to end or next the dialog here.  Speical will being Menu and then
            // menu can present choices.  If we end or next the dialog here, Menu's waterfall cannot
            // continue.
        }    
    ]);
};