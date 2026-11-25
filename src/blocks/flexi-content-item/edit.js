import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';
import Inspector from './inspector';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generateFlexiContentItemStyle from './styling';

export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const { blockId, blockStyle, isSlideHidden } = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-flexi-content-item',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generateFlexiContentItemStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	const blockProps = useBlockProps( {
		className: `flexi-content-item swiper-slide ${ blockId }${
			isSlideHidden ? ' is-slide-hidden' : ''
		}`,
	} );

	return (
		<>
			{ isSelected && (
				<Inspector
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }

			<div { ...blockProps }>
				{ isSlideHidden && (
					<div className="gslider-hidden-badge">
						{ __( 'Draft (Hidden)', 'gslider-blocks' ) }
					</div>
				) }
				<div className="gslider-content-wrapper">
					<div className="gslider-content-inner-wrapper">
						<InnerBlocks
							template={ [ [ 'core/paragraph' ] ] }
							renderAppender={ InnerBlocks.DefaultBlockAppender }
						/>
					</div>
				</div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
