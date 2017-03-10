var builder   = require('botbuilder');
var restify   = require('restify');
var _         = require('lodash');
var specialRec = require('./app/recognizers/special.js');

var connector = new builder.ChatConnector({
    appId: process.env.CFS_APP_ID,
    appPassword: process.env.CFS_APP_PASSWORD
});
var bot       = new builder.UniversalBot(connector);


var dialogs   = ['greeting', 'special', 'menu', 'recipe']
    .map(d => ({
        name: d,
        configureDialog: require('./app/dialogs/' + d)
    }));

// LUIS Setup
var luisKey      = '6e843ac045cb4497afa2e39230d62778';  // Dev Key
var luisEndpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5e02a94a-8f45-498c-94c3-99e5884cd053?subscription-key=6e843ac045cb4497afa2e39230d62778&staging=true&verbose=true&q=';
var intents = new builder.IntentDialog({
    recognizers: [
        specialRec,
        new builder.LuisRecognizer(process.env.LUIS_ENDPOINT || luisEndpoint)
    ],
    intentThreshold: 0.5,
    recognizeOrder: builder.RecognizeOrder.series
});

// Bot global events
bot.on('deleteUserData', m => { /* TODO: delete the user data */ });
bot.on('contactRelationUpdate', m => {
    if (m.action === 'add') {
        var name = m.user ? m.user.name : null;
        var reply = new builder.Message()
            .address(m.address)
            .text("Welcome %s... I can help you find Recipes and Menus.");
        bot.send(reply);
    } else {
        // TODO: delete user data
    }
});

bot.endConversationAction('goodbye', 'Goodbye to you.', { matches: /^goodbye/i });
bot.beginDialogAction('help', '/helpDialog', { matches: /^help/i });

// Begin dialogs
// intents.onDefault('/helpDialog');
dialogs.forEach(d => intents.matches(d.name, '/' + d.name + 'Dialog'));
bot.dialog('/', intents);
dialogs.forEach(d => d.configureDialog(bot));

// Create REST endpoint.  
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function() {
    console.log('%s listening at %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());