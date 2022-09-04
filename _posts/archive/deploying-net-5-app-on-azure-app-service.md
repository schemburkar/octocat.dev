---
title: "Deploying .NET 5 app on Azure App service"
excerpt: "Azure App service now supports .NET 5 apps from Day 0."
coverImage: ""
date: "2020-11-12T19:05:04+05:30"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: ""
isHeroPost: false
isArchive: true
---

> **2022 Update**: Although this post specifies .NET 5, its applicable for all .NET versions going forward


Azure App service now supports .NET 5 apps from Day 0. Read the announcement [here](https://azure.github.io/AppService/2020/11/10/Dot-Net-5-on-App-Service.html). Congratulations to the team!

> [Byron Tardif](https://twitter.com/bktv99?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1326199345952161792%7Ctwgr%5Eshare_3&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbktv992Fstatus2F1326199345952161792widget%3DTweet) [@bktv99](https://twitter.com/bktv99?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1326199345952161792%7Ctwgr%5Eshare_3&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbktv992Fstatus2F1326199345952161792widget%3DTweet)  
A small step for [@azure](https://twitter.com/Azure?ref_src=twsrc%5Etfw) [#appservice](https://twitter.com/hashtag/appservice?src=hash&ref_src=twsrc%5Etfw), one giant leap for [#devkind](https://twitter.com/hashtag/devkind?src=hash&ref_src=twsrc%5Etfw). Announcing [#dotnet5](https://twitter.com/hashtag/dotnet5?src=hash&ref_src=twsrc%5Etfw) support on Azure App Service. [https://t.co/LEx74Z8Wjx](https://t.co/LEx74Z8Wjx)  
cc: [@coolcsh](https://twitter.com/coolcsh?ref_src=twsrc%5Etfw) [@shanselman](https://twitter.com/shanselman?ref_src=twsrc%5Etfw) [@scottgu](https://twitter.com/scottgu?ref_src=twsrc%5Etfw)  
[Source: Twitter](https://twitter.com/bktv99/status/1326199683467735042?s=20)

In this post, I'll walk you through the changes needed to support .NET 5 on Azure App Service using Azure DevOps.

*   Upgrade your app to .NET 5  
      
    Usually this means changing the target framework to **net5**. Follow the [migration guide](https://docs.microsoft.com/en-us/aspnet/core/migration/31-to-50?view=aspnetcore-5.0&tabs=visual-studio-code#prerequisites) here.  
      
    Once you have your app working on your dev box, the next step is deployment.

In Azure portal,

*   Change the Stack Settings to .NET 5  
      
    Assuming you were using .NET Core 3.1 earlier, change the selections to .NET 5.  
    Important, first change the Stack option from **.NET Core** to **.NET**. The you will see the rest of the options for .NET 5.

[![](https://worldwidecode.files.wordpress.com/2020/11/image.png?w=899)](https://worldwidecode.files.wordpress.com/2020/11/image.png)

In Azure DevOps,

*   Include .NET 5 SDK using the **Use .NET Core** step.  
      
    This is required as the default agent image (windows-2019 in my case) does not yet include .NET 5 by default.  
      
    To do this, go to your build Pipeline and add **Use .NET Core** step with version **5.x**  
      
    

[![](https://worldwidecode.files.wordpress.com/2020/11/image-1.png?w=1024)](https://worldwidecode.files.wordpress.com/2020/11/image-1.png)

*   Update the Deploy to Azure step  
      
    Next you need to update the deploy step within Release job to use .NET 5.  
      
    To do this, go to the Release node and update the **Runtime Stack** to **DOTNETCORE|5.0**.  
      
    

[![](https://worldwidecode.files.wordpress.com/2020/11/image-5.png?w=1024)](https://worldwidecode.files.wordpress.com/2020/11/image-5.png)

If you set this incorrectly, after deployment it could happen that the Minor version is blank or empty. In that case check the **Runtime Stack** value again. If it re-occurs try to set it again manually to .NET 5 via the Azure Portal.

*   Now trigger a build, Azure DevOps will build the app using .NET 5 and then deploy it to Azure App Service.

Happy .NET 5 Deployments.