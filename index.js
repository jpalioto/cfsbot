var builder   = require('botbuilder');
var restify   = require('restify');

var connector = new builder.ChatConnector();
var bot       = new builder.UniversalBot(connector);

// LUIS Setup
var luisKey      = '6e843ac045cb4497afa2e39230d62778';  // Dev Key
var luisEndpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5e02a94a-8f45-498c-94c3-99e5884cd053?subscription-key=6e843ac045cb4497afa2e39230d62778&staging=true&verbose=true&q=';
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

    bot.dialog('/menuDialog', 
        [
            s => { s.send("Menu dialog"); }
    ])

    bot.dialog('/recipeDialog', 
        [
            s => { s.send("recipe dialog"); } 
    ])


// Build out our hero card.  FPO right now.
function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('CFS Options')
        .subtitle('')
        .text('Which would you like more information on?')
        .images([
            builder.CardImage.create(session, 'https://static1.squarespace.com/static/5732cbe2e707eb22d6917a10/5784083ed2b85790440e709e/578408562e69cf9abb13bc29/1468270679825/CFS_4c.png?format=500w')
        ])
        // In order to change our conversation based on button press, we post back a GUID messages
        // to the bot.  This will not be seen by the user.  We 
        .buttons([
            builder.CardAction.postBack(session, '2bebe5f5-027c-4401-aaf6-c323a8a4c684', 'Menu'),
            builder.CardAction.postBack(session, '428199ac-eecc-4921-b7f8-0578d7e9e1e5', 'Recipe')           
        ]);
    }

// Create REST endpoint.  Take the env variable if we are in Azure or use the default for loadl.
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function() {
    console.log('%s listening at %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());