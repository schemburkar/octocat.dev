---
title: "Using Microsoft dev tunnels with command line"
excerpt: "In this post we take a look at the command line experience for creating Microsoft dev tunnels without requiring Visual Studio."
coverImage: "https://worldwidecode.files.wordpress.com/2023/06/ian-battaglia-9drs5e_rguc-unsplash.jpg"
date: "2023-06-22T05:01:00.000Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2023/06/ian-battaglia-9drs5e_rguc-unsplash.jpg"
isHeroPost: true
coverImageAspectRatio: 1.6
---

Microsoft announced dev tunnels with Visual Studio last year. However, did you know, you can use them independently with command line without requiring Visual Studio? In this post we take a look at the command line experience.

# What are dev tunnels?

Dev tunnels allow you to access your local environment over the internet for testing. This is especially useful in verifying web hook integrations, public facing callbacks or just how your website would work over the internet.

# Dev tunnels command line

Microsoft has made available a independent command line utility for Windows, macOS and Linux. This enables creating a dev tunnel without requiring Visual Studio or limiting to ASP.NET scenarios.

## Installation

Below are direct download links for various platforms

|Platform|Link|
|-|-|
|Windows (x64)|https://aka.ms/TunnelsCliDownload/win-x64|
|macOS (arm64)|https://aka.ms/TunnelsCliDownload/osx-arm64-zip|
|macOS (x64)|https://aka.ms/TunnelsCliDownload/osx-x64-zip|
|Linux (x64)|https://aka.ms/TunnelsCliDownload/linux-x64|

## Login

Currently dev tunnels require you to login with a (default) Microsoft account (Work/AD/Personal) or GitHub accounts.

```bash
devtunnel user login
```

Use option `-g` for using GitHub login instead of Microsoft account.

## Host a tunnel

The simplest option is to relay requests to a locally hosted web application or service.

For example, if you would like to host a locally running application at `http://localhost:3000`, then the equivalent command would be:

```bash
devtunnel host -p 3000
```

By default clients connecting to dev tunnels need to sign in with the same login account. This prevents accidental access to local running services.

If you would like to make the dev tunnel available to clients without any login restrictions, use the *anonymous* option

```bash
devtunnel host -p 3000 --allow-anonymous
```

The client url would typically be `https://<tunnel_id>.<location/server>.devtunnels.ms`. E.g. `https://3m7vj87f.asse.devtunnels.ms`

## CLI Options

Here is the default command line output

```
Welcome to dev tunnels!
CLI version: 1.0.701+d0b5027c0b

By using the software, you agree to
  - the dev tunnels License Terms: https://aka.ms/devtunnels/tos
  - the Microsoft Privacy Statement: https://privacy.microsoft.com/privacystatement

Report issues on GitHub: https://aka.ms/devtunnels/issues
Use 'devtunnel --help' to see available commands or visit: https://aka.ms/devtunnels/docs

devtunnel
  Dev Tunnels CLI

Usage:
  devtunnel [options] [command]

Options:
  -v, --verbose   Enable verbose output
  --version       Show version information
  -?, -h, --help  Show help and usage information

Commands:
  list                         List tunnels
  show <tunnel-id-or-name>     Show tunnel details
  create                       Create a tunnel
  update <tunnel-id-or-name>   Update tunnel properties
  delete <tunnel-id-or-name>   Delete a tunnel
  delete-all                   Delete all tunnels
  token <tunnel-id-or-name>    Issue tunnel access token
  set <tunnel-id-or-name>      Set default tunnel
  unset                        Clear default tunnel
  access                       Manage tunnel access control entries
  user                         Manage user credentials
  port                         Manage tunnel ports
  host <tunnel-id-or-name>     Host a tunnel, if tunnel ID or name is not specified a new tunnel will be created
  connect <tunnel-id-or-name>  Connect to an existing tunnel
  limits                       List user limits
  clusters                     List available service clusters by location
  echo <protocol>              Run a diagnostic echo server on a local port
  ping <uri>                   Send diagnostic messages to a remote echo server

```

Additional options are available on the [CLI reference docs](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/cli-commands#host-a-dev-tunnel)



For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.


## References


- [Dev Tunnels GitHub Repository](https://github.com/microsoft/dev-tunnels)
- [Dev tunnels command-line reference](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/cli-commands#host-a-dev-tunnel)
- [Create and host a dev tunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started)

### Photo Credit

> Cover Photo by [Ian Battaglia](https://unsplash.com/es/@ianjbattaglia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/r3pIy-3Xgmg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)


  