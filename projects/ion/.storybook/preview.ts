import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

// Inject minimal theme CSS at runtime to avoid webpack loader issues
if (
  typeof document !== 'undefined' &&
  !document.getElementById('ion-storybook-theme')
) {
  const css = `
    /* Minimal font-face declarations so Storybook loads Source Sans Pro */
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: url('https://fonts.cdnfonts.com/s/12183/SourceSansPro-Regular.woff') format('woff');
      font-display: swap;
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: url('https://fonts.cdnfonts.com/s/12183/SourceSansPro-Bold.woff') format('woff');
      font-display: swap;
    }

    /* Ensure body uses the theme variable font, with sensible fallbacks */
    body {
      font-family: var(--ion-font-family-main, 'Source Sans Pro', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial);
    }

    body[ion-theme="light"] {
      --ion-font-family-main: 'Source Sans Pro';
      --ion-base: #ffffff;
      --ion-background: #ffffff;
      --ion-text: #111111;
    }
    body[ion-theme="dark"] {
      --ion-font-family-main: 'Source Sans Pro';
      --ion-base: #0b0b0b;
      --ion-background: #0b0b0b;
      --ion-text: #ffffff;
    }
    body[ion-theme="orange-light"] {
      --ion-font-family-main: 'Source Sans Pro';
      --ion-base: #fff7ed;
      --ion-background: #fff7ed;
      --ion-text: #111111;
    }
    body[ion-theme="orange-dark"] {
      --ion-font-family-main: 'Source Sans Pro';
      --ion-base: #3b2f1b;
      --ion-background: #3b2f1b;
      --ion-text: #ffffff;
    }
  `;
  const style = document.createElement('style');
  style.id = 'ion-storybook-theme';
  style.innerHTML = css;
  document.head.appendChild(style);
}

// Ensure a default theme is applied in Storybook
if (
  typeof document !== 'undefined' &&
  !document.body.hasAttribute('ion-theme')
) {
  document.body.setAttribute('ion-theme', 'light');
}

setCompodocJson(docJson);

// Global toolbar to switch ion theme in Storybook
export const globalTypes = {
  ionTheme: {
    name: 'Ion Theme',
    description: 'Set the active ion theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circle',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
        { value: 'orange-light', title: 'Orange Light' },
        { value: 'orange-dark', title: 'Orange Dark' },
      ],
    },
  },
};

// Decorator to apply the selected theme to the body attribute
export const decorators = [
  (story: any, context: any) => {
    const theme = context.globals?.ionTheme || 'light';
    if (typeof document !== 'undefined') {
      document.body.setAttribute('ion-theme', theme);
    }
    return story();
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
