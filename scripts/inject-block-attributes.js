/**
 * Copies each block's attributes.js into the built block.json.
 *
 * WordPress registers blocks from build/blocks/<slug>/block.json. The source
 * block.json files have no attributes key, so PHP would otherwise register an
 * empty attribute set. Webpack runs this after every production build and
 * every `npm run start` rebuild, so the built file stays in step with
 * attributes.js. src/blocks/<slug>/block.json stays unchanged, and build/ is
 * not committed.
 *
 * Attributes are loaded with esbuild, the same way the MCP schema extractor
 * loads them, so imports from other local files or the repo aliases work.
 */
const esbuild = require( 'esbuild' );
const fs = require( 'fs' );
const path = require( 'path' );

const rootDir = path.resolve( __dirname, '..' );
const sourceDir = path.join( rootDir, 'src/blocks' );
const buildDir = path.join( rootDir, 'build/blocks' );

const alias = {
	'@Controls': path.join( rootDir, 'blocks-config/gslider-controls' ),
	'@Components': path.join( rootDir, 'src/components' ),
	'@Utils': path.join( rootDir, 'src/utils' ),
	'@Constants': path.join( rootDir, 'src/constants' ),
	'@Blocks': path.join( rootDir, 'src/blocks' ),
	'@Store': path.join( rootDir, 'src/store' ),
	'@Attributes': path.join( rootDir, 'blocks-config/blocks-attributes' ),
};

async function loadAttributes( slug ) {
	const file = path.join( sourceDir, slug, 'attributes.js' );
	const result = await esbuild.build( {
		entryPoints: [ file ],
		bundle: true,
		write: false,
		format: 'cjs',
		platform: 'node',
		loader: { '.js': 'jsx' },
		alias,
		external: [ '@wordpress/*' ],
		logLevel: 'silent',
	} );
	const sandbox = { module: { exports: {} }, exports: {}, require };
	sandbox.exports = sandbox.module.exports;
	const run = new Function( 'module', 'exports', 'require', result.outputFiles[ 0 ].text );
	run( sandbox.module, sandbox.exports, ( id ) => {
		if ( id.startsWith( '@wordpress/' ) ) {
			return { __: ( text ) => text };
		}
		return require( id );
	} );
	return sandbox.module.exports.default || sandbox.module.exports;
}

function readJson( file ) {
	return JSON.parse( fs.readFileSync( file, 'utf8' ) );
}

async function injectBlockAttributes() {
	const slugs = fs.readdirSync( sourceDir ).filter( ( slug ) => (
		fs.existsSync( path.join( sourceDir, slug, 'attributes.js' ) )
	) );

	for ( const slug of slugs ) {
		const builtFile = path.join( buildDir, slug, 'block.json' );
		if ( ! fs.existsSync( builtFile ) ) {
			throw new Error( `Built block.json is missing for ${ slug }.` );
		}
		const sourceFile = path.join( sourceDir, slug, 'block.json' );
		if ( readJson( sourceFile ).attributes ) {
			throw new Error( `src/blocks/${ slug }/block.json already has attributes. Leave that file without them.` );
		}

		const block = readJson( builtFile );
		const attributes = await loadAttributes( slug );
		block.attributes = JSON.parse( JSON.stringify( attributes ) );
		if ( ! block.attributes || Object.keys( block.attributes ).length === 0 ) {
			throw new Error( `${ slug } produced no attributes.` );
		}
		fs.writeFileSync( builtFile, `${ JSON.stringify( block, null, 2 ) }\n` );
	}

	const required = {
		base: 'sliderItems',
		testimonial: 'sliderItems',
		'image-slider': 'images',
		'logo-carousel': 'logos',
		'flexi-content-item': 'blockId',
	};
	for ( const [ slug, key ] of Object.entries( required ) ) {
		const attributes = readJson( path.join( buildDir, slug, 'block.json' ) ).attributes;
		if ( ! attributes || ! Object.prototype.hasOwnProperty.call( attributes, key ) ) {
			throw new Error( `build/blocks/${ slug }/block.json is missing ${ key }.` );
		}
	}
}

module.exports = { injectBlockAttributes };

if ( require.main === module ) {
	injectBlockAttributes().catch( ( error ) => {
		console.error( error );
		process.exit( 1 );
	} );
}
