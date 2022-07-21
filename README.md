![IonLogo](https://user-images.githubusercontent.com/6165180/177863336-9dcb9441-035d-4c2c-ad84-4e3734a99fab.png)

Component library following a great Design System

<a href="https://codeclimate.com/github/iurynogueira/ion/maintainability"><img src="https://api.codeclimate.com/v1/badges/22e2c6dab72fd7234e24/maintainability" /></a>
<a href="https://codeclimate.com/github/iurynogueira/ion/test_coverage"><img src="https://api.codeclimate.com/v1/badges/22e2c6dab72fd7234e24/test_coverage" /></a>
[![Production](https://github.com/iurynogueira/ion/actions/workflows/prod.yml/badge.svg?branch=main)](https://github.com/iurynogueira/ion/actions/workflows/prod.yml)

## Create a component

Run `ng generate component component-name project=ion` to generate a new component.

## Build

Run `ng build --project=ion` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Commit pattern

Commits should follow the [convention](https://conventionalcommits.org/).
We have the following types:

- feat: A new feature;
- fix: A bug fix;
- docs: Documentation only changes;
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc);
- refactor: A code change that neither fixes a bug nor adds a feature;
- test: Adding missing tests or correcting existing ones;
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation;
- perf: A code that improves performance;
- ci: Changes to the CI/CD process;
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm);
- temp: Temporary commits that won't be included in your CHANGELOG.

Example: `feat: Add feature #issue_id`
