const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const { injectBlockAttributes } = require( './scripts/inject-block-attributes' );

class InjectBlockAttributesPlugin {
	apply( compiler ) {
		compiler.hooks.afterEmit.tapPromise( 'InjectBlockAttributes', () => injectBlockAttributes() );
	}
}

module.exports = {
	...defaultConfig,
	plugins: [ ...( defaultConfig.plugins || [] ), new InjectBlockAttributesPlugin() ],
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
            '@Controls': path.resolve(__dirname, 'blocks-config/gslider-controls/'),
            '@Components': path.resolve(__dirname, 'src/components/'),
            '@Utils': path.resolve(__dirname, 'src/utils/'),
            '@Constants': path.resolve(__dirname, 'src/constants/'),
            '@Blocks': path.resolve(__dirname, 'src/blocks/'),
            '@Store': path.resolve(__dirname, 'src/store/'),
            '@Attributes': path.resolve(__dirname, 'blocks-config/blocks-attributes/'),
		},
	},
};
