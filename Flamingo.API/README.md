# MEDSEEK API Facade [![Build Status](https://magnum.travis-ci.com/medseek-empower/medseek-api.png?token=M7Hc7osm8fpNQBuqQC4g&branch=master)](https://magnum.travis-ci.com/medseek-empower/medseek-api)


# Architecture
The _MEDSEEK API_ is a resource oriented RESTful API facade implemented as a Node.js web application.

![alt tag](/documents/medseek-api.jpg)

# Source Code Management
The _MEDSEEK API_ source is managed at [GitHub](http://github.com) with the repository located at [https://github.com/medseek-empower/medseek-api](https://github.com/medseek-empower/medseek-api).
TODO: SCM Process (branching, commits, merges, pull requests, etc.)


# Development Environment
### Setup
Before beginning work, a developer must set up the development environment on their machine including the necessary tools
and frameworks to support the _MEDSEEK API_ development process.  The environment requirements are noted below:
* [Node.js](http://nodejs.org/download/) - the application platform - download and run the Windows Installer (if using a
different OS, download the appropriate installer).  This will install the Node.js JavaScript platform and engine as well as
the Node Package Manager (npm).
* [Git](http://git-scm.com/downloads) - distributed version control system (DVCS) - download and install the Git client for
Windows (if using a different OS, download the appropriate installer).
* [GitHub](https://github.com/) - MEDSEEK currently uses GitHub to manage the _MEDSEEK API_ source code.  GitHub is a hosted
SCM solution and it requires an authenticated account.  You may use your own personal GitHub account or create a MEDSEEK
account.  Once you have an account, an engineering manager can add the account to the _MEDSEEK API_ GitHub repository.
* IDE / Editor - see the [IDE / Editor section](#ide) below.

<a name="ide"/>
### IDE / Editor
For Node.js development MEDSEEK does not dictate the IDE / editor that must be used.  There are several options available
that have been used by various members of the architecture and engineering teams.  These are listed below:
* [JetBrains WebStorm](http://www.jetbrains.com/webstorm/) - complete IDE with code completion, VCS integration, integration
with some test frameworks, JSHint integration, and debugging.  A license is required.
* [Sublime Text](http://www.sublimetext.com/) - powerful editor with syntax highlighting and strong plugin community.  A
license is required.
* [Vim](http://www.vim.org/) - powerful editor with syntax highlighting and very strong community support.  No license is required.


# Style Guide
### Project Structure
`Project Root`&nbsp;&nbsp;-&nbsp;&nbsp;Project specific files including `package.json` and `app.js`, the application entry point<br>
└─`app`&nbsp;&nbsp;-&nbsp;&nbsp;Application source files<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─`lib`&nbsp;&nbsp;-&nbsp;&nbsp;Core server logic<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─`models`&nbsp;&nbsp;-&nbsp;&nbsp;Resource models<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─`resources`&nbsp;&nbsp;-&nbsp;&nbsp;Swagger resource definitions<br>
├─`config`&nbsp;&nbsp;-&nbsp;&nbsp;Application configuration objects<br>
├─`generators`&nbsp;&nbsp;-&nbsp;&nbsp;Yeoman generators<br>
├─`node_modules`&nbsp;&nbsp;-&nbsp;&nbsp;Project dependencies - managed by NPM<br>
├─`scripts`&nbsp;&nbsp;-&nbsp;&nbsp;Scripts used to manage the project or support the CI processes<br>
├─`swagger`&nbsp;&nbsp;-&nbsp;&nbsp;Swagger UI and common Swagger support resources<br>
└─`test`&nbsp;&nbsp;-&nbsp;&nbsp;Unit and Integration test suites. Folder structure mirrors the `/app` folder.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─`lib`&nbsp;&nbsp;-&nbsp;&nbsp;Tests for `/app/lib`<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─`replies`&nbsp;&nbsp;-&nbsp;&nbsp;Static resources for validating test responses<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─`resources`&nbsp;&nbsp;-&nbsp;&nbsp;Tests for `/app/resources`<br>

### Code Conventions
* All folders and files should use camel case
* Path folder delimiter should _always_ be a forward slash "/" not back slash "\" because of the CI environment
* JavaScript files should use single quotes (') around strings
* JSON files should use double quotes (") around strings

# Continuous Integration
The current CI server is hosted on Travis CI and is located here: [https://magnum.travis-ci.com/medseek-empower/medseek-api](https://magnum.travis-ci.com/medseek-empower/medseek-api)
  
A continuous integration build performs 3 main tasks:
  
  1. Run tests - `npm test`
  2. Run JSHint - `npm run-script jshint`
  3. Run code coverage results - `npm run-script cover`

These tasks are run through `npm run-script cover`, which executes the file located at `./scripts/ci.sh`.
Builds should pass all tests and jshint should return error code 0 before commit. Output is committed to the [artifacts branch](https://github.com/medseek-empower/medseek-api/tree/artifacts).

Travis CI is also configured to push build artifacts back to github, under the branch `artifacts`. These files are commmited according to the branch in which the build is assigned to.

### Build Monitoring
The Travis CI build can be monitored using CCTray.  Following are the steps for installing and configuring CCTray:
* [Download](http://sourceforge.net/projects/ccnet/files/CruiseControl.NET%20Releases/CruiseControl.NET%201.8.3/) and install CCTray
* Go to Travis CI, open your account profile and copy the access token
* Open CCTray, go to the build settings and add a build server using a custom url
* Set the url to [https://api.travis-ci.com/repositories/medseek-empower/medseek-api/cc.xml?token=YourAccessToken](https://api.travis-ci.com/repositories/medseek-empower/medseek-api/cc.xml?token=YourAccessToken)
* Select the 'medseek-api' project and add it to start monitoring the build.

__Note__: When a new build is started, CCTray will first show the build as broken before transitioning to pending.

# Environments
### Staging

### QA


# Framework Dependencies
### Application Dependencies
* [Node.js](http://nodejs.org/) - application platform built on Chrome's JavaScript runtime
* [Express](http://expressjs.com/) - web application framework
* [Lo-Dash](http://lodash.com/) - utility library
* [Q](https://github.com/kriskowal/q/) - tool for making and composing asynchronous promises in JavaScript

### Development Dependencies
* [Mocha](http://visionmedia.github.io/mocha/) - test framework
* [Chai](http://chaijs.com/) - TDD/BDD assertion library
* [Supertest](https://github.com/visionmedia/supertest/) - library for testing node.js HTTP servers
* [Istanbul](https://npmjs.org/package/istanbul/) - JavaScript code coverage tool
* [JSHint](http://www.jshint.com/) - JavaScript code quality tool
* [Nock](https://github.com/flatiron/nock/) - HTTP mocking and expectations library
* [Sinon.JS](http://sinonjs.org/) - framework for creating test spies, stubs and mocks for JavaScript
* [Sinon-Chai](https://github.com/domenic/sinon-chai/) - provides a set of assertions for using the Sinon.JS mocking framework with Chai
* [Proxyquire](https://github.com/thlorenz/proxyquire/) - proxies Node.js `require` for overriding dependencies during testing
* [Yo](https://github.com/yeoman/yo/) - application scaffolding tool (see [Yeoman](http://yeoman.io/))
* [Chai-as-Promised](https://github.com/domenic/chai-as-promised) - Chai extension providing a fluent language for asserting promises


# Running Tests
From the developer's environment the entire test suite can be run by executing `npm test` from the project root folder.  Running the tests in this manner
will execute the script that is defined by the following entry in the `package.json` file:
```JSON
{
  ...
  "scripts": {
    ...
    "test": "node node_modules/istanbul/lib/cli.js test node_modules/mocha/bin/_mocha",
    ...
  }
  ...
}
```
Additionally, you may launch the tests with a file watcher that automatically executes the test suite anytime a file changes
by using `npm run-script watch`.

[Mocha](http://visionmedia.github.io/mocha/) is the test framework and may be launched directly by running `node node_modules/mocha/bin/_mocha`
from the project root folder or by installing Mocha globally using `npm install -g mocha` and simply running `mocha` from the project root folder.
(See the [Mocha website](http://visionmedia.github.io/mocha/) for additional options.)


# API Documentation
[Swagger](https://github.com/wordnik/swagger-node-express) is used to document the API.

To view the API documentation in Swagger run the node app (`npm start` from the project root folder), then browse to [http://localhost:3000/docs](http://localhost:3000/docs).
Click the 'Explore' button. This should display the currently defined resources. Expanding the resources displays implementations notes,
defined models and error status codes. The expanded view also allows the user to execute the http call.

The swagger documentation page is built dynamically by inspecting files in the `/app/resources` and `/app/models` directory. Files in the
resources folder contain the definition of the swagger spec for the resource, the resource path, the HTTP verb and the action handler
function. The exports object should follow the naming convention of `<verb><Resource>`. The swagger configuration uses this convention
to add the correct handlers to Express.

Swagger Spec - the following fields are available to define the resource
- `path:` the path to the resource
- `description:` the description of the resource
- `notes:` implementation notes
- `summary:` short summary of the resource
- `method:` HTTP verb, allowed are GET, PUT, POST, DELETE
- `nickname:` required filed provided by the server for the convenience of the UI and client code generator
- `parameters:` inputs to the operation
- `responseClass:` this is what is returned from the method, can be a simple or complex type
- `errorResponses:` array describing the error responses returned by the operation


# Generators
Generators are included under the `/generators` folder as a separate NPM package. During `npm install`, this package is linked to the application through a post-install script
specified in `package.json`. These generators can be invoked with Yeoman for various tasks.

### Yeoman Hooks
For inserting code snippets into existing files, we use a specially formatted comment in the file that remains after generation. Currently, these are formatted as such:

`//*** "snippetName" YEOMAN HOOK ***`

These comments are searched for by the generator by name (ex: `_snippetName.js`). The snippets are matched by name and automatically filled in where the hook exists, with the hook replaced at the end.
This way, the generator can add code to existing files without having to infer where something should belong. 


### Resource generator
Run this generator from the root application directory, with `yo resource`.
  
This generator constructs some basic functionality for a new resource to be added to an application existing at `app/lib/{application}`. It performs several tasks:
  1. Creates a basic resource JSON file and places it in `/test/replies`. This file only has one property, `id`.
  2. Creates a mapper that maps the `id` property for that class, and creates unit tests for the mapper class it generated.
  4. Creates a resource file under `/app/resources` that implements GET and provides some basic Swagger documentation, and creates a unit test file for that resource.
  6. Adds a GET function into the appropriate application client referencing the new resource, and adds unit tests to the application client for the new GET function.

Unit tests that were generated should all pass immediately after running the generator. From there, new tests can be written for expanded properties and functionality.


# Development
###Process
* Create feature branch at `feature/{featureName}`
* Test first Behavior-Driven Development
* Pre-commit checks:
  1. Run JSHint - `npm run-script jshint` - and verify there are no warnings
  2. Verify all tests pass - `npm test`
  3. Verify code coverage is 100% - `npm run-script cover`
  3. Commit to local git
  4. Push changes to feature branch
* When feature is ready to be moved into master, send a pull request for someone else to process

###Test-Driving Your Code
Each module should have its own `.test.js` file, organized so that `./app` and `./test` mirror each other's structure.

If using a generator, a basic test file should be constructed for you. Otherwise, create the main module and test module together.
  
Write tests for each piece of behavior before writing the code that implements it. Work in small pieces of functionality at a time, such that code is written immediately after the corresponding unit test. 

`describe` blocks should provide clear descriptions of the functionality being tested. Use nesting of the `describe` blocks
to organize related test conditions rather than "anding" the test conditions.

`it` blocks should only test one thing. Multiple `it` blocks should be used to verify complex outcomes.
  
In most cases, the `.test.js` file should not require the dependencies of the module instead.

#####Testing the REST API
[Supertest](https://github.com/visionmedia/supertest/) is the library used to mock the HTTP request when unit testing resources.
The library is required in `testHelper.js` so it can be invoked as:

```javascript
  var request = supertest.post(someUrl);
```

#####Mocks
Several libraries are used to mock different dependencies in the project.

######Mocking REST APIs
[Nock](https://github.com/flatiron/nock/) is used for mocking HTTP requests. We typically use nock when unit testing a client
that consumes an external (to this project) REST API. The library is required in `testHelper.js` so it can be used as:

```javascript
  nock('http://some_url')
    .get('/some_resource')
    .replyWithFile(200, someDataFile);
```

When mocking a response that returns an object, whether xml or json, it is recommended the return object be placed in a data file for easy reuse and editing. These files are stored in the `./test/replies` folder.

In `testHelper.js`, an `afterEach` block calls `nock.cleanAll`, which cleans up all the mocks required with nock.

######Spies, Mocks, and Stubs, oh my!
[Sinon](http://sinonjs.org/) is the library used for creating spies, mocks, and stubs. The library is required in `testHelper.js` so it can be used as :

```javascript
  var obj = { someFunction: sinon.spy() };
```

When you need to mock an object that is new'ed up in the code under test, use [Proxyquire](https://github.com/thlorenz/proxyquire/). This library is required in `testHelper.js`, so it can be used as :

```javascript
  var obj = proxyquire('path_to_object_under_test', {
    'library_path_to_be_proxied': mockObject
  });
```

#####Testing Asynchronous Code
When testing asynchronous code, be sure to provide a `done` parameter to the `it` block of your test. When [Mocha](http://visionmedia.github.io/mocha/)
sees the `it` block with a `done` parameter, it will treat the test as an async test. The framework will provide a `done`
function to your test, and in return the test is required to call `done()` to tell the framework the test is complete.

###Git
The command line git is recommended for working with the github repository. [Pro GIt](http://git-scm.com/book "Pro Git") is an excellent resource for learning how to use git from the command line.

Note: Before you can install the MEDSEEK common node modules you will need to setup ssh keys. To generate the ssh keys and attach them to your github account follow these instructions: [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys)

####Branching Strategy
We will follow the Gitflow workflow. This [tutorial](https://www.atlassian.com/git/workflows#!workflow-gitflow) is a good introduction to the Gitflow workflow.

All feature and defect development will be performed in feature branches. The Medseek US team lead is the primary team member responsible for creating feature branches. Typically a feature branch will be created for each epic story in a sprint, however the team lead may choose to further break out that work into separate feature branches.

A senior member of each sprint team will be designated as the branch owner. The branch owner will be responsible for pulling down changes to the feature branch. This should be done frequently to keep the feature branch in sync with develop.

#####Feature Branch Naming Convention
All feature branches will be named "feature/some-short-description-of-the-feature". Once we decide on a scrum tool, we will also include the story or defect identifier in the branch name.

####Initial setup
You will first need to clone the repo. This is a one-time step -- after executing this step, you will not need to clone the repository again. Execute

    git clone https://github.com/medseek-empower/medseek-api

####Working with Git
A local repository consists of three trees maintained by git:
- the working directory, which holds the actual files
- the index, which acts as a staging area
- the head, which points to the last commit you made

The Medseek US team lead is responsible for creating feature branches as appropriate for the Medseek India sprint teams. It is critical that the assigned stories and defects are worked in the correct feature branch. If a team member feels a new feature branch is required, they must consult with the US team lead.

#####Working on a user story
Once the feature branch is created, you will want to checkout the branch. From the command prompt, change directory to the root of the code base and execute the following commands :

    git checkout master
    git pull
    git checkout feature_branch_name
    
Now you're ready to implement the code for the story. You should commit changes often. Committing changes in git only commits your changes to the local repository. First, you'll need to update the index with your changes:

    git add .

To commit files, execute :

    git commit

This command will open a VIM editor for entering a commit message. If you want to cancel the commit, enter ":q". To add your commit message, enter "i" then type the commit message. When finished, enter ":wq" to save the message and commit the changes.

To share your changes with other team members, you need to push your changes from the local repo to the github repo. To do this, execute

    git push

Before pushing, be sure all unit tests are passing and no JSHint warnings are found in the code.

If the push fails with the message "Updates were rejected because the remote contains work that you do not have locally.", you need to first pull changes from the remote before pushing. Execute

    git pull

Then perform the push again.

####Sync feature branch with develop
The feature branch, especially if it's long-lived, will need to be synced with the develop branch. This can be accomplished by executing the following commands

    git checkout develop
    git pull
    git checkout feature_branch_name
    git merge develop

If there are conflicts with the merge, you will get a message stating the automatic merge failed. The conflicted files will be listed. See the next section on how to resolve these conflicts.

Once any conflicts are resolved, commit and push the merged files. You will notice that the commit message is already supplied, indicating that develop was merged into the feature branch.

#####Handling merge conflicts
Edit the conflicted files to resolve the conflicts. After editing the conflicts, execute

    git add file_name

for each of the conflicted files to mark the conflicts as resolved.

####Sync local repo with remote branch

    git pull

If there are merge conflicts, see the previous section on handling merge conflicts.

####Undoing things in git

#####Undoing unstaged changes
To revert changes in your working copy, execute

    git checkout .

To revert changes made to the index (files that you have added), execute

    git reset

To revert untracked changes, execute

    git clean -f

#####Undoing local commits
To undo the last commit and reset the repo's state (you will lose the changes that were made in the commit), execute 

    git reset --hard HEAD~1

To undo the last commit, but not lose those changes (say, you just need to make a quick edit to fix the commit), execute

    git reset HEAD~1

#####Undoing changes that have been pushed
To undo changes that have been pushed to the remote repo, execute 

    git log

to find the commit name (the SHA-1 object name). Then execute the following to revert the commit

    git revert commitNumber
    git push
    
####Stashing changes
If you have local changes that aren't ready to commit, but you need to switch branches, you can store your changes by executing 

    git stash

Now you can switch branches and/or commit changes without sharing your in-process work. Once you're ready to go back to your work-in-progress, switch to the correct branch and execute

    git stash list

This will list the changes that have been stashed (each time you run "git stash" you create a different changeset). If you want to apply the most recent stash, execute

    git stash apply

If you want to apply a specific stash, execute

    git stash apply stashId

The stashId will be from the output of the "git stash list" command

####Moving code from the feature branch to develop
When the code from your feature branch is ready to be shared with the development team, you will need to create a pull request. Before creating the pull request, be sure the feature branch has been sync'd with the develop branch.
	
1. Browse to your feature branch on git hub
2. Click the Pull Request link
3. Add comments in the comment text area
4. Click the Send pull request button to submit the pull request

The Medseek US team lead is responsible for processing pull requests. If there are questions or comments about the changes, these will be added to the pull request discussion. Subsequent changes that are pushed to the branch will be automatically included in the open pull request. Once complete, the Medseek US team lead will close the pull request. The feature branch should also be deleted.

####Unrelated bugs found when working in a feature branch
During development of a feature, you may find a bug in some unrelated part of the application. You should create a defect in the trouble tracking system. If the defect needs to be addressed immediately, see the Medseek US team lead to have a branch created for the defect.

####Sharing changes with other branches
DO NOT copy/paste code between branches! If you need the code from another branch, create a pull request to have the code merged between the branches.

