# SCULPTED App

# SCULPTED - A React Native app

## Getting Started 🚀

- Make sure to use your github account associated with the repository.

### Prerequisites

The dependency to run the project is to have installed **[node](https://nodejs.org/en/)** (>=v18), **yarn** and the following configurations:

- Use React Native Command Line Interface.
- [Setting up the development environment](https://reactnative.dev/docs/0.73/environment-setup).
- Make sure to prepare the Android and iOS for using physical and virtual device.

### Quick Start

#### Usage

After cloning the project you have to install all the dependencies.

`$ yarn install`

and then run the project with two steps:

#### Step 1: Start Metro in a terminal

`$ yarn start`

#### Step 2: Install iOS Pods

`$ cd ios && pod install && cd`

#### Step 3: Start your application in another terminal

`$ yarn android`

or

`$ yarn ios`

## Tech Stack

Sculpted app includes the following rock-solid technical decisions out of the box:

- React Native 0.73.7
- React Navigation 6
- Redux with Saga
- TypeScript
- And more!

## Development Guidelines

### Commit messages

Make sure your commit message looks like:

- {TAG}: {SHORT_DESCRIPTION}

e.g. `$ git commit -m "TAG: ITEM_ID - SHORT_DESCRIPTION"`

Where **{TAG}** => Any of the following:

- BLD: change related to build scripts
- FIX: hotfixes.
- BUG: alias for bugfixes.
- DOC: documentation
- FEAT: features new features
- ENH: Performance enhancements, refactors, not captured in features
- REF: maintenance commit (refactoring, etc.)
- STY: style fix (whitespaces, typos)
- TST: addition or modification of tests

Definition:

- **SHORT_DESCRIPTION**: A very short description
- **ITEM_ID_LINK**: It is the link where the specification is.

**Examples**:

- **PR title**: FEAT: Auth: Add loading component to login page button

  `$ git commit -m "FEAT: Auth: Add loading component to login page button"`

### Branching model

Make sure the follow the Gitflow Workflow which is a Local tracking branch. We must have at least three branches:

- **main**: this should reflect the current state of what is in the production environment. Every new commit on master should comprise a new release only.
- **develop**: this branch should contain the completed (and tested) upcoming features. It is common to create a separate branch for each feature and then merge it to develop when the feature is ready.
- **feature**: user requirement during the development timespan.
- **bug**: reported by the user in STG/UAT and tester during their testing
- **hotfix**: reported by the user in production

Let’s use a simple pattern like this.

- bug_bug_title
- hotfix_hotfix_title
- feature_user_story_title

**Examples:**

- feature/update_references_the_new_card_component
- bug/remove_location_host_in_dev
- hotfix/update_server_var_to_support_xyz

## Testing

TBD
