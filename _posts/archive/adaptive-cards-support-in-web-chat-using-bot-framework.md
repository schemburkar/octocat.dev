---
title: "Adaptive Cards support in web chat using bot framework"
excerpt: "Microsoft's bot framework allows developers to create bots with rich cards support using Adaptive Cards.
However, when using the bot connector service (directline) to test your bots, certain elements may not render"
coverImage: ""
date: "2019-09-05T13:37:30+05:30"
author:
  name: Shubhan Chemburkar
  picture: "https://worldwidecode.files.wordpress.com/2023/07/sc.png"
ogImage:
  url: ""
isHeroPost: false
isArchive: true
---

Microsoft's bot framework allows developers to create bots with rich cards support using [Adaptive Cards.](http://adaptivecards.io) 

When using the bot connector service (directline) to test your bots, certain elements may not render. This is because Directline will drop elements it does not recognize. 

Fortunately there is a work around available. 

Set the attachment content type property to 'application/vnd.microsoft.card.custom' when sending the AdaptiveCard.

```cs
return new Attachment("application/vnd.microsoft.card.custom", content: card);
```

Then in your web page, reset the connect type back to adaptive cards like below

```js
const attachmentMiddleware = () =&gt; next =&gt; card =&gt; {
  if (card.attachment.contentType === 'application/vnd.microsoft.card.custom') {
    card.attachment.contentType = 'application/vnd.microsoft.card.adaptive'
  }
  return next(card)
};
```

Finally, make sure the attachmentMiddleware is added to the Web Chat.

```jsx
<ReactWebChat directLine={directLine} attachmentMiddleware={attachmentMiddleware} />
```

This is in React, for html/javascript, see details in [issue](https://github.com/microsoft/BotFramework-Services/issues/87#issuecomment-500662897) on GitHub. 

Source https://github.com/microsoft/BotFramework-Services/issues/87#issuecomment-500662897 

More details on customizing web chat cards are in [GitHub](https://github.com/Microsoft/BotFramework-WebChat/tree/master/samples/10.a.customization-card-components)