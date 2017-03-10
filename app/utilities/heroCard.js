const builder = require('botbuilder');

module.exports = function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('CFS')
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