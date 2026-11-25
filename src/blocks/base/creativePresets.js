import { __ } from '@wordpress/i18n';

/**
 * Curated Swiper `creativeEffect` presets for the image slider.
 *
 * `stack` is the configuration the block shipped with when the creative effect
 * was first offered; the others add tilt, depth and a cross-slide shift.
 */
export const CREATIVE_PRESETS = [
	{ label: __( 'Stack', 'gslider-blocks' ), value: 'stack' },
	{ label: __( 'Tilt', 'gslider-blocks' ), value: 'tilt' },
	{ label: __( 'Depth', 'gslider-blocks' ), value: 'depth' },
	{ label: __( 'Shift', 'gslider-blocks' ), value: 'shift' },
];

const EFFECTS = {
	stack: {
		prev: { shadow: true, translate: [ '-120%', 0, -500 ] },
		next: { shadow: true, translate: [ '120%', 0, -500 ] },
	},
	tilt: {
		prev: {
			shadow: true,
			translate: [ '-20%', 0, -1 ],
			rotate: [ 0, 0, -10 ],
		},
		next: {
			shadow: true,
			translate: [ '100%', 0, 0 ],
			rotate: [ 0, 0, 0 ],
		},
	},
	depth: {
		prev: {
			shadow: true,
			translate: [ 0, 0, -800 ],
			rotate: [ 180, 0, 0 ],
		},
		next: {
			shadow: true,
			translate: [ 0, 0, -800 ],
			rotate: [ -180, 0, 0 ],
		},
	},
	shift: {
		prev: {
			shadow: false,
			translate: [ '-20%', 0, -200 ],
			opacity: 0,
		},
		next: { shadow: false, translate: [ '100%', 0, 0 ], opacity: 1 },
	},
};

/**
 * Return the Swiper `creativeEffect` of a preset; an unknown name answers stack.
 *
 * @param {string} preset Preset name.
 * @return {Object} Swiper creativeEffect configuration.
 */
export const creativeEffectFor = ( preset ) =>
	EFFECTS[ preset ] ?? EFFECTS.stack;
