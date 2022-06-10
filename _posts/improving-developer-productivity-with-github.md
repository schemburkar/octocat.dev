---
title: "Improving developer productivity with GitHub"
excerpt: "A look at how moving to GitHub has helped improve developer productivity by providing a better way to share code and collaborate with others."
coverImage: "/assets/blog/improving-developer-productivity-github/cover.jpg"
date: "2022-06-01T10:14:00.000Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "/assets/blog/improving-developer-productivity-github/cover.jpg"
isHeroPost: true
coverImageAspectRatio: 1.5
---

In a large organization, a developer's productivity is important to ensure the best use of developer expertise and time in getting things done. Source control system and continuous integration (CI) workflows for feedback plays a key role in improving the productivity of developers.

The source code repository has evolved from just being a place to store code to a collaboration location for developers to ideate, discuss, and work on code.

GitHub is the #1 source control system for all software. It is used by a wide range of organizations, including companies like Adobe, Facebook, and Microsoft.

In this post, I will be sharing my experience with transitioning to GitHub and how it helps to improve developer productivity.

## Challenges in current system

Lets look at in detail how the current system was setup and the challenges it posed to a growing developer community.

**Centralized system**

The source control management system being used was a centralized server-based repository. This was beneficial to the organization because it allowed developers to work on projects in a centralized location.

*Perforce, Team Foundation Server are examples of centralized source control systems*

**Repository size and code churn**

There would be a large code base that everyone worked on and made changes to the same code. Every time you had to make a change, you had to make sure you are latest version of the code, and if that code had conflicts, you had to resolve them.
As the team grew, the code that every developer needed to synchronize with was growing larger and larger.

**Continuous integration (CI)**

To protect the code that goes-in the repository, there would be gates implemented that allow code that passes a certain criterion to be pushed to the repository.

In a centralized source code repository, once this gate is implemented, it restricts parallel validation of gates. The downside of this is that with the number of developers committing to the repository increases, the time to validate the gate increases. This was one important decision factor in the thought to move away from a centralized repository.

**Branching and merging**

Then there is the thought of supporting multiple branches that do not align with current project timelines and need to be developed in silos. With a centralized repository, it is costly to create a branch and keep it in sync with the project branch.

With all these points, the thought was put in to move to a decentralized repository.


## GitHub for source control

The team decided to use GitHub as source control management system. This was a decision that was made to support the team's needs and to make the transition to a decentralized repository as easy as possible.

Some aspects that GitHub was able to provide us with are:
- **Lightweight branching**: We could easily switch between branches for developing different features.
- **CI**: GitHub Actions provided a easy way to setup CI and validate code before pushing to the repository.
- **Code Reviews & pull requests**: GitHub provides a way for developers to review & merge code via pull requests.
- **Collaboration**:  Discussions on code improvements can be achieved via pull requests.
- **Security**: GitHub provide automatic security checks for code using Dependency Scanning and Code Quality.
- **Documentation**: GitHub Wiki can be used to document developer processes and scenarios.


### Developer workflow

The critical piece of any source control system is how easy is it to implement a developer workflow.
We had to take into consideration the existing process that was already in place, while trying to shift towards a more standardized workflow.

We decided to work on feature branches while giving the team a central *team* branch for collaboration and validations.

![Branches](https://octocat.dev/assets/blog/improving-developer-productivity-github/Branches.png)


**Workflow setups**

All the workflows for CI or Unit testing are setup on pull requests. The pull requests also include code reviews using GitHub's concept of CODEOWNERS.

> **CODEOWNERS** is a file that is used to specify who can review a pull request. This can be specific developers or teams.

Every pull request then triggers a series of checks to ensure that the pull request is valid. Some of the checks are sequential, while some are conditionally triggered based on changed files.
This allows for the optimal workflow for the developer while also providing a quick and easy way to validate the pull request.

```yml

# ci.yml

name: "Continuous Integration"

on:
  pull_request:
    branches: [ main, team ]
jobs:
  ci:
    name: CI job
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Build
      run: |
        dotnet build Projects.sln

    - name: Test
      run: |
        dotnet test Release Projects.sln
```


### Workflow challenges

While most of the developer flow was easily mapped to GitHub, there are certain scenarios that needed extra attention.

**CI Artifacts**

Let's take the case when certain artifacts are generated at build time for the application, that also needs to be source controlled. The most common example of this could be an intermediate build artifact, required for subsequent flows.

Since all of the workflows are running on a pull request, the moment the artifact was generated and eventually part of source control, a second build was triggered. This was a problem for the developer.

To work around the problem, the work needed to be smart to detect a commit made by the CI system and automatically skip to the next step in workflow.

The below section explains two workflow paths for the developer.

**Workflow 1** 

  Developer has simple commits that trigger CI with *build* and *test* jobs. There is no artifact generated and the workflow is simple.

![Pull request 1](https://octocat.dev/assets/blog/improving-developer-productivity-github/PR1.png)

**Workflow 2**

  Developer has commits that result in artifacts, where post the build artifact is generated, the artifact commit is pushed to the repository. The *test* job is then skipped.

  The commit of *artifacts* results in a second workflow that triggers CI with *build* and *test* jobs.

![Pull request 2](https://octocat.dev/assets/blog/improving-developer-productivity-github/PR2.png)

  The trick here is to detect whether the CI commits will be generated in first place in addition to skipping the *test* job. This prevents us relying always on the second job to do the test validation. 
  There could be additional scenarios where the test validation will not be required, regardless of the artifact generation. Those should be correctly handled by appropriate conditional steps.

Example:

```yml

# ci.yml

    - name: Build
      run: |
        dotnet build Projects.sln
    
    - name: Generate & commit artifacts
      if: ${{ generate_artifacts == true }}
      run: |
        dotnet build Package.sln
        git add Output/*
        git commit -m "Build artifacts"
        git push

    - name: Test
      if: ${{ generate_artifacts == false }}
      run: |
        dotnet test Projects.sln
    
```

**Client Server Validation**

Another interesting scenario is when we need to verify application code by validating it in a client server environment. GitHub allows runners to run jobs in parallel, however once a job is finished it lets go of the runner, making it available for the next job.
In the client server model, the server job is complete and now when client job starts validation, the server needs to have the application code up and running. If the runner for server job is handed over, the client job will be blocked.

To overcome this, the server job not needs to stay active and only complete when the client job has finished its validation. Also, the client job cannot start till server job is complete, so the server job when ready, triggers the client job and waits for its status.


This can be achieved by polling the client job or verification of client validation complete status in underlying data.

![Pull request 3](https://octocat.dev/assets/blog/improving-developer-productivity-github/PR3.png)


example:

```yml

# server.yml

name: "Application Validation"

on:
  pull_request:
    branches: [ main ]
jobs:
  server_job:
    name: Server job
    runs-on: ubuntu-latest

    steps:
    
    - name: Prepare Server
      uses: ./prepare_server

    - name: Workflow Dispatch
      uses: ./workflow-dispatch
      with:
        ref: ${{ ref }}
        id: ${{ id }}

    - name: Wait for client job
      uses: ./wait-for-client-job
      with:
        ref: ${{ ref }}
        id: ${{ id }}

# client.yml

name: "Client Validation"

on:
  workflow_dispatch:
    inputs:
      id:
        description: "Workflow Disptach ID"
        required: true
    

jobs:
  client_job:
    name: Client Job
    runs-on: ubuntu-latest

    steps:

    - name: Validate Application
      uses: ./validate-application
    
    - name: Save Results
      uses: ./save-results
      with:
        id: ${{ inputs.id }}
```

**Custom Actions**

Not all steps in the workflow can be achieved with out of the box actions. There will be scenarios where the developer needs to implement custom actions.

The guidance followed for implementing custom actions is to keep one action with one responsibility.

Most of the new actions required taking certain inputs like configuration files (yml files) and related inputs. The action would then perform the operation and result in the output value. The language chosen for implementing the action was node, as it's easy to implement and easy to test with jest.

All the new actions were thoroughly unit tested with jest validating all possible combinations of inputs.

GitHub allows referencing local actions even from private repositories. The only requirement, clone the private repository and add it to the workspace. There after using them is straight forward with relative paths

Let's take the example where the action is defined in its own `my-private-repo` repo
```yml
# ./my-custom-action/action.yml

name: 'my-custom-action'

inputs:
  config:
    description: 'Some configuration file'
    required: true
  value:
    description: 'Some value'
    required: true

outputs:
  result:
    description: 'Result of the action'

runs:
  using: node12
  main: 'lib/index.js'

```

Action source code:

```js
// ./my-custom-action/src/main.ts

import helper from './helper'

// This is the actual code that will implement logic or read inputs.
helper.doSomething();


```

The `main.ts` file is then compiled to Javascript using readily available tools like `@vercel/ncc` or `webpack`.


Then in the project repository, we can use the custom action

```yml

# workflow.yml

- name: Checkout private repo
  uses: actions/checkout@v3
  with:
    repository: my-org/my-private-repo
    token: ${{ PAT }} # Always use a PAT for cloning seperate private repos
    path: ./private-repo

- name: My custom action
  uses: ./private-repo/my-custom-action
  with:
    config: ./my-config.yml
    value: 'abc'

# my-config.yml

abc:
  value: '1'

pqr:
  value: '2'


```

Important lesson is to keep the actions as small as possible, and not add complex login onto it, one can always chain multiple actions together (if required).

**Managing Runners**

Runners are machines used to setup for running jobs in GitHub, these can grow over time with the team size. Actively managing the runners is required to keep costs down, more on this topic in another post.


### Training

Assume that not all your team members are familiar with GitHub. Developers may have a hard time understanding the workflow and how to use it.

Prepare a transition plan for your team, with trainings, hands on sessions, and a roadmap for the transition.

Be aware that the team will take time to adjust to the new normal and expect feedback to improve the current setup and flows.

## Up next, GitHub for project management, Security and DevOps

Next step in the journey to transition to GitHub is to move project management, Security and DevOps to GitHub. None of this is easy to do, but it is possible.


## Conclusions

GitHub is a good tool to enable the developers to collaborate, share code and get things done faster and easier. 

The configuration of GitHub needs to be fine tuned for your use cases and scenarios to be more productive.

Remember to 
- Define your requirements
- Refine your workflows based on your requirements
- Test your implementation
- Rollout the new process
- Work on feedback and improvements



> **[Nilesh Lanke](https://twitter.com/LankeNilesh)** and **[Chirag Vidani](https://twitter.com/chiragvidani)** contributed to this post with me

### Discussion


For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.



**Cover image Credits**

> Photo by [Nubelson Fernandes](https://unsplash.com/@nublson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/developer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
