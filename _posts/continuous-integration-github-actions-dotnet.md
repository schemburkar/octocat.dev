---
title: 'Continuous Integration (CI) Pipeline with GitHub Actions with .NET'
excerpt: 'GitHub Actions is a new way to run a CI pipeline, especially for open source projects.
GitHub actions can be used to run complex pipelines with build, unit tests and more.
In this post, we will look at setting up a pipeline for build and test for a .NET web app.'
coverImage: 'https://worldwidecode.files.wordpress.com/2021/09/roman-synkevych-wx2l8l-fgea-unsplash.jpg?w=1080'
date: '2021-09-29T13:35:07.322Z'
author:
  name: Shubhan Chemburkar
  picture: "https://worldwidecode.files.wordpress.com/2023/07/sc.png"
ogImage:
  url: 'https://worldwidecode.files.wordpress.com/2021/09/roman-synkevych-wx2l8l-fgea-unsplash.jpg?w=1080'
---

[GitHub Actions](https://github.com/features/actions) is a new way to run a CI pipeline, especially for open source projects.
GitHub actions can be used to run complex pipelines with build, unit tests and more.

In this post, we will look at setting up a pipeline for build and test for a .NET web app.

## Project Structure

We have four projects representing a sample use case for enterprise web apps

- Core – Core models, utility functions etc.
- Business – Business logic and validations
- Web – Web project for serving content or data
- Test – Test project for testing code

## Building Projects

Lets create a single file that can build all four projects. For this we will use a msbuild project file ```build.proj```

The file starts with a ```<Project>``` tag specifying the default targets, in our case ```clean``` and ```build```

```xml
<Project DefaultTargets="Clean;Build" >
</Project>
```
We need to specify the projects we are going to build in this file. For that we specify a custom property Projects which will be used multiple times, each representing our four projects

```xml
<Projects Include="Core/Core.csproj" />    
<Projects Include="Business/Business.csproj" />    
<Projects Include="Web/Web.csproj" />    
<Projects Include="Tests/Tests.csproj" />
```

Now we can add a build target to build these four projects. We use the [MSBuild](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-task?view=vs-2019) Task to build them.

```xml
<PropertyGroup>
  <BuildTargets>Restore;Build</BuildTargets>
</PropertyGroup>
<Target Name="Build" >
  <Message Text="Building Projects" />
  <MSBuild  Projects="@(Projects)" Targets="$(BuildTargets)" />
</Target>
```

Similar to build, we can setup test for our test project

```xml
<TestProjects Include="Tests/Tests.csproj" />
<Target Name="VSTest">
  <Message Text="Executing Tests" />
  <MSBuild Projects="@(TestProjects)" Targets="$(BuildTargets);VSTest" />
</Target>
```

Notice that the Target Name is *Build* for building projects and *VSTest* for running test projects.

With this we can run the build for all four projects or execute tests using command line with following commands

Build:

```bash
dotnet build
```
Test:

```bash
dotnet test
```

## GitHub Actions

Once we have the prerequisites ready, we can now build our pipeline.

Visit the Actions tab in you repository to add a new action. Alternatively you can add a github action directly in the repository by adding a new YAML file like ```.github/workflows/actions.yml```

If using the GitHub UI, select the .NET starter template to get started


![.NET starter template](https://worldwidecode.files.wordpress.com/2021/09/image.png)

We can replace the generated with below:

```yaml
name: .NET
 
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
 
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 5.0.x
    - name: Build Project
      run: dotnet build --verbosity minimal
    - name: Test Project
      run: dotnet test --no-build --verbosity normal
```

The only difference between this action and the starter template is we no longer need the ‘restore’ step and some minor changes to build and test steps.

Once saved, every push commit on main or a PR to main will run this pipeline. Only then will the build be successful or PR will be merged.

## Digging deep into the workflow

Lets look at all the parts of the workflow

**name** – Identifies the name of the workflow/action

**on**: push/pull_request – Indentifies that the workflow is going to run on every push or pull request.

**[main]** – Specifies the branches where this workflow is applicable

```yaml
name: .NET
 
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```
Now we can specify the jobs that will run in this pipeline. Since we are building the projects, its build

The build step has

**runs-on** – The agent OS where this will run, ubuntu the the default.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

The build step contains one or more *steps* or commands that will be executed in sequence.

```yaml
steps:
- uses: actions/checkout@v2
- name: Setup .NET
  uses: actions/setup-dotnet@v1
  with:
    dotnet-version: 5.0.x
- name: Build Project
  run: dotnet build --verbosity minimal
- name: Test Project
  run: dotnet test --no-build --verbosity normal
```

We are executing the following steps

* Checkout the repository
  ```yaml
  - uses: actions/checkout@v2
  ```
- Setup .NET SDK 5.0.x
  ```yaml
  - name: Setup .NET
    uses: actions/setup-dotnet@v1
    with:
      dotnet-version: 5.0.x
  ```

* Build Project
  ```yaml
  - name: Build Project
    run: dotnet build --verbosity minimal
  ```
- Test Project
  ```yaml
  - name: Test Project
    run: dotnet test --no-build --verbosity normal
  ```

The last two steps are commands that we have used earlier to build and execute tests in our repo.

More on these individual steps on help page [https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)

The entire sample above is present as a GitHub repo at [https://github.com/schemburkar/demo-pipelines](https://github.com/schemburkar/demo-pipelines)

## GitHub Desktop

Open this sample repo in GitHub Desktop, click or copy the link below in a new tab on the browser

[x-github-client://openRepo/https://github.com/schemburkar/demo-pipelines](x-github-client://openRepo/https://github.com/schemburkar/demo-pipelines)

## More Links

- GitHub Actions – [https://github.com/features/actions](https://github.com/features/actions)
- GitHub Actions Quickstart – [https://docs.github.com/en/actions](https://docs.github.com/en/actions)

Provide me feedback at Twitter @shubhan3009