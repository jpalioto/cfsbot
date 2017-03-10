const codes = [
    '2bebe5f5-027c-4401-aaf6-c323a8a4c684',
    '428199ac-eecc-4921-b7f8-0578d7e9e1e5'
];

module.exports = {
    recognize: function(context, callback) {

        var t = context.message.text;
        var isCode = codes.some(g => t === g);

        var recognized = {
            entities: [],
            intent: (isCode ? 'code' : null),
            matched: undefined,
            expression: undefined,
            intents: [],
            score: (isCode ? 1 : 0)
        }
        callback.call(null, null, recognized);
    }
};