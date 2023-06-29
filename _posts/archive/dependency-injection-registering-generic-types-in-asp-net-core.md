---
title: "Dependency Injection – Registering Generic Types in ASP.NET Core"
excerpt: "Simple guide on how to implement Dependency Injection in .NET for generic interface types"
coverImage: ""
date: "2018-12-09T18:27:37+05:30"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: ""
isArchive: true
---

*Source: Steve Gordon’s [blog post](https://www.stevejgordon.co.uk/asp-net-core-dependency-injection-how-to-register-generic-types)*

We want to be able to ask for an **`IThing<SomeType>`** in the constructor of a consumer which will get the correct **`GenericThing<SomeType>`** injected. We can use a extension method on the ServiceCollection that accepts the types as parameters. Our registration would then look like this

```cs
serviceCollection.AddSingleton(typeof(IThing<>), typeof(GenericThing<>));
 ```

Related Articles

*   [https://www.stevejgordon.co.uk/asp-net-core-dependency-injection-how-to-register-generic-types](https://www.stevejgordon.co.uk/asp-net-core-dependency-injection-how-to-register-generic-types)