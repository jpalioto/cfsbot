const builder = require('botbuilder');
const resources = require('./resources.js');

module.exports = function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('CFS')
        .subtitle('')
        .text(resources.heroMoreInfo)
        .images([
            builder.CardImage.create(session, 'https://static1.squarespace.com/static/5732cbe2e707eb22d6917a10/5784083ed2b85790440e709e/578408562e69cf9abb13bc29/1468270679825/CFS_4c.png?format=500w')
        ])

        .buttons([
            builder.CardAction.dialogAction(session, 'menu', null, 'Menu'),
            builder.CardAction.dialogAction(session, 'recipe', null, 'Recipe')
        ]);
    }