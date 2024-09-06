import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { moduleMetadata } from '@storybook/angular';
import { themingInitializer } from '../projects/ion/src/lib/theme/theme-initializer';

export const decorators = [
  moduleMetadata({
    providers: [themingInitializer()],
  }),
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
