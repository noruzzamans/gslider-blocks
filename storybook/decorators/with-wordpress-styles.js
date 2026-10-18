import React from 'react';
import '@wordpress/components/build-style/style.css';

export const WithWordPressStyles = (Story) =>
	React.createElement(
		'div',
		{ className: 'gslider-storybook-wordpress-root' },
		React.createElement(Story)
	);
