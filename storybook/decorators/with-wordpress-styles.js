import { createElement } from '@wordpress/element';
import '@wordpress/components/build-style/style.css';

export const WithWordPressStyles = (Story) =>
	createElement(
		'div',
		{ className: 'gslider-storybook-wordpress-root' },
		createElement(Story)
	);
