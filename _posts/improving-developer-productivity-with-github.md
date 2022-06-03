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

GitHub is the #1 source control system for all software. It is used by a wide range of organizations, including companies like Google, Facebook, and Microsoft.

In this post, I will be sharing my experience with transitioning to GitHub and how it helps to improve developer productivity.

## Challenges in current system

Lets look at in detail how the current system was setup and the challenges it posed to a growing developer community.

**Centralized system**

The source control management system being used was a centralized server based repository, TFS 2015. This was beneficial to the organization because it allowed developers to work on projects in a centralized location.

**Repository size and code churn**

There would be a large code base that everyone worked on and made chanages to the same code. Everytime you had to make a change, you had to make sure you are latest version of the code, and if that code had conflicts, you had to resolve them.
As the team grew, the code that every developer needed to syncronize with was growing larger and larger.

**Continuous integration (CI)**

To protect the code that goes-in the repository, there would be gates implemeneted that allow code that passes a certain criteria to be pushed to the repository.

In a centrallized source code repository, once this gate is implemented, it restricts parallel validation of gates. The downside of this is that with the number of developers commiting to the repository increases, the time to validate the gate increases. This was one important decision factor in the thought to move away from a centralized repository.

**Branching and merging**

Then there is the thought of supporting multiple branches that do not align with current project timelines and need to be developed in silos. With a centralized repository, it is costly to create a branch and keep it in sync with the project branch.

With all these points, the thought was put in to move to a decentralized repository.


## GitHub for source control

The team decided to use GitHub as source control management system. This was a decision that was made to support the team's needs and to make the transition to a decentralized repository as easy as possible.

Some aspects that GitHub was abble to provide us with are:
- **Lightweight branching**: We could easily switch between branches for developing different features.
- **CI**: GitHub Actions provided a easy way to setup CI and validate code before pushing to the repository.
- **Code Reviews & pull requests**: 
- **Collaboration**: 
- **Security**:
- **Documentation**:


### Developer workflow

The critical piece of any source control system is how easy is it to implement a developer workflow.
We had to take into consideration the existing process that was already in place, while trying to shift towards a more standardized workflow.

We decided to work on feature branches while giving the team a central *team* branch for collaboration and validations.

TODO
main <----- team branch <----- feature branch <-- Dev commits

**Workflow setups**

All the workflows for CI or Unit testing are setup on pull requests. The pull requests also include code reviews using GitHub's concept of CODEOWNERS.

Every pull request then triggers a series of checks to ensure that the pull request is valid. Some of the checks are sequential, while some are conditioanlly triggered baased on changed files.
This allows for the optimal workflow for the developer while also providing a quick and easy way to validate the pull request.

```yml

# sample yml

```


**Workflow challenges**

While most of the developer flow was easily mapped to GitHub, there are certain scenarios that needed extra attention.

CI Artifacts

Lets take the case when certian artifacts are generated at build time for the application, that also needs to be source controoled. The most commo example of this could be a intermediate build artifact, required for subsequent flows.

Since all of the workflows are running on a pull request, the moment the artifact was generated and eventually part of source control, a second build was triggered. This was a problem for the developer.

To work around the problem, the work needed to be smart to to detect a commit bade by the CI system and automaticall skip to the next step in workflow.

The below tree explains two workflow paths for the developer.

```
commit -> PR -> CI -> build -> test 

commit -> PR -> CI -> build -> artifact - > skip test
                                 |
                                 |
                                 v
                               commit -> PR updates -> CI -> test  
```

Example:

```yml

# sample ymls

```

Client Server Validation

Anaother intresting scneraio is when we need to verify application code by validating it in a client server environment. GitHub allows runners to run jobs in parallel, howvere once a job is finished it lets go of the runner, making it available for the next job.
In the client server model, the server job is complete and now when client job start validation, the server need to have the application code up and running. If the runner for server job is handed over, the client job will be blocked.

To overcome this, The server job not needs to stay active and only complete when the client job has finiesh it validation. Also the client job cannot start till server job is complete, so the server job when ready, triggers the client job and waits for its status.


This can be achived by polling the client job or verification of client validation complete status in underlying data.

```
PR -> Server Job -> Trigger CLient Job -> Wait to client job -> complete
                            |
                            |
                            v
                            Validate -> complete
```

example:

```yml

# sample yml

```


## GitHub for project management

TBD

## GitHub for DevOps

TBD


## GitHub for security

GHAS

## Conclusions

GitHub is a good tool to enable the developers to collaborate, share code and get things done faster and easier. 
The configuration of GitHub needs to be fine tuned for your use cases and scenarios to be more productive.



> **[Nilesh Lanke](https://twitter.com/LankeNilesh)** and **[Chirag Vidani](https://twitter.com/chiragvidani)** co-authored this post with me

### Discussion


What do you think? For any suggestions or your own desk setup, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.



**Cover image Credits**

> Photo by [Nubelson Fernandes](https://unsplash.com/@nublson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/developer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
