/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import PresetSelector from '@Components/preset-selector';
import SwitcherControl from '@Components/switcher-control';
import GradientColorControl from '@Components/gradient-color-control';
import InputControls from '@Components/input-control';
import { POST_CAROUSEL_PRESETS } from '../../preset';

const LAYOUT_MODE_OPTIONS = [
	{ label: __( 'Classic', 'gslider-blocks' ), value: 'classic' },
	{ label: __( 'Overlay', 'gslider-blocks' ), value: 'overlay' },
	{ label: __( 'Horizontal', 'gslider-blocks' ), value: 'horizontal' },
];

const MEDIA_POSITION_OPTIONS = [
	{ label: __( 'Left', 'gslider-blocks' ), value: 'left' },
	{ label: __( 'Right', 'gslider-blocks' ), value: 'right' },
];

const DEFAULT_OVERLAY_SCRIM =
	'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)';

/**
 * Clamp numeric input within inclusive bounds.
 *
 * @param {string|number} raw      Raw input value.
 * @param {number}        min      Minimum allowed value.
 * @param {number}        max      Maximum allowed value.
 * @param {number}        fallback Default fallback value.
 * @return {number} Clamped integer value.
 */
const clampNumber = ( raw, min, max, fallback ) => {
	const parsed = parseInt( raw, 10 );
	if ( Number.isNaN( parsed ) ) {
		return fallback;
	}
	return Math.min( max, Math.max( min, parsed ) );
};

/**
 * Inspector panel for curated card layout presets and contextual archetype controls.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Layout & Presets inspector panel.
 */
const LayoutModePanel = ( { attributes, setAttributes, isOpen, onToggle } ) => {
	const {
		presetStyle = 'classic-card',
		postLayoutMode = 'classic',
		horizontalMediaWidth = 45,
		horizontalMediaPosition = 'left',
		overlayGradientScrim = DEFAULT_OVERLAY_SCRIM,
		overlayScrimHeight = 75,
	} = attributes;

	const [ isCustomScrim, setIsCustomScrim ] = useState( false );

	return (
		<PanelBody
			title={ __( 'Layout & Presets', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<PresetSelector
				label={ __( 'Card Preset', 'gslider-blocks' ) }
				presets={ POST_CAROUSEL_PRESETS }
				value={ presetStyle }
				onChange={ ( value ) =>
					setAttributes( { presetStyle: value } )
				}
				setAttributes={ setAttributes }
				currentAttributes={ attributes }
				columns={ 3 }
				defaultPresetValue="classic-card"
			/>

			<SwitcherControl
				label={ __( 'Layout Archetype', 'gslider-blocks' ) }
				options={ LAYOUT_MODE_OPTIONS }
				value={ postLayoutMode }
				onChange={ ( value ) =>
					setAttributes( { postLayoutMode: value } )
				}
			/>

			{ postLayoutMode === 'overlay' && (
				<>
					<GradientColorControl
						label={ __(
							'Overlay Gradient Scrim',
							'gslider-blocks'
						) }
						globalCustomGradientSwitcher={ isCustomScrim }
						setGlobalCustomGradientSwitcher={ setIsCustomScrim }
						globalCustomGradientInputValue={ overlayGradientScrim }
						setGlobalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								overlayGradientScrim:
									value || DEFAULT_OVERLAY_SCRIM,
							} )
						}
						globalGradientColor={ overlayGradientScrim }
						setGlobalGradientColor={ ( value ) =>
							setAttributes( {
								overlayGradientScrim:
									value || DEFAULT_OVERLAY_SCRIM,
							} )
						}
					/>

					<InputControls
						label={ __( 'Scrim Height (%)', 'gslider-blocks' ) }
						value={ String( overlayScrimHeight ) }
						onChangeValue={ ( value ) =>
							setAttributes( {
								overlayScrimHeight: clampNumber(
									value,
									40,
									100,
									75
								),
							} )
						}
						helpText={ __(
							'Gradient scrim minimum height percentage (40–100%).',
							'gslider-blocks'
						) }
					/>
				</>
			) }

			{ postLayoutMode === 'horizontal' && (
				<>
					<SwitcherControl
						label={ __( 'Media Position', 'gslider-blocks' ) }
						options={ MEDIA_POSITION_OPTIONS }
						value={ horizontalMediaPosition }
						onChange={ ( value ) =>
							setAttributes( { horizontalMediaPosition: value } )
						}
					/>

					<InputControls
						label={ __(
							'Media Column Width (%)',
							'gslider-blocks'
						) }
						value={ String( horizontalMediaWidth ) }
						onChangeValue={ ( value ) =>
							setAttributes( {
								horizontalMediaWidth: clampNumber(
									value,
									30,
									60,
									45
								),
							} )
						}
						helpText={ __(
							'Image column width percentage on desktop/tablet (30–60%).',
							'gslider-blocks'
						) }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default LayoutModePanel;
