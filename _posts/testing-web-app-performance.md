---
title: "Testing Web App for slow server performance"
excerpt: "Most of us have done the mistake of thinking our web app will get the same performance that we get in development in production. Let's look at ways to test your web app for slow server performance"
coverImage: "https://worldwidecode.files.wordpress.com/2023/01/mike-van-den-bos-jf1eomjlqi0-unsplash.jpg"
date: "2023-01-03T16:00:00.000Z"
author:
  name: Shubhan Chemburkar
  picture: "https://worldwidecode.files.wordpress.com/2023/07/sc.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2023/01/mike-van-den-bos-jf1eomjlqi0-unsplash.jpg"
coverImageAspectRatio: 1.5
---

Most of us have done the mistake of thinking our web app will get the same performance that we get in development in production. 
And perhaps this is true for the initial days of the app, once data increases, eventually the performance would degrade.

Most common symptom of improper handling is submitting a basic form and getting a success page. If there aren't any loading screens/UX feedback in place, the user may feel as if he/she never clicked the button.

There are many ways to test the performance and application behaviours when the app runs slowly.

## Browser tools

All browsers come with options to throttle network and CPU using developer tools (F12).

![Performance tab in Developer tools](https://worldwidecode.files.wordpress.com/2023/01/browser-performance-tools.png)

- CPU Throttling - Helps to detect issues when web app run on a low-end CPU client or older devices.
- Network Throttling - Helps to detect issues when web app runs on a slow network connection.


## Server-Side Code

This bit is interesting. Let's say you want to slow down your web requests at the server, so that they mimic a high network bandwidth but a slow web app.

We could add debuggers or `Thread.Sleep()` in all our code, but that's not optimized. A simpler way in .NET is to add a middleware that will delay the execution.

**.NET 6**
```csharp
if (env.IsDevelopment())
  app.Use(async (context, next) =>
  {
    await Task.Delay(TimeSpan.FromSeconds(10)); 
    await next(context);
  });

```

*We can change the delay based on route path or configuration, will leave that bit to you to configure.*

The above snippet makes sure any requests, be it for a page or for XHR requests get a delay from the server. This helps us to test the application behaviour where requests may get delayed, or our assumptions that the code runs 'fast'.

For a given page, if more than one request is raised, the cumulative performance will be even lower. Prompting us to optimize code further.


If we need to test for race conditions in multiple calls, we can randomize the delay. One such example could be autocomplete API that returns results as you type.

```csharp
await Task.Delay(TimeSpan.FromSeconds(new Random().Next(10,20))); 
```


### Discussion


For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.



**Cover image Credits**

> Photo by [Mike van den Bos](https://unsplash.com/@mike_van_den_bos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/jf1EomjlQi0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

  
