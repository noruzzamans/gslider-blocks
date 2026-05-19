import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
} from '@wordpress/block-editor';
import { Spinner, Placeholder } from '@wordpress/components';
import { useState, useEffect, useRef } from "@wordpress/element";
import { useSelect } from '@wordpress/data';
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import Inspector from './inspector';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generatePostCarouselStyle from './styling';

export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
	const {
		blockId,
		blockStyle,
		deviceType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		paginationPositionType,
		showNavigation,
		showPagination,

		globalID,
		globalClass,
		navigationArrowPositionType,
		navigationArrowPosition,

		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,

		enableLazyLoad,

	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator({
		clientId,
		blockId,
		blockPrefix: 'gslider-post-carousel',
		isSelected,
		attributes,
		setAttributes,
	});

	/** Start Generate Block Style */
	useEffect(() => {
		if (blockId) {
			const css = generatePostCarouselStyle(attributes);
			setAttributes({ blockStyle: css });
		}
	}, [attributes, blockId]);
	/** End Generate Block Style */

	// Fetch posts using WordPress data store
	const { posts, isLoading } = useSelect((select) => {
		const { getEntityRecords, isResolving } = select('core');
		const query = {
			per_page: 6,
			_embed: true,
			status: 'publish',
			orderby: 'date',
			order: 'desc',
		};
		return {
			posts: getEntityRecords('postType', 'post', query),
			isLoading: isResolving('getEntityRecords', ['postType', 'post', query]),
		};
	}, []);

	// Block props for container
	const blockProps = useBlockProps({
		className: `gslider-post-carousel-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? 'has-pagination' : ''}`,
	});

	// Refs for vanilla JS Swiper
	const swiperContainerRef = useRef(null);
	const swiperInstanceRef = useRef(null);

	// Ref for panel settings focus management
	const panelRef = useRef(null);
	SwitchToBlockSettings(panelRef);

	// Refs for navigation buttons
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const paginationInsideRef = useRef(null);
	const paginationOutsideRef = useRef(null);

	/**
	 * Vanilla JS Swiper initialization
	 * Destroys and recreates Swiper when settings change for instant updates
	 */
	useEffect(() => {
		// Check if Swiper is available globally and container exists
		if (!window.Swiper || !swiperContainerRef.current || !posts || posts.length === 0) {
			return;
		}

		// Destroy previous instance if exists
		if (swiperInstanceRef.current) {
			swiperInstanceRef.current.destroy(true, true);
			swiperInstanceRef.current = null;
		}

		// Clear both pagination elements to prevent stale bullets when switching position
		if (paginationInsideRef.current) {
			paginationInsideRef.current.innerHTML = '';
		}
		if (paginationOutsideRef.current) {
			paginationOutsideRef.current.innerHTML = '';
		}

		// Build Swiper settings
		const swiperSettings = {
			effect: carouselEffect,
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.[deviceType] || 1,
					spaceBetween: carouselPerColumnGap?.[deviceType] || 0,
				},
				768: {
					slidesPerView: carouselPerColumn?.[deviceType] || 2,
					spaceBetween: carouselPerColumnGap?.[deviceType] || 20,
				},
				1025: {
					slidesPerView: carouselPerColumn?.[deviceType] || 3,
					spaceBetween: carouselPerColumnGap?.[deviceType] || 20,
				},
			},
			loop: infiniteLoop,
			autoplay: autoplay
				? {
					delay: autoplayDelay?.[deviceType] || 1000,
					pauseOnMouseEnter: pauseOnHover,
					disableOnInteraction: false,
					stopOnLastSlide: stopOnLastSlide,
					reverseDirection: reverseDirection,
				}
				: false,
			speed: speed?.[deviceType] || 800,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,
			keyboard: keyboardNavigation ? {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false,
			} : false,
			navigation: showNavigation?.[deviceType]
				? {
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}
				: false,
			pagination: showPagination?.[deviceType]
				? {
					el: paginationPositionType === 'outside'
						? paginationOutsideRef.current
						: paginationInsideRef.current,
					type: paginationType,
					dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
					clickable: true,
				}
				: false,
		};

		// Initialize new Swiper instance
		swiperInstanceRef.current = new window.Swiper(swiperContainerRef.current, swiperSettings);

		// Cleanup on unmount or before re-initialization
		return () => {
			if (swiperInstanceRef.current) {
				swiperInstanceRef.current.destroy(true, true);
				swiperInstanceRef.current = null;
			}
		};
	}, [
		blockId,
		deviceType,
		posts,
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		infiniteLoop,
		autoplay,
		autoplayDelay,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		speed,
		allowTouchMove,
		mousewheelControl,
		keyboardNavigation,
		showNavigation,
		showPagination,
		paginationType,
		dynamicBullets,
		paginationPositionType,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
	]);

	/**
	 * Get featured image URL from embedded post data
	 */
	const getFeaturedImageUrl = (post) => {
		if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
			const media = post._embedded['wp:featuredmedia'][0];
			// Try medium_large first, then full
			if (media.media_details && media.media_details.sizes) {
				if (media.media_details.sizes.medium_large) {
					return media.media_details.sizes.medium_large.source_url;
				}
				if (media.media_details.sizes.large) {
					return media.media_details.sizes.large.source_url;
				}
			}
			return media.source_url;
		}
		return null;
	};

	/**
	 * Decode HTML entities in post title
	 */
	const decodeHtmlEntities = (text) => {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = text;
		return textArea.value;
	};

	return (
		<>
			{ isSelected && (
				<Inspector
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			)}

			<div {...blockProps}>

				{isLoading && (
					<Placeholder
						icon={<span className="dashicons dashicons-admin-post" />}
						label={__('Post Carousel', 'gslider-blocks')}
					>
						<Spinner />
					</Placeholder>
				)}

				{!isLoading && (!posts || posts.length === 0) && (
					<Placeholder
						icon={<span className="dashicons dashicons-admin-post" />}
						label={__('Post Carousel', 'gslider-blocks')}
						instructions={__('No posts found. Create some posts to display in the carousel.', 'gslider-blocks')}
					/>
				)}

				{!isLoading && posts && posts.length > 0 && (
					<div className="swiper" ref={swiperContainerRef} role="region" aria-label="Post Carousel">
						<div className="swiper-wrapper">
						{posts.map((post) => {
							const featuredImageUrl = getFeaturedImageUrl(post);
							return (
								<div className="swiper-slide" key={post.id}>
									<div className={`gslider-post-carousel-content-wrapper ${globalClass}`} {...(globalID && { id: globalID })} ref={panelRef}>
										<div className="gslider-post-carousel-card">
											{featuredImageUrl && (
												<div className="gslider-post-carousel-image">
													<img
														src={featuredImageUrl}
														alt={decodeHtmlEntities(post.title.rendered)}
														loading={enableLazyLoad ? "lazy" : undefined}
													/>
												</div>
											)}
											{(
												<div className="gslider-post-carousel-title">
													<h3>{decodeHtmlEntities(post.title.rendered)}</h3>
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
						</div>

						{showNavigation?.[deviceType] && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
							<>
								<div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
									<div ref={prevRef} className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
									<div ref={nextRef} className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
								</div>
							</>
						)}

						{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
							<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
								<div className="swiper-button-prev" ref={prevRef} role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
								<div className="swiper-button-next" ref={nextRef} role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
							</div>
						)}

						{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
							<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
								<div className="swiper-button-prev" ref={prevRef} role="button" tabIndex={0} aria-label="Previous slide">
									<img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
								</div>
								<div className="swiper-button-next" ref={nextRef} role="button" tabIndex={0} aria-label="Next slide">
									<img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
								</div>
							</div>
						)}

						{/* Pagination inside swiper container */}
						<div className="swiper-pagination swiper-pagination-post-carousel" ref={paginationInsideRef}></div>

					</div>
				)}

				{showNavigation?.[deviceType] && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
					<>
						<div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
							<div ref={prevRef} className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
							<div ref={nextRef} className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
						</div>
					</>
				)}

				{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
					<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
						<div className="swiper-button-prev" ref={prevRef} role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
						<div className="swiper-button-next" ref={nextRef} role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
					</div>
				)}

				{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
					<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
						<div className="swiper-button-prev" ref={prevRef} role="button" tabIndex={0} aria-label="Previous slide">
							<img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
						</div>
						<div className="swiper-button-next" ref={nextRef} role="button" tabIndex={0} aria-label="Next slide">
							<img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
						</div>
					</div>
				)}

				{/* Pagination outside swiper container */}
				<div
					className="swiper-pagination swiper-pagination-post-carousel"
					ref={paginationOutsideRef}
					aria-label="Carousel pagination"
				></div>

			</div >
			<style>{blockStyle}</style>
		</>
	);
}
