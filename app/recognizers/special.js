const _ = require('lodash')

module.exports = {
    // This function will return an array of objects with a code and the dialog to call.
    // To add additional buttons, post back a GUID, add the GUID and the dialog you want here
    // and create a dialog handler in the /dialogs folder.
    getCodes: function()  {
        var codes = ['2bebe5f5-027c-4401-aaf6-c323a8a4c684', '428199ac-eecc-4921-b7f8-0578d7e9e1e5'];
        var diags = ['menu', 'recipe'];

        return _.zipWith(codes, diags, (c,d) => { return { code: c, dialog: d}; } ); 
    },
    recognize: function(context, callback) {
        var t = context.message.text;
        var isCode = this.getCodes().some(c => c.code === t);

        var result = {
            entities: [],
            intent: (isCode ? 'special' : null),
            matched: undefined,
            expression: undefined,
            intents: [],
            score: (isCode ? 1 : 0)
        }
        callback.call(null, null, result);
    }
};