## Issue Number

Associate the issue number with the title of the pull request. If you don't have an associated issue, you should create one. Including an issue number helps provide context and traceability to the proposed changes in the pull request.

fix #issue_number

## Description

Provide a clear and concise description of your change. Explain why this change is necessary and how it improves the project. Include links to related issues, if any.

## Proposed Changes

- List specific changes made
- Include modified files and which lines were changed

## How to Test

Provide detailed instructions on how to test the proposed changes. Include information on which test scenarios you covered and how you tested.

## Screenshots

Include screenshots or GIFs that illustrate the proposed changes. This can be especially useful for user interface changes.

## View Storybook

Provide a link to the chromatic Storybook that shows the proposed changes so reviewers can easily see the changes in action.

Please also be aware that in addition to the Chromatic link, the link in the pull request description will also need to be updated whenever changes are made.

<details>
  <summary>How can I access the Chromatic link?</summary>

- Open the pull request that you wish to verify the Storybook Chromatic on.

- At the bottom of the "Checks" comment, click on "Details" next to the "Chromatic/chromatic-deployment" status.

- On the "Checks" page, you will see a list of checks. Select the "Publish to Chromatic" section.

- Scroll down until you find the section "View your Storybook at https://examplelink", that represents the desired link.

</details>

## Compliance

- [ ] I have verified that this change complies with our code and contribution policies.
- [ ] I have verified that this change does not cause regressions and does not affect other parts of the code.

## References

List any additional references or documentation that you used when making this change.

## Concluding

Remember that the goal of this template is to provide guidance and facilitate communication between developers, so feel free to include any additional information that you find useful. Make sure to check the project's policies and guidelines before submitting the pull request.
