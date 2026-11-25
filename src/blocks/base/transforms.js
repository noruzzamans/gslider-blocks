import { createBlock } from '@wordpress/blocks';
import attributes from './attributes';

/**
 * Convert a rich-text value (HTML markup) to plain text. The base slider
 * stores its title, description and button label as plain strings.
 *
 * @param {string|*} value The rich-text value from a core block.
 * @return {string} Plain text without HTML tags or entities.
 */
const toPlainText = ( value ) => {
	if ( ! value ) {
		return '';
	}
	const doc = new window.DOMParser().parseFromString(
		String( value ),
		'text/html'
	);
	return ( doc.body.textContent || '' ).trim();
};

/**
 * Return the first block of `name` at any depth, or null.
 *
 * @param {Array}  blocks Inner blocks to search.
 * @param {string} name   Block name to find.
 * @return {Object|null} The matching block.
 */
const findBlock = ( blocks, name ) => {
	for ( const block of blocks || [] ) {
		if ( block.name === name ) {
			return block;
		}
		const found = findBlock( block.innerBlocks, name );
		if ( found ) {
			return found;
		}
	}
	return null;
};

/**
 * Convert one core/cover and its inner blocks into one base slider item.
 *
 * @param {Object} cover       The cover's attributes.
 * @param {Array}  innerBlocks The cover's inner blocks.
 * @param {number} index       The slide's position in the selection.
 * @return {Object} The slider item.
 */
const coverItem = ( cover, innerBlocks, index ) => {
	const base = JSON.parse(
		JSON.stringify( attributes.sliderItems.default[ 0 ] )
	);
	const heading = findBlock( innerBlocks, 'core/heading' );
	const paragraph = findBlock( innerBlocks, 'core/paragraph' );
	const button = findBlock( innerBlocks, 'core/button' );
	const imageUrl = cover.url || '';
	const dimRatio = Number( cover.dimRatio ?? 0 );
	const overlayColor = cover.customOverlayColor || '';

	return {
		...base,
		id: `item-${ index + 1 }`,
		subTitle: '',
		title: heading ? toPlainText( heading.attributes?.content ) : '',
		description: paragraph
			? toPlainText( paragraph.attributes?.content )
			: '',
		primaryButtonText: button ? toPlainText( button.attributes?.text ) : '',
		primaryButtonLink: button?.attributes?.url || '',
		primaryButtonTargetLink: button?.attributes?.linkTarget === '_blank',
		normalBackgroundImageUrl: {
			Desktop: imageUrl,
			Tablet: imageUrl,
			Mobile: imageUrl,
		},
		normalBackgroundImageAlt: {
			Desktop: cover.alt || '',
			Tablet: cover.alt || '',
			Mobile: cover.alt || '',
		},
		normalBackgroundImageID: {
			Desktop: cover.id || '',
			Tablet: cover.id || '',
			Mobile: cover.id || '',
		},
		itemBackgroundOverlaySwitcher: dimRatio > 0,
		itemBackgroundOverlayClassicColor: overlayColor || '#000',
		itemBackgroundOverlayOpacity: dimRatio > 0 ? dimRatio / 100 : 0.5,
	};
};

/**
 * Transform that converts one or more core/cover blocks into a base slider,
 * one slide per cover: its background image, overlay, heading, paragraph and
 * button carry over.
 *
 * @param {Array} covers      Attributes of each selected cover block.
 * @param {Array} innerBlocks Inner blocks of each selected cover block.
 * @return {Object} The transformed base slider block.
 */
const toBaseSlider = ( covers, innerBlocks ) =>
	createBlock( 'gslider-blocks/base', {
		sliderItems: covers.map( ( cover, index ) =>
			coverItem( cover, innerBlocks[ index ], index )
		),
	} );

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/cover' ],
			isMultiBlock: true,
			isMatch: ( cover ) => !! cover?.url,
			transform: toBaseSlider,
		},
	],
};

export default transforms;
