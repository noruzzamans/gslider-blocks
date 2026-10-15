/**
 * Copies each block's attributes.js into the built block.json.
 *
 * WordPress registers blocks from build/blocks/<slug>/block.json. The source
 * block.json files have no attributes key, so PHP would otherwise register an
 * empty attribute set. This runs after wp-scripts build and writes only the
 * built copies. src/blocks/<slug>/block.json stays unchanged, and build/ is
 * not committed.
 *
 * Run with `npm run build` or `npm run build:production`.
 */
const fs = require( 'fs' );
const path = require( 'path' );
const vm = require( 'vm' );

const rootDir = path.resolve( __dirname, '..' );
const sourceDir = path.join( rootDir, 'src/blocks' );
const buildDir = path.join( rootDir, 'build/blocks' );

function exportedValue( source, name ) {
	const match = source.match( new RegExp( `export const ${ name } = ([\\s\\S]*?);` ) );
	if ( ! match ) {
		throw new Error( `Could not read export ${ name }.` );
	}
	return match[ 1 ];
}

function loadAttributes( slug ) {
	const file = path.join( sourceDir, slug, 'attributes.js' );
	let source = fs.readFileSync( file, 'utf8' );
	let header = '';
	const imports = [ ...source.matchAll( /import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"];?/g ) ];

	for ( const match of imports ) {
		const names = match[ 1 ].split( ',' ).map( ( name ) => name.trim() ).filter( Boolean );
		const imported = path.resolve( path.dirname( file ), match[ 2 ].endsWith( '.js' ) ? match[ 2 ] : `${ match[ 2 ] }.js` );
		const importedSource = fs.readFileSync( imported, 'utf8' );
		for ( const name of names ) {
			const binding = name.includes( ' as ' ) ? name.split( ' as ' ).pop().trim() : name;
			const exported = name.includes( ' as ' ) ? name.split( ' as ' )[ 0 ].trim() : name;
			header += `const ${ binding } = ${ exportedValue( importedSource, exported ) };\n`;
		}
	}

	source = source.replace( /import\s+\{[^}]+\}\s+from\s+['"]\.[^'"]+['"];?/g, '' );
	if ( ! source.includes( 'export default' ) ) {
		throw new Error( `${ slug } attributes.js has no default export.` );
	}
	source = source.replace( 'export default', 'module.exports =' );

	const sandbox = { module: { exports: {} }, exports: {} };
	sandbox.exports = sandbox.module.exports;
	vm.runInNewContext( header + source, sandbox, { filename: file } );
	return sandbox.module.exports;
}

function readJson( file ) {
	return JSON.parse( fs.readFileSync( file, 'utf8' ) );
}

function main() {
	const slugs = fs.readdirSync( sourceDir ).filter( ( slug ) => (
		fs.existsSync( path.join( sourceDir, slug, 'attributes.js' ) )
	) );

	for ( const slug of slugs ) {
		const builtFile = path.join( buildDir, slug, 'block.json' );
		if ( ! fs.existsSync( builtFile ) ) {
			throw new Error( `Built block.json is missing for ${ slug }. Run wp-scripts build first.` );
		}
		const sourceFile = path.join( sourceDir, slug, 'block.json' );
		if ( readJson( sourceFile ).attributes ) {
			throw new Error( `src/blocks/${ slug }/block.json already has attributes. Leave that file without them.` );
		}

		const block = readJson( builtFile );
		const attributes = loadAttributes( slug );
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

main();
