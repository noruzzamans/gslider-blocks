import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Save( { attributes } ) {
	const { blockId, slideLink, slideLinkOpenInNewTab } = attributes;

	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="gslider-content-wrapper">
				<div className="gslider-content-inner-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
			{ slideLink && (
				<a
					href={ slideLink }
					className="gslider-slide-overlay-link"
					target={ slideLinkOpenInNewTab ? '_blank' : undefined }
					rel={
						slideLinkOpenInNewTab
							? 'noopener noreferrer'
							: undefined
					}
					aria-label={ __( 'Slide link', 'gslider-blocks' ) }
				/>
			) }
		</div>
	);
}
