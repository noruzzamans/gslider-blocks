/**
 * Animation Utils — Reusable Frontend JavaScript
 *
 * Import this in any block's view.js to enable animations.
 *
 * @example
 * import { initEntranceAnimations, initCardTilt, applyStaggerDelays } from '@Utils/animation-utils';
 *
 * document.querySelectorAll('.my-wrapper').forEach( wrapper => {
 *     initEntranceAnimations( wrapper );
 *     applyStaggerDelays( wrapper );
 *     initCardTilt( wrapper );
 * });
 *
 * @package GSlider\Utils
 */

/**
 * Initialize scroll-triggered entrance animations using IntersectionObserver.
 *
 * Reads config from wrapper's data-animation-settings JSON attribute:
 *  - duration  {number} ms — animation duration
 *  - delay     {number} ms — base delay before animation
 *  - offset    {number} %  — how far into viewport to trigger (0–50)
 *  - easing    {string}    — CSS timing function
 *
 * @param {HTMLElement} wrapper  The block wrapper element.
 */
export function initEntranceAnimations( wrapper ) {
    const cards = wrapper.querySelectorAll( '.gslider-has-entrance-anim' );
    if ( ! cards.length ) return;

    let settings = {};
    try {
        const raw = wrapper.dataset.animationSettings;
        if ( raw ) settings = JSON.parse( raw );
    } catch ( e ) {}

    const duration = settings.duration || 600;
    const delay    = settings.delay    || 0;
    const offset   = Math.min( Math.max( settings.offset || 15, 0 ), 50 ) / 100;
    const easing   = settings.easing   || 'ease-out';

    cards.forEach( ( card ) => {
        // Set custom duration & easing via CSS variable
        card.style.setProperty( '--animate-duration', duration + 'ms' );
        card.style.animationTimingFunction = easing;
        if ( delay > 0 ) {
            const current = parseFloat( card.style.animationDelay ) || 0;
            card.style.animationDelay = ( current + delay ) + 'ms';
        }
        // Hide until animation triggers (prevent FOUC)
        card.style.visibility = 'hidden';
    } );

    const observer = new IntersectionObserver(
        ( entries ) => {
            entries.forEach( ( entry ) => {
                if ( entry.isIntersecting ) {
                    entry.target.style.visibility = 'visible';
                    observer.unobserve( entry.target ); // fire-and-forget
                }
            } );
        },
        { threshold: offset }
    );

    cards.forEach( ( card ) => observer.observe( card ) );
}

/**
 * Apply staggered animation delays to cards.
 * Call this BEFORE initEntranceAnimations so delays stack correctly.
 *
 * Reads from wrapper's data-stagger-delay attribute (number in ms).
 *
 * @param {HTMLElement} wrapper  The block wrapper element.
 */
export function applyStaggerDelays( wrapper ) {
    if ( wrapper.dataset.staggerEnabled !== '1' ) return;

    const staggerMs = parseInt( wrapper.dataset.staggerDelay ) || 100;
    const cards     = wrapper.querySelectorAll( '.gslider-has-entrance-anim' );

    cards.forEach( ( card, index ) => {
        const current = parseFloat( card.style.animationDelay ) || 0;
        card.style.animationDelay = ( current + index * staggerMs ) + 'ms';
    } );
}

/**
 * Initialize 3D tilt effect on hover.
 * Reads max angle from wrapper's data-tilt-max attribute.
 *
 * @param {HTMLElement} wrapper  The block wrapper element.
 */
export function initCardTilt( wrapper ) {
    const cards = wrapper.querySelectorAll( '.gslider-has-tilt' );
    if ( ! cards.length ) return;

    const maxAngle    = parseFloat( wrapper.dataset.tiltMax ) || 12;
    const perspective = parseFloat( wrapper.dataset.tiltPerspective ) || 800;
    const scale       = parseFloat( wrapper.dataset.tiltScale ) || 1.02;
    const speed       = parseInt( wrapper.dataset.tiltSpeed ) || 400;

    cards.forEach( ( card ) => {
        card.style.transition     = `transform ${ speed }ms ease`;
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange     = 'transform';

        card.addEventListener( 'mousemove', ( e ) => {
            const rect    = card.getBoundingClientRect();
            const x       = e.clientX - rect.left;
            const y       = e.clientY - rect.top;
            const centerX = rect.width  / 2;
            const centerY = rect.height / 2;

            const rotateX = ( ( y - centerY ) / centerY ) * -maxAngle;
            const rotateY = ( ( x - centerX ) / centerX ) *  maxAngle;

            card.style.transform = `perspective(${ perspective }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) scale3d(${ scale },${ scale },${ scale })`;
        } );

        card.addEventListener( 'mouseleave', () => {
            card.style.transform = `perspective(${ perspective }px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        } );
    } );
}
