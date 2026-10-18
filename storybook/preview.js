import { WithWordPressStyles } from './decorators/with-wordpress-styles';
import { WithGutenbergSidebar } from './decorators/with-gutenberg-sidebar';

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
	},
	decorators: [
		WithWordPressStyles,
		WithGutenbergSidebar,
	],
};

export default preview;
