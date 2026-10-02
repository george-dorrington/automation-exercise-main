# Getting Started

## Exercise Instructions

- Provide the following documentation with applicable examples:
  - How to get the latest code.
  - How to deploy it locally.
  - How to run the tests.

- Intended audience: new members of the team who will need to use your tests.
- The instructions will be used by the reviewer of your PR for completeness.

**Note:** Remove this section after completing the exercise.

## Purpose

This guide explains how to install dependencies, configure credentials, and run the Playwright tests locally.

## Getting the Latest Code

Clone the repository and move into its directory:

```sh
git clone https://github.com/george-dorrington/automation-exercise-main.git
cd automation-exercise-main
```

## Setting Up the Environment

Install the required depdencies with the following command:

```
npm ci 
```

Create a `.env` file in the root of the repository and add the below values. Update 'xxxx' to the appropirate credential. If you don't have development user at hand please create one via the UI (this could be automated in the future!!)

```dotenv
DEV_EMAIL=xxxx
DEV_PASSWORD=xxxx
TEST_EMAIL=xxxx
TEST_PASSWORD=xxxx
```


If you don't have the chromium test runner installed you'll need to run the below command:

```sh
npx playwright install chromium
```

## Running the Tests

Run the full suite across both dev and test environments

```
npx playwright test
```

Run the API or UI suite against the dev or test environment

```
npx playwright test --project=dev-api
npx playwright test --project=dev-ui

npx playwright test --project=test-api
npx playwright test --project=test-ui
```

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)