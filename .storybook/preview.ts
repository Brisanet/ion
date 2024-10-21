import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata } from '@storybook/angular';

import docJson from '../documentation.json';
import { ionThemeInitializer } from '../projects/ion/src/lib/theme';

export const decorators = [
  moduleMetadata({ providers: [ionThemeInitializer()] }),
];

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};
