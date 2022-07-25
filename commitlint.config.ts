import { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'perf',
        'build',
        'temp',
        'test',
      ],
    ],
  },
  skipQuestions: [
    'header',
    'scope',
    'body',
    'footer',
    'isBreaking',
    'breaking',
    'breakingBody',
  ],
  defaultIgnores: true,
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },

    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature.',
            title: 'Features',
            emoji: ':sparkles:',
          },
          fix: {
            description: 'A bug fix.',
            title: 'Bug Fixes',
            emoji: ':bug:',
          },
          chore: {
            description: 'Build process or auxiliary tool changes.',
            title: 'Chores',
            emoji: ':wrench:',
          },
          docs: {
            description: 'Documentation only changes.',
            title: 'Documentation',
            emoji: ':memo:',
          },
          refactor: {
            description:
              'A code change that neither fixes a bug or adds a feature.',
            title: 'Refactors',
            emoji: ':recycle:',
          },
          style: {
            description:
              'Markup, white-space, formatting, missing semi-colons...',
            title: 'Style',
            emoji: ':lipstick:',
          },
          ci: {
            description: 'CI related changes.',
            title: 'CI',
            emoji: ':construction_worker:',
          },
          perf: {
            description: 'A code change that improves performance.',
            title: 'Performance',
            emoji: ':zap:',
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).',
            title: 'Build',
            emoji: ':green_heart:',
          },
          temp: {
            description:
              "Temporary commits that won't be included in your CHANGELOG.",
            title: 'Temporary Commits',
            emoji: ':construction:',
          },
          test: {
            description: 'Adding missing tests or correcting existing ones.',
            title: 'Tests',
            emoji: ':white_check_mark:',
          },
        },
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};

module.exports = Configuration;
