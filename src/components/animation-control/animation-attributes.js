/**
 * Shared Animation Attributes
 *
 * This file defines all animation-related block attributes.
 * Spread this into any block's attributes.js to enable animation support:
 *
 * @example
 * import { animationAttributes } from '@Components/animation-control/animation-attributes';
 * const attributes = { ...blockSpecificAttributes, ...animationAttributes };
 *
 * @package GSlider\Blocks
 */

export const animationAttributes = {

    /** Entrance Animation */
    cardEntranceAnimation: {
        type: 'string',
        default: 'none',
    },
    cardEntranceAnimationDuration: {
        type: 'number',
        default: 600,
    },
    cardEntranceAnimationDelay: {
        type: 'number',
        default: 0,
    },
    cardEntranceAnimationOffset: {
        type: 'number',
        default: 15,
    },
    cardEntranceAnimationEasing: {
        type: 'string',
        default: 'ease-out',
    },

    /** Stagger Animation */
    enableStaggerAnimation: {
        type: 'boolean',
        default: false,
    },
    cardStaggerDelay: {
        type: 'number',
        default: 100,
    },

    /** Card Hover Animation */
    cardHoverAnimation: {
        type: 'string',
        default: 'none',
    },
    cardHoverAnimationDuration: {
        type: 'number',
        default: 300,
    },

    /** 3D Tilt Effect */
    enableCardTilt: {
        type: 'boolean',
        default: false,
    },
    cardTiltMaxAngle: {
        type: 'number',
        default: 12,
    },
};
