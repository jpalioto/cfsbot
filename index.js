var builder   = require('botbuilder');       // Include the bot framework
var restify   = require('restify');          // Used to expose bot to REST endpoint
var _         = require('lodash');           // Utility

// This is where we recgonize codes that come back from the herocard buttons.
var specialRec = require('./app/recognizers/special.js');  

// API Endpoints
var endpoints  = require('./app/utilities/endpoints.js');

// String resources
var resources = require('./app/utilities/resources.js');

// Common utilities
var common    = require('./app/utilities/common.js');

// Chat connector will enable many endpoints like Teams, Skype
var connector = new builder.ChatConnector({
    appId: process.env.CFS_APP_ID,
    appPassword: process.env.CFS_APP_PASSWORD
});

// The main bot
var bot       = new builder.UniversalBot(connector);

// List of our dialogs.  Dialogs trees must be named nameDialog.  For example, menuDialog.
// Configure each dialog by requiring it's implementation and giving it a name to start it later.
var dialogs   = ['greeting', 'special', 'menu', 'recipe', 'help']
    .map(d => ({
        name: d,
        configureDialog: require('./app/dialogs/' + d),
        heroDialog: false
    }));

// Configure a list of dialogs we want to have accessed from buttons on our HeroCard
var heroDialogs = ['menu', 'recipe'];
heroDialogs.forEach( hd => { _.find(dialogs, d => d.name === hd).heroDialog = true; } );


// LUIS Setup
var intents = new builder.IntentDialog({
    recognizers: [
        specialRec,
        new builder.LuisRecognizer(process.env.LUIS_ENDPOINT || endpoints.luisDevEndpoint)
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
            .text(resources.contactAdd);
        bot.send(reply);
    } else {
        // TODO: delete user data
    }
});

bot.endConversationAction('goodbye', resources.goodbyeText, { matches: /^goodbye/i });
bot.beginDialogAction('help', '/helpDialog', { matches: /^help/i });

// Begin dialogs
// intents.onDefault('/helpDialog');
dialogs.forEach(d => intents.matches(d.name, common.createDialogName(d.name)));
dialogs.forEach(d => d.configureDialog(bot));
bot.dialog('/', intents);

// This will wire-up begin dialog actions for each dialog.  We can then
// add those to the button dialogs on the HeroCard.
dialogs.forEach(d => 
{	
    var dia = bot.dialogs[common.createDialogName(d.name)];
	if(dia && d.heroDialog)
    {
        bot.beginDialogAction(d.name, common.createDialogName(d.name));
    }
});

// Create REST endpoint.  
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function() {
    console.log('%s listening at %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());