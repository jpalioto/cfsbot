var builder   = require('botbuilder');
var restify   = require('restify');

var connector = new builder.ChatConnector();
var bot       = new builder.UniversalBot(connector);

// LUIS Setup
var luisKey      = '6e843ac045cb4497afa2e39230d62778';  // Dev Key
var luisEndpoint = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/53c69b39-1f0d-4ba1-ad05-a75c066375be?subscription-key=' + luisKey + '&verbose=true&q=";
var recognizer   = new builder.LuisRecognizer(luisEndpoint);
var intents      = new builder.IntentDialog({ recognizers: [recognizer]});


bot.dialog('/', intents)
    // Match from the hero card postbacks.
    .matches('2bebe5f5-027c-4401-aaf6-c323a8a4c684', 'menuDialog')
    .matches('428199ac-eecc-4921-b7f8-0578d7e9e1e5', 'recipeDialog')

    // Start LUIS
    .matches('Greeting', [
        session => {
            session.send("Welcome to CFS!");
            var card = createHeroCard(session);
            var msg = new builder.Message(session).addAttachment(card);
            session.send(msg);
        }
    ])
    .matches('Menu', [
        s => { s.beginDialog('/menuDialog'); }
    ])
    .matches('Recipe', [
        s => { s.beginDialog('/recipeDialog'); }
    ])

// Build out our hero card.  FPO right now.
function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('CFS Options')
        .subtitle('')
        .text('Which would you like more information on?')
        .images([
            builder.CardImage.create(session, '')
        ])
        // In order to change our conversation based on button press, we post back a GUID messages
        // to the bot.  This will not be seen by the user.  We 
        .buttons([
            builder.CardAction.postBack(session, "2bebe5f5-027c-4401-aaf6-c323a8a4c684"),
            builder.CardAction.postBack(session, "428199ac-eecc-4921-b7f8-0578d7e9e1e5")           
        ]);
    }

// Create REST endpoint.  Take the env variable if we are in Azure or use the default for loadl.
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function() {
    console.log('%s listening at %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());