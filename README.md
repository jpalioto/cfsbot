# CFS Bot

This bot is built with the [Microsoft Bot Framework](https://dev.botframework.com/).

The bot is designed to give Menu and Recipe information.  When you greet the bot ("Hello" for example), it will
present you with a [HeroCard](https://docs.botframework.com/en-us/csharp/builder/sdkreference/attachments.html) that
can guide the dialog through button prompts or you can ask the bot questions about menus or recipes.

The bot features seveal implementation points worth looking at.  Frist, all the dialogs are broken out into
seperate modules. This allows for cleaner building of the bots dialog waterfalls.  Next is guiding the dialog
via buttons on a HeroCard.  This is done using the [postBack](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.herocard) method
on the HeroCard.  Each button posts back a special code that hte bot can look for to guide the dialog.  Finally, the
bot uses a cascade of recognizers including a custom recognizer and a [LUIS](http://luis.ai) recognizer.