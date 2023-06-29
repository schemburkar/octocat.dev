---
title: "Creating groups and formatting in GitHub Actions logs"
excerpt: "This post explains how to create collapsible groups and color formatting for logs in GitHub Actions"
coverImage: "https://worldwidecode.files.wordpress.com/2021/05/security-wallpaper.jpg?w=1080"
date: "2022-09-09T12:30:00Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2021/05/security-wallpaper.jpg?w=1080"
---

GitHub Actions can have multiple steps, some more than others. If we group the output, it makes it cleaner to view and check. This post explains how to do just that very easily.

## Group Syntax

To use groups, need to use a special output syntax. For directly using in your workflows, composite actions etc., use the below syntax:


### [For Workflows and Actions](#workflows)

```bash
echo "::group::Name of Group"   
echo "::endgroup::"
```

# 

If the above syntax does not work for your runner, check if below syntax works as an alternate:

```text
echo ##[group]Name of Group
echo ##[endgroup]
```

*This alternate syntax may be required mostly in composite powershell actions*

# 

### [Using Groups from Javascript Actions](#javascript)

```ts
import * as core from "@actions/core"

core.startGroup("My Group");
core.info("Some log statement");
core.endGroup();

```

Reference: [GitHub Actions Docs](https://github.com/actions/toolkit/blob/main/docs/commands.md#group-and-ungroup-log-lines)

## Colors and Formatting in output

Color styling output helps to provide better context in logs

This can be achieved easily by using `ansi-styles` in Javascript actions

Just print using

```ts
import styles from 'ansi-styles';

// log(string message)

return `${styles.blue.open}Hello world!${styles.blue.close}`;
```

### Discussion


For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.

**Cover image Credits**

> [Photo](https://unsplash.com/photos/BfrQnKBulYQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink) by [Shahadat Rahman](https://unsplash.com/es/@hishahadat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyTextt)

