/**
 * Post Carousel Block - Style Generation
 * Returns Dynamic Generated CSS
 */

import getCustomCss from '@Utils/getCustomCss';

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @returns {string} CSS string
 */
const generatePostCarouselStyle = (attributes) => {
    const {
        blockId,
        deviceType,
        blockStyle,
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
        enableLazyLoad,
        verticalAlign,
        carouselEffect,
        mousewheelControl,
        keyboardNavigation,
        paginationType,
        dynamicBullets,

        /** Start Show/Hide Elements */
        paginationPositionType,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */



        /** Start Layout & Content Setting */
        layoutHeight,
        layoutHeightUnits,
        /** End Layout & Content Setting */

        /** Start Navigation Custom Arrows */
        navigationArrowsIconSwitcher,
        navigationArrowsIconLeftAlign,
        navigationArrowsIconLeft,
        navigationArrowsIconLeftImageUrl,
        navigationArrowsIconLeftImageAlt,
        navigationArrowsIconLeftImageID,

        navigationArrowsIconRightAlign,
        navigationArrowsIconRight,
        navigationArrowsIconRightImageUrl,
        navigationArrowsIconRightImageAlt,
        navigationArrowsIconRightImageID,
        /** End Navigation Custom Arrows */

        /** Start Arrows Style */
        navigationArrowSize,
        navigationArrowSizeUnits,

        /** Start Arrows Color */
        navigationArrowColorSwitcher,
        navigationArrowColor,
        navigationArrowColorHover,
        /** End Arrows Color */

        /** Start Background */
        navigationArrowNormalBackgroundType,
        navigationArrowNormalClassicColor,
        navigationArrowNormalGradientColor,
        navigationArrowNormalCustomGradientSwitcher,
        navigationArrowNormalCustomGradientInputValue,
        navigationArrowHoverBackgroundType,
        navigationArrowHoverClassicColor,
        navigationArrowHoverGradientColor,
        navigationArrowHoverCustomGradientSwitcher,
        navigationArrowHoverCustomGradientInputValue,
        /** End Background */

        /** Start Arrows Dimensions */
        navigationArrowWidth,
        navigationArrowWidthUnits,
        navigationArrowHeight,
        navigationArrowHeightUnits,
        /** End Arrows Dimensions */

        /** Start Border */
        navigationArrowBorder,
        navigationArrowBorderColorSwitcher,
        navigationArrowBorderColor,
        navigationArrowBorderHoverColor,
        navigationArrowBorderUnits,
        navigationArrowDesktopBorder,
        navigationArrowDesktopBorderCssStyle,
        navigationArrowTabletBorder,
        navigationArrowTabletBorderCssStyle,
        navigationArrowMobileBorder,
        navigationArrowMobileBorderCssStyle,
        navigationArrowBorderLink,
        /** End Border */

        /** Start Border Radius */
        navigationArrowBorderRadiusUnits,
        navigationArrowDesktopBorderRadius,
        navigationArrowDesktopBorderRadiusCssStyle,
        navigationArrowTabletBorderRadius,
        navigationArrowTabletBorderRadiusCssStyle,
        navigationArrowMobileBorderRadius,
        navigationArrowMobileBorderRadiusCssStyle,
        navigationArrowBorderRadiusLink,
        /** End Border Radius */

        /** Start Box Shadow */
        navigationArrowBoxShadowValuesSwitcher,
        navigationArrowBoxShadowValues,
        navigationArrowBoxShadowCssValue,
        navigationArrowBoxShadowHoverValues,
        navigationArrowBoxShadowHoverCssValue,
        /** End Box Shadow */

        /** Start Position */
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowDirection,

        navigationArrowPositionTopOffset,
        navigationArrowPositionTopOffsetUnits,
        navigationArrowPositionLeftOffset,
        navigationArrowPositionLeftOffsetUnits,
        navigationArrowPositionRightOffset,
        navigationArrowPositionRightOffsetUnits,
        navigationArrowPositionBottomOffset,
        navigationArrowPositionBottomOffsetUnits,

        navigationArrowGap,
        navigationArrowGapUnits,

        navigationArrowPositionOutsidePadding,
        navigationArrowPositionOutsidePaddingUnits,
        /** End Position */

        /** Start Dots Margin */
        paginationDotsMarginUnits,
        paginationDotsDesktopMargin,
        paginationDotsDesktopMarginCssStyle,
        paginationDotsTabletMargin,
        paginationDotsTabletMarginCssStyle,
        paginationDotsMobileMargin,
        paginationDotsMobileMarginCssStyle,
        paginationDotsMarginLink,
        /** End Dots Margin */

        /** Start Dots Position */
        paginationDotsPosition,
        paginationDotsPositionUnits,
        paginationProgressbarPosition,
        paginationProgressbarPositionUnits,
        /** End Dots Position */

        /** Start Dots Style */
        paginationDotsSwitcher,
        paginationNormalDotsBgColor,
        paginationActiveDotsBgColor,
        paginationNormalDotsWidth,
        paginationNormalDotsWidthUnits,
        paginationNormalDotsHeight,
        paginationNormalDotsHeightUnits,
        /** End Dots Style */

        /** Start Dots Border */
        paginationNormalDotsBorder,
        paginationNormalDotsBorderColorSwitcher,
        paginationNormalDotsBorderColor,
        paginationNormalDotsBorderHoverColor,
        paginationNormalDotsBorderUnits,
        paginationNormalDotsDesktopBorder,
        paginationNormalDotsDesktopBorderCssStyle,
        paginationNormalDotsTabletBorder,
        paginationNormalDotsTabletBorderCssStyle,
        paginationNormalDotsMobileBorder,
        paginationNormalDotsMobileBorderCssStyle,
        paginationNormalDotsBorderLink,
        /** End Dots Border */

        /** Start Dots Border Radius */
        paginationNormalDotsBorderRadius,
        paginationNormalDotsBorderRadiusUnits,
        paginationNormalDotsDesktopBorderRadius,
        paginationNormalDotsDesktopBorderRadiusCssStyle,
        paginationNormalDotsTabletBorderRadius,
        paginationNormalDotsTabletBorderRadiusCssStyle,
        paginationNormalDotsMobileBorderRadius,
        paginationNormalDotsMobileBorderRadiusCssStyle,
        paginationNormalDotsBorderRadiusLink,
        /** End Dots Border Radius */

        /** Start Active Dots */
        paginationActiveDotsWidth,
        paginationActiveDotsWidthUnits,
        paginationActiveDotsHeight,
        paginationActiveDotsHeightUnits,
        /** End Active Dots */

        /** Start Active Dots Border */
        paginationActiveDotsBorder,
        paginationActiveDotsBorderColorSwitcher,
        paginationActiveDotsBorderColor,
        paginationActiveDotsBorderHoverColor,
        /** End Active Dots Border */

        /** Start Active Dots Border */
        paginationActiveDotsBorderUnits,
        paginationActiveDotsDesktopBorder,
        paginationActiveDotsDesktopBorderCssStyle,
        paginationActiveDotsTabletBorder,
        paginationActiveDotsTabletBorderCssStyle,
        paginationActiveDotsMobileBorder,
        paginationActiveDotsMobileBorderCssStyle,
        paginationActiveDotsBorderLink,
        /** End Active Dots Border */

        /** Start Active Dots Border Radius */
        paginationActiveDotsBorderRadiusUnits,
        paginationActiveDotsDesktopBorderRadius,
        paginationActiveDotsDesktopBorderRadiusCssStyle,
        paginationActiveDotsTabletBorderRadius,
        paginationActiveDotsTabletBorderRadiusCssStyle,
        paginationActiveDotsMobileBorderRadius,
        paginationActiveDotsMobileBorderRadiusCssStyle,
        paginationActiveDotsBorderRadiusLink,
        /** End Active Dots Border Radius */

        /** start Fraction Typography and Color */
        paginationFractionFontFamily,
        paginationFractionFontSize,
        paginationFractionFontSizeUnits,
        paginationFractionFontWeight,
        paginationFractionFontStyle,
        paginationFractionTextTransform,
        paginationFractionTextDecoration,
        paginationFractionLineHeight,
        paginationFractionLineHeightUnits,
        paginationFractionLetterSpacing,
        paginationFractionLetterSpacingUnits,
        paginationFractionWordSpacing,
        paginationFractionWordSpacingUnits,
        paginationFractionColorSwitcher,
        paginationFractionColor,
        paginationFractionColorHover,
        /** End Fraction Typography and Color */

        /** start pagination Progressbar Color */
        paginationProgressbarBGColorSwitcher,
        paginationProgressbarBGColor,
        paginationProgressbarBGActiveColor,
        paginationProgressbarHeight,
        paginationProgressbarHeightUnits,
        /** End pagination Progressbar Color */

        /** Global Settings */

        /** Start Global Margin */
        globalMarginUnits,
        globalMarginDesktop,
        globalMarginDesktopCssStyle,
        globalMarginTablet,
        globalMarginTabletCssStyle,
        globalMarginMobile,
        globalMarginMobileCssStyle,
        globalMarginLink,
        /** End Global Margin */

        /** Start Global Padding */
        globalPaddingUnits,
        globalPaddingDesktop,
        globalPaddingDesktopCssStyle,
        globalPaddingTablet,
        globalPaddingTabletCssStyle,
        globalPaddingMobile,
        globalPaddingMobileCssStyle,
        globalPaddingLink,
        /** End Global Padding */

        /** Start Global Z-Index */
        globalZIndex,
        globalID,
        globalClass,
        /** End Global Z-Index */

        /** Start Global Background */
        globalNormalBackgroundType,
        globalNormalClassicColor,
        globalNormalGradientColor,
        globalNormalCustomGradientSwitcher,
        globalNormalCustomGradientInputValue,
        globalNormalBackgroundImageUrl,
        globalNormalBackgroundImagePosition,
        globalNormalBackgroundImageAttachment,
        globalNormalBackgroundImageRepeat,
        globalNormalBackgroundImageSize,

        globalHoverBackgroundType,
        globalHoverClassicColor,
        globalHoverGradientColor,
        globalHoverCustomGradientSwitcher,
        globalHoverCustomGradientInputValue,
        globalHoverBackgroundImageUrl,
        globalHoverBackgroundImagePosition,
        globalHoverBackgroundImageAttachment,
        globalHoverBackgroundImageRepeat,
        globalHoverBackgroundImageSize,
        /** End Global Setting */

        /** Start Global Border */
        globalBorder,
        globalBorderColorSwitcher,
        globalBorderColor,
        globalBorderHoverColor,

        globalBorderUnits,
        globalBorderDesktop,
        globalBorderDesktopCssStyle,
        globalBorderTablet,
        globalBorderTabletCssStyle,
        globalBorderMobile,
        globalBorderMobileCssStyle,
        globalBorderLink,
        /** End Global Border */

        /** Start Global Border Radius */
        globalBorderRadiusUnits,
        globalBorderRadiusDesktop,
        globalBorderRadiusDesktopCssStyle,
        globalBorderRadiusTablet,
        globalBorderRadiusTabletCssStyle,
        globalBorderRadiusMobile,
        globalBorderRadiusMobileCssStyle,
        globalBorderRadiusLink,
        /** End Global Border Radius */

        /** Start Global Box Shadow */
        globalBoxShadowValuesSwitcher,
        globalBoxShadowValues,
        globalBoxShadowCssValue,
        globalBoxShadowHoverValues,
        globalBoxShadowHoverCssValue,
        /** End Global Box Shadow */

        /** Start Global Custom CSS */
        globalCustomCSS,
        /** End Global Custom CSS */

        /** Start Image Settings */
        imageMaxWidth,
        imageMaxWidthUnits,
        imageHeight,
        imageHeightUnits,
        imageObjectFit,
        imageObjectPosition,

        imagePaddingUnits,
        imagePaddingDesktop,
        imagePaddingDesktopCssStyle,
        imagePaddingTablet,
        imagePaddingTabletCssStyle,
        imagePaddingMobile,
        imagePaddingMobileCssStyle,
        imagePaddingLink,

        imageMarginUnits,
        imageMarginDesktop,
        imageMarginDesktopCssStyle,
        imageMarginTablet,
        imageMarginTabletCssStyle,
        imageMarginMobile,
        imageMarginMobileCssStyle,
        imageMarginLink,

        imageNormalBackgroundType,
        imageNormalClassicColor,
        imageNormalGradientColor,
        imageNormalCustomGradientSwitcher,
        imageNormalCustomGradientInputValue,
        imageHoverBackgroundType,
        imageHoverClassicColor,
        imageHoverGradientColor,
        imageHoverCustomGradientSwitcher,
        imageHoverCustomGradientInputValue,

        imageBorder,
        imageBorderColorSwitcher,
        imageBorderColor,
        imageBorderHoverColor,
        imageBorderUnits,
        imageBorderDesktop,
        imageBorderDesktopCssStyle,
        imageBorderTablet,
        imageBorderTabletCssStyle,
        imageBorderMobile,
        imageBorderMobileCssStyle,
        imageBorderLink,

        imageBorderRadiusUnits,
        imageBorderRadiusDesktop,
        imageBorderRadiusDesktopCssStyle,
        imageBorderRadiusTablet,
        imageBorderRadiusTabletCssStyle,
        imageBorderRadiusMobile,
        imageBorderRadiusMobileCssStyle,
        imageBorderRadiusLink,

        imageBoxShadowValuesSwitcher,
        imageBoxShadowValues,
        imageBoxShadowCssValue,
        imageBoxShadowHoverValues,
        imageBoxShadowHoverCssValue,

        imageHoverEffect,
        imageHoverOpacity,
        imageHoverScale,
        imageHoverLift,
        imageHoverLiftUnits,
        imageTransitionDuration,
        /** End Image Settings */

        /** Start Post Title Typography, Color, Margin & Padding */
        postTitleAlign,
        postTitleFontFamily,
        postTitleFontSize,
        postTitleFontSizeUnits,
        postTitleFontWeight,
        postTitleFontStyle,
        postTitleTextTransform,
        postTitleTextDecoration,
        postTitleLineHeight,
        postTitleLineHeightUnits,
        postTitleLetterSpacing,
        postTitleLetterSpacingUnits,
        postTitleWordSpacing,
        postTitleWordSpacingUnits,

        postTitleColorSwitcher,
        postTitleColor,
        postTitleColorHover,

        postTitleMarginUnits,
        postTitleDesktopMargin,
        postTitleDesktopMarginCssStyle,
        postTitleTabletMargin,
        postTitleTabletMarginCssStyle,
        postTitleMobileMargin,
        postTitleMobileMarginCssStyle,
        postTitleMarginLink,

        postTitlePaddingUnits,
        postTitleDesktopPadding,
        postTitleDesktopPaddingCssStyle,
        postTitleTabletPadding,
        postTitleTabletPaddingCssStyle,
        postTitleMobilePadding,
        postTitleMobilePaddingCssStyle,
        postTitlePaddingLink,
        /** End Post Title Typography, Color, Margin & Padding */

        /** Start Post Excerpt Styling */
        postExcerptAlign,
        postExcerptFontFamily,
        postExcerptFontSize,
        postExcerptFontSizeUnits,
        postExcerptFontWeight,
        postExcerptFontStyle,
        postExcerptTextTransform,
        postExcerptTextDecoration,
        postExcerptLineHeight,
        postExcerptLineHeightUnits,
        postExcerptLetterSpacing,
        postExcerptLetterSpacingUnits,
        postExcerptWordSpacing,
        postExcerptWordSpacingUnits,
        postExcerptColor,
        postExcerptColorHover,
        postExcerptDesktopMarginCssStyle,
        postExcerptTabletMarginCssStyle,
        postExcerptMobileMarginCssStyle,
        postExcerptDesktopPaddingCssStyle,
        postExcerptTabletPaddingCssStyle,
        postExcerptMobilePaddingCssStyle,
        /** End Post Excerpt Styling */

        /** Start Post Category Styling */
        postCategoryAlign,

        postCategoryFontFamily,
        postCategoryFontSize,
        postCategoryFontSizeUnits,
        postCategoryFontWeight,
        postCategoryFontStyle,
        postCategoryTextTransform,
        postCategoryTextDecoration,
        postCategoryLineHeight,
        postCategoryLineHeightUnits,
        postCategoryLetterSpacing,
        postCategoryLetterSpacingUnits,
        postCategoryWordSpacing,
        postCategoryWordSpacingUnits,

        postCategoryColorSwitcher,
        postCategoryColor,
        postCategoryColorHover,

        postCategoryNormalBackgroundType,
        postCategoryNormalClassicColor,
        postCategoryNormalGradientColor,
        postCategoryNormalCustomGradientSwitcher,
        postCategoryNormalCustomGradientInputValue,
        postCategoryHoverBackgroundType,
        postCategoryHoverClassicColor,
        postCategoryHoverGradientColor,
        postCategoryHoverCustomGradientSwitcher,
        postCategoryHoverCustomGradientInputValue,

        postCategoryBorder,
        postCategoryBorderColorSwitcher,
        postCategoryBorderColor,
        postCategoryBorderHoverColor,
        postCategoryBorderUnits,
        postCategoryBorderDesktop,
        postCategoryBorderDesktopCssStyle,
        postCategoryBorderTablet,
        postCategoryBorderTabletCssStyle,
        postCategoryBorderMobile,
        postCategoryBorderMobileCssStyle,
        postCategoryBorderLink,

        postCategoryBorderRadiusUnits,
        postCategoryBorderRadiusDesktop,
        postCategoryBorderRadiusDesktopCssStyle,
        postCategoryBorderRadiusTablet,
        postCategoryBorderRadiusTabletCssStyle,
        postCategoryBorderRadiusMobile,
        postCategoryBorderRadiusMobileCssStyle,
        postCategoryBorderRadiusLink,

        postCategoryBoxShadowValuesSwitcher,
        postCategoryBoxShadowValues,
        postCategoryBoxShadowCssValue,
        postCategoryBoxShadowHoverValues,
        postCategoryBoxShadowHoverCssValue,

        postCategoryGap,
        postCategoryGapUnits,

        postCategoryMarginUnits,
        postCategoryDesktopMargin,
        postCategoryDesktopMarginCssStyle,
        postCategoryTabletMargin,
        postCategoryTabletMarginCssStyle,
        postCategoryMobileMargin,
        postCategoryMobileMarginCssStyle,
        postCategoryMarginLink,

        postCategoryPaddingUnits,
        postCategoryDesktopPadding,
        postCategoryDesktopPaddingCssStyle,
        postCategoryTabletPadding,
        postCategoryTabletPaddingCssStyle,
        postCategoryMobilePadding,
        postCategoryMobilePaddingCssStyle,
        postCategoryPaddingLink,

        postCategoryItemPaddingUnits,
        postCategoryItemDesktopPadding,
        postCategoryItemDesktopPaddingCssStyle,
        postCategoryItemTabletPadding,
        postCategoryItemTabletPaddingCssStyle,
        postCategoryItemMobilePadding,
        postCategoryItemMobilePaddingCssStyle,
        postCategoryItemPaddingLink,
        /** End Post Category Styling */

    } = attributes;

    /**
     * Get global background normal styles
     */
    const getGlobalBackgroundNormalStyles = (device) => {
        const bgType = globalNormalBackgroundType;
        const bgColor = globalNormalClassicColor;
        const bgGradient = globalNormalGradientColor;
        const customGradient = globalNormalCustomGradientInputValue;
        const customGradientEnabled = globalNormalCustomGradientSwitcher;

        const bgImageUrl = globalNormalBackgroundImageUrl?.[device];
        const bgImagePosition = globalNormalBackgroundImagePosition?.[device];
        const bgAttachment = globalNormalBackgroundImageAttachment?.[device];
        const bgRepeat = globalNormalBackgroundImageRepeat?.[device];
        const bgSize = globalNormalBackgroundImageSize?.[device];

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        let styles = bgColor ? { background: bgColor } : {};

        if (bgType !== 'gradient' && bgImageUrl) {
            styles = {
                ...styles,
                'background-image': `url(${bgImageUrl})`,
                'background-position': bgImagePosition
                    ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%`
                    : "50% 50%",
                'background-attachment': bgAttachment || undefined,
                'background-repeat': bgRepeat || undefined,
                'background-size': bgSize || undefined,
            };
        }

        return styles;
    };

    /**
     * Get global background hover styles
     */
    const getGlobalBackgroundHoverStyles = (device) => {
        const bgType = globalHoverBackgroundType;
        const bgColor = globalHoverClassicColor;
        const bgGradient = globalHoverGradientColor;
        const customGradient = globalHoverCustomGradientInputValue;
        const customGradientEnabled = globalHoverCustomGradientSwitcher;

        const bgImageUrl = globalHoverBackgroundImageUrl?.[device];
        const bgImagePosition = globalHoverBackgroundImagePosition?.[device];
        const bgAttachment = globalHoverBackgroundImageAttachment?.[device];
        const bgRepeat = globalHoverBackgroundImageRepeat?.[device];
        const bgSize = globalHoverBackgroundImageSize?.[device];

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        let styles = bgColor ? { background: bgColor } : {};

        if (bgType !== 'gradient' && bgImageUrl) {
            styles = {
                ...styles,
                'background-image': `url(${bgImageUrl})`,
                'background-position': bgImagePosition
                    ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%`
                    : "50% 50%",
                'background-attachment': bgAttachment || undefined,
                'background-repeat': bgRepeat || undefined,
                'background-size': bgSize || undefined,
            };
        }

        return styles;
    };

    /**
     * Convert object to string
     */
    const globalBackgroundStyleObjectToString = (styleObj) =>
        Object.entries(styleObj)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');

    /**
     * Get global background styles
     */
    const globalDesktopBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Desktop'));
    const globalTabletBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Tablet'));
    const globalMobileBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Mobile'));

    const globalDesktopBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Desktop'));
    const globalTabletBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Tablet'));
    const globalMobileBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Mobile'));

    /**
     * Get image background normal styles
     */
    const getImageBackgroundNormalStyles = () => {
        const bgType = imageNormalBackgroundType;
        const bgColor = imageNormalClassicColor;
        const bgGradient = imageNormalGradientColor;
        const customGradient = imageNormalCustomGradientInputValue;
        const customGradientEnabled = imageNormalCustomGradientSwitcher;

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        return bgColor ? { background: bgColor } : {};
    };

    /**
     * Get image background hover styles
     */
    const getImageBackgroundHoverStyles = () => {
        const bgType = imageHoverBackgroundType;
        const bgColor = imageHoverClassicColor;
        const bgGradient = imageHoverGradientColor;
        const customGradient = imageHoverCustomGradientInputValue;
        const customGradientEnabled = imageHoverCustomGradientSwitcher;

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        return bgColor ? { background: bgColor } : {};
    };

    const imageBackgroundNormalStyles = globalBackgroundStyleObjectToString(getImageBackgroundNormalStyles());
    const imageBackgroundHoverStyles = globalBackgroundStyleObjectToString(getImageBackgroundHoverStyles());

    /**
     * Get postCategory background normal styles
     */
    const getPostCategoryBackgroundNormalStyles = () => {
        const bgType = postCategoryNormalBackgroundType;
        const bgColor = postCategoryNormalClassicColor;
        const bgGradient = postCategoryNormalGradientColor;
        const customGradient = postCategoryNormalCustomGradientInputValue;
        const customGradientEnabled = postCategoryNormalCustomGradientSwitcher;

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        return bgColor ? { background: bgColor } : {};
    };

    /**
     * Get postCategory background hover styles
     */
    const getPostCategoryBackgroundHoverStyles = () => {
        const bgType = postCategoryHoverBackgroundType;
        const bgColor = postCategoryHoverClassicColor;
        const bgGradient = postCategoryHoverGradientColor;
        const customGradient = postCategoryHoverCustomGradientInputValue;
        const customGradientEnabled = postCategoryHoverCustomGradientSwitcher;

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        return bgColor ? { background: bgColor } : {};
    };

    const postCategoryBackgroundNormalStyles = globalBackgroundStyleObjectToString(getPostCategoryBackgroundNormalStyles());
    const postCategoryBackgroundHoverStyles = globalBackgroundStyleObjectToString(getPostCategoryBackgroundHoverStyles());

    /** Start All Block Style */
    const postCarouselCSS = `
        .${blockId}.gslider-post-carousel-wrapper {
            ${globalDesktopBackgroundNormalStyles}
            ${globalMarginDesktopCssStyle ? `margin: ${globalMarginDesktopCssStyle};` : ''} 
            ${globalPaddingDesktopCssStyle ? `padding: ${globalPaddingDesktopCssStyle};` : ''}
            ${globalBorder ? `border: ${globalBorder};` : ''}
            ${globalBorderDesktopCssStyle ? `border-width: ${globalBorderDesktopCssStyle};` : ''}  
            ${globalBorderRadiusDesktopCssStyle ? `border-radius: ${globalBorderRadiusDesktopCssStyle} !important;` : ''}
            ${globalBorderColor ? `border-color: ${globalBorderColor};` : ''}
            ${globalBoxShadowCssValue ? `box-shadow: ${globalBoxShadowCssValue} !important;` : ''}
            ${globalZIndex.Desktop ? `z-index: ${globalZIndex.Desktop};` : ''}
            box-sizing: border-box;
            position: relative;
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-post-carousel-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ''}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ''}
        }

        .${blockId} .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .${blockId}.gslider-post-carousel-wrapper .gslider-post-carousel-content-wrapper {
            ${layoutHeight.Desktop ? `height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : 'auto'}
            display: flex;
            align-items: center;
            justify-content: ${verticalAlign.Desktop || 'center'};
            transition: all .3s ease-in-out;
        }

        .${blockId}.gslider-post-carousel-wrapper.outside {
            ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                padding: ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop} 0 0;
            ` : ''}
    
            ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                padding: 0 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};
            ` : ''}

            ${navigationArrowPosition === 'center' ? `
                padding: 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};

            ` : ''}
        }

        .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
        .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
            z-index: 100 !important;
        }

        ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${navigationArrowDirection};
                gap: ${navigationArrowGap.Desktop ? `${navigationArrowGap.Desktop}${navigationArrowGapUnits.Desktop}` : '10px'};
                position: absolute;
                z-index: 100;
        
                ${navigationArrowPosition === 'top-left' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'top-center' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '50%'};
                    transform: translateX(-50%);
                ` : ''}
        
                ${navigationArrowPosition === 'top-right' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-center' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '50%'};
                    transform: translateX(-50%);
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-right' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : '0'};
                ` : ''}
            }
        
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next {
                position: relative;
                top: auto;
                right: auto;
                bottom: auto;
                left: auto;
                margin: 0 !important;
            }
        ` : ''}

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:after,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:after {
            display: none !important;
        }
        
        .${blockId} .swiper-button-prev,
        .${blockId} .swiper-button-next {
            ${navigationArrowColor ? `color: ${navigationArrowColor};` : ''}
            ${navigationArrowNormalBackgroundType === 'gradient' ? `  
                background: ${navigationArrowNormalCustomGradientSwitcher && navigationArrowNormalCustomGradientInputValue ? navigationArrowNormalCustomGradientInputValue : navigationArrowNormalGradientColor ? navigationArrowNormalGradientColor : navigationArrowNormalClassicColor};
            ` : `
                ${navigationArrowNormalClassicColor ? `background: ${navigationArrowNormalClassicColor};` : ''}
            `}
            ${navigationArrowBorder ? `border: ${navigationArrowBorder};` : ''}
            ${navigationArrowDesktopBorderCssStyle ? `border-width: ${navigationArrowDesktopBorderCssStyle};` : ''}  
            ${navigationArrowDesktopBorderRadiusCssStyle ? `border-radius: ${navigationArrowDesktopBorderRadiusCssStyle};` : ''}
            ${navigationArrowBorderColor ? `border-color: ${navigationArrowBorderColor};` : ''}
            ${navigationArrowBoxShadowCssValue ? `box-shadow: ${navigationArrowBoxShadowCssValue};` : ''}
            ${navigationArrowWidth.Desktop ? `width: ${navigationArrowWidth.Desktop}${navigationArrowWidthUnits.Desktop};` : ''}
            ${navigationArrowHeight.Desktop ? `height: ${navigationArrowHeight.Desktop}${navigationArrowHeightUnits.Desktop};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId} .swiper-button-prev:hover,
        .${blockId} .swiper-button-next:hover {
            ${navigationArrowColorHover ? `color: ${navigationArrowColorHover};` : ''}
            ${navigationArrowHoverBackgroundType === 'gradient' ? `
                background: ${navigationArrowHoverCustomGradientSwitcher && navigationArrowHoverCustomGradientInputValue ? navigationArrowHoverCustomGradientInputValue : navigationArrowHoverGradientColor ? navigationArrowHoverGradientColor : navigationArrowHoverClassicColor};
            ` : `
                ${navigationArrowHoverClassicColor ? `background: ${navigationArrowHoverClassicColor};` : ''}
            `}
            ${navigationArrowBorderHoverColor ? `border-color: ${navigationArrowBorderHoverColor};` : ''}
            ${navigationArrowBoxShadowHoverCssValue ? `box-shadow: ${navigationArrowBoxShadowHoverCssValue};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${navigationArrowColor ? `fill: ${navigationArrowColor};` : ''}
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
            ${navigationArrowColorHover ? `fill: ${navigationArrowColorHover};` : ''}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${navigationArrowSize.Desktop ? `font-size: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination {
            ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Desktop ? `top: ${paginationProgressbarPosition.Desktop}${paginationProgressbarPositionUnits.Desktop} !important;` : ''
        ) : (
            paginationDotsPosition.Desktop ? `bottom: ${paginationDotsPosition.Desktop}${paginationDotsPositionUnits.Desktop} !important;` : ''
        )}
            ${paginationDotsDesktopMarginCssStyle ? `margin: ${paginationDotsDesktopMarginCssStyle};` : ''}
        }

        .${blockId} .swiper-pagination-bullet {
            ${paginationNormalDotsBgColor ? `background-color: ${paginationNormalDotsBgColor};` : ''}
            ${paginationNormalDotsBorder ? `border: ${paginationNormalDotsBorder};` : ''}
            ${paginationNormalDotsDesktopBorderCssStyle ? `border-width: ${paginationNormalDotsDesktopBorderCssStyle};` : ''}   
            ${paginationNormalDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsDesktopBorderRadiusCssStyle};` : ''}
            ${paginationNormalDotsBorderColor ? `border-color: ${paginationNormalDotsBorderColor};` : ''}
            ${paginationNormalDotsWidth.Desktop ? `width: ${paginationNormalDotsWidth.Desktop}${paginationNormalDotsWidthUnits.Desktop};` : ''}
            ${paginationNormalDotsHeight.Desktop ? `height: ${paginationNormalDotsHeight.Desktop}${paginationNormalDotsHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-bullet-active {
            ${paginationActiveDotsBgColor ? `background-color: ${paginationActiveDotsBgColor};` : ''}
            ${paginationActiveDotsBorder ? `border: ${paginationActiveDotsBorder};` : ''}
            ${paginationActiveDotsDesktopBorderCssStyle ? `border-width: ${paginationActiveDotsDesktopBorderCssStyle};` : ''}   
            ${paginationActiveDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsDesktopBorderRadiusCssStyle};` : ''}
            ${paginationActiveDotsBorderColor ? `border-color: ${paginationActiveDotsBorderColor};` : ''}
            ${paginationActiveDotsWidth.Desktop ? `width: ${paginationActiveDotsWidth.Desktop}${paginationActiveDotsWidthUnits.Desktop};` : ''}
            ${paginationActiveDotsHeight.Desktop ? `height: ${paginationActiveDotsHeight.Desktop}${paginationActiveDotsHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-fraction { 
            ${paginationFractionFontFamily ? `font-family: ${paginationFractionFontFamily};` : ''}
            ${paginationFractionFontSize.Desktop && paginationFractionFontSizeUnits.Desktop ? `font-size: ${paginationFractionFontSize.Desktop}${paginationFractionFontSizeUnits.Desktop};` : ''}
            ${paginationFractionFontWeight ? `font-weight: ${paginationFractionFontWeight};` : ''}
            ${paginationFractionFontStyle ? `font-style: ${paginationFractionFontStyle};` : ''}
            ${paginationFractionTextTransform ? `text-transform: ${paginationFractionTextTransform};` : ''}
            ${paginationFractionTextDecoration ? `text-decoration: ${paginationFractionTextDecoration};` : ''}
            ${paginationFractionLineHeight.Desktop && paginationFractionLineHeightUnits.Desktop ? `line-height: ${paginationFractionLineHeight.Desktop}${paginationFractionLineHeightUnits.Desktop};` : ''}
            ${paginationFractionLetterSpacing.Desktop && paginationFractionLetterSpacingUnits.Desktop ? `letter-spacing: ${paginationFractionLetterSpacing.Desktop}${paginationFractionLetterSpacingUnits.Desktop};` : ''}
            ${paginationFractionWordSpacing.Desktop && paginationFractionWordSpacingUnits.Desktop ? `word-spacing: ${paginationFractionWordSpacing.Desktop}${paginationFractionWordSpacingUnits.Desktop};` : ''}
            ${paginationFractionColor ? `color: ${paginationFractionColor};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId} .swiper-pagination-fraction:hover {
            ${paginationFractionColorHover ? `color: ${paginationFractionColorHover};` : ''}
        }

        .${blockId} .swiper-pagination-progressbar {
            ${paginationProgressbarBGColor ? `background-color: ${paginationProgressbarBGColor};` : ''}
            ${paginationProgressbarHeight.Desktop ? `height: ${paginationProgressbarHeight.Desktop}${paginationProgressbarHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
            ${paginationProgressbarBGActiveColor ? `background-color: ${paginationProgressbarBGActiveColor};` : ''}
        }

        ${paginationPositionType === 'outside' ? `   
            .${blockId}.gslider-post-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-fraction {
                bottom: -30px !important;
            }
        ` : ''}

        .${blockId}.gslider-post-carousel-wrapper.has-pagination {
            margin-bottom: 30px;
        }

        .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title {
            ${postTitleAlign?.Desktop ? `text-align: ${postTitleAlign.Desktop};` : ''}
            ${postTitleFontFamily ? `font-family: ${postTitleFontFamily};` : ''}
            ${postTitleFontSize.Desktop && postTitleFontSizeUnits.Desktop ? `font-size: ${postTitleFontSize.Desktop}${postTitleFontSizeUnits.Desktop};` : ''}
            ${postTitleFontWeight ? `font-weight: ${postTitleFontWeight};` : ''}
            ${postTitleFontStyle ? `font-style: ${postTitleFontStyle};` : ''}
            ${postTitleTextTransform ? `text-transform: ${postTitleTextTransform};` : ''}
            ${postTitleTextDecoration ? `text-decoration: ${postTitleTextDecoration};` : ''}
            ${postTitleLineHeight.Desktop && postTitleLineHeightUnits.Desktop ? `line-height: ${postTitleLineHeight.Desktop}${postTitleLineHeightUnits.Desktop};` : ''}
            ${postTitleLetterSpacing.Desktop && postTitleLetterSpacingUnits.Desktop ? `letter-spacing: ${postTitleLetterSpacing.Desktop}${postTitleLetterSpacingUnits.Desktop};` : ''}
            ${postTitleWordSpacing.Desktop && postTitleWordSpacingUnits.Desktop ? `word-spacing: ${postTitleWordSpacing.Desktop}${postTitleWordSpacingUnits.Desktop};` : ''}
            ${postTitleColor ? `color: ${postTitleColor};` : ''}
            ${postTitleDesktopMarginCssStyle ? `margin: ${postTitleDesktopMarginCssStyle};` : ''}
            ${postTitleDesktopPaddingCssStyle ? `padding: ${postTitleDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a {
            ${postTitleColor ? `color: ${postTitleColor};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a:hover {
            ${postTitleColorHover ? `color: ${postTitleColorHover};` : ''}
        }

        .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt {
            ${postExcerptAlign?.Desktop ? `text-align: ${postExcerptAlign.Desktop};` : ''}
            ${postExcerptFontFamily ? `font-family: ${postExcerptFontFamily};` : ''}
            ${postExcerptFontSize.Desktop && postExcerptFontSizeUnits.Desktop ? `font-size: ${postExcerptFontSize.Desktop}${postExcerptFontSizeUnits.Desktop};` : ''}
            ${postExcerptFontWeight ? `font-weight: ${postExcerptFontWeight};` : ''}
            ${postExcerptFontStyle ? `font-style: ${postExcerptFontStyle};` : ''}
            ${postExcerptTextTransform ? `text-transform: ${postExcerptTextTransform};` : ''}
            ${postExcerptTextDecoration ? `text-decoration: ${postExcerptTextDecoration};` : ''}
            ${postExcerptLineHeight.Desktop && postExcerptLineHeightUnits.Desktop ? `line-height: ${postExcerptLineHeight.Desktop}${postExcerptLineHeightUnits.Desktop};` : ''}
            ${postExcerptLetterSpacing.Desktop && postExcerptLetterSpacingUnits.Desktop ? `letter-spacing: ${postExcerptLetterSpacing.Desktop}${postExcerptLetterSpacingUnits.Desktop};` : ''}
            ${postExcerptWordSpacing.Desktop && postExcerptWordSpacingUnits.Desktop ? `word-spacing: ${postExcerptWordSpacing.Desktop}${postExcerptWordSpacingUnits.Desktop};` : ''}
            ${postExcerptColor ? `color: ${postExcerptColor};` : ''}
            ${postExcerptDesktopMarginCssStyle ? `margin: ${postExcerptDesktopMarginCssStyle};` : ''}
            ${postExcerptDesktopPaddingCssStyle ? `padding: ${postExcerptDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt:hover {
            ${postExcerptColorHover ? `color: ${postExcerptColorHover};` : ''}
        }

        .${blockId} .gslider-post-carousel-image {
            ${imageBackgroundNormalStyles ? `${imageBackgroundNormalStyles}` : ''}
            ${imageHeight.Desktop ? `height: ${imageHeight.Desktop}${imageHeightUnits.Desktop} !important;` : ''}
            ${imageMarginDesktopCssStyle ? `margin: ${imageMarginDesktopCssStyle};` : ''} 
            ${imagePaddingDesktopCssStyle ? `padding: ${imagePaddingDesktopCssStyle};` : ''}
            ${imageBorder ? `border: ${imageBorder};` : ''}
            ${imageBorderDesktopCssStyle ? `border-width: ${imageBorderDesktopCssStyle};` : ''}  
            ${imageBorderRadiusDesktopCssStyle ? `border-radius: ${imageBorderRadiusDesktopCssStyle} !important;` : ''}
            ${imageBorderColor ? `border-color: ${imageBorderColor};` : ''}
            ${imageBoxShadowCssValue ? `box-shadow: ${imageBoxShadowCssValue} !important;` : ''}
            display: block;
            overflow: hidden;
            transition: all ${(imageTransitionDuration?.Desktop || 300)}ms ease-in-out;
        }

        .${blockId} .gslider-post-carousel-image:hover {
            ${imageBackgroundHoverStyles ? `${imageBackgroundHoverStyles}` : ''}
            ${imageBorderHoverColor ? `border-color: ${imageBorderHoverColor};` : ''}
            ${imageBoxShadowHoverCssValue ? `box-shadow: ${imageBoxShadowHoverCssValue} !important;` : ''}
        }

        /* Post Category Styles */
        .${blockId} .gslider-post-carousel-categories {
            display: flex;
            flex-wrap: wrap;
            ${postCategoryAlign?.Desktop ? `justify-content: ${postCategoryAlign.Desktop === 'left' ? 'flex-start' : postCategoryAlign.Desktop === 'right' ? 'flex-end' : 'center'};` : ''}
            ${postCategoryGap?.Desktop ? `gap: ${postCategoryGap.Desktop}${postCategoryGapUnits.Desktop};` : ''}
            ${postCategoryDesktopMarginCssStyle ? `margin: ${postCategoryDesktopMarginCssStyle};` : ''}
            ${postCategoryDesktopPaddingCssStyle ? `padding: ${postCategoryDesktopPaddingCssStyle};` : ''}
        }

        .${blockId} .gslider-post-carousel-categories span {
            ${postCategoryBackgroundNormalStyles ? `${postCategoryBackgroundNormalStyles}` : ''}
            ${postCategoryColor ? `color: ${postCategoryColor};` : ''}
            ${postCategoryFontFamily ? `font-family: ${postCategoryFontFamily};` : ''}
            ${postCategoryFontSize.Desktop && postCategoryFontSizeUnits.Desktop ? `font-size: ${postCategoryFontSize.Desktop}${postCategoryFontSizeUnits.Desktop};` : ''}
            ${postCategoryFontWeight ? `font-weight: ${postCategoryFontWeight};` : ''}
            ${postCategoryFontStyle ? `font-style: ${postCategoryFontStyle};` : ''}
            ${postCategoryTextTransform ? `text-transform: ${postCategoryTextTransform};` : ''}
            ${postCategoryTextDecoration ? `text-decoration: ${postCategoryTextDecoration};` : ''}
            ${postCategoryLineHeight.Desktop && postCategoryLineHeightUnits.Desktop ? `line-height: ${postCategoryLineHeight.Desktop}${postCategoryLineHeightUnits.Desktop};` : ''}
            ${postCategoryLetterSpacing.Desktop && postCategoryLetterSpacingUnits.Desktop ? `letter-spacing: ${postCategoryLetterSpacing.Desktop}${postCategoryLetterSpacingUnits.Desktop};` : ''}
            ${postCategoryWordSpacing.Desktop && postCategoryWordSpacingUnits.Desktop ? `word-spacing: ${postCategoryWordSpacing.Desktop}${postCategoryWordSpacingUnits.Desktop};` : ''}
            ${postCategoryItemDesktopPaddingCssStyle ? `padding: ${postCategoryItemDesktopPaddingCssStyle};` : ''}
            ${postCategoryBorder ? `border: ${postCategoryBorder};` : ''}
            ${postCategoryBorderDesktopCssStyle ? `border-width: ${postCategoryBorderDesktopCssStyle};` : ''}
            ${postCategoryBorderRadiusDesktopCssStyle ? `border-radius: ${postCategoryBorderRadiusDesktopCssStyle} !important;` : ''}
            ${postCategoryBorderColor ? `border-color: ${postCategoryBorderColor};` : ''}
            ${postCategoryBoxShadowCssValue ? `box-shadow: ${postCategoryBoxShadowCssValue} !important;` : ''}
            display: inline-flex;
            align-items: center;
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-categories span:hover {
            ${postCategoryBackgroundHoverStyles ? `${postCategoryBackgroundHoverStyles}` : ''}
            ${postCategoryColorHover ? `color: ${postCategoryColorHover};` : ''}
            ${postCategoryBorderHoverColor ? `border-color: ${postCategoryBorderHoverColor};` : ''}
            ${postCategoryBoxShadowHoverCssValue ? `box-shadow: ${postCategoryBoxShadowHoverCssValue} !important;` : ''}
        }

        .${blockId} .gslider-post-carousel-categories span a {
            ${postCategoryColor ? `color: ${postCategoryColor};` : ''}
            transition: all .3s ease-in-out;
            text-decoration: none;
        }

        .${blockId} .gslider-post-carousel-categories span:hover a {
            ${postCategoryColorHover ? `color: ${postCategoryColorHover};` : ''}
        }

        .${blockId} .gslider-post-carousel-image img {
            ${imageMaxWidth.Desktop ? `max-width: ${imageMaxWidth.Desktop}${imageMaxWidthUnits.Desktop} !important;` : ''}
            height: 100% !important;
            ${imageObjectFit ? `object-fit: ${imageObjectFit} !important;` : ''}
            ${imageObjectPosition ? `object-position: ${imageObjectPosition} !important;` : ''}
            display: block;
            width: 100%;
            transition: all ${(imageTransitionDuration?.Desktop || 300)}ms ease-in-out;
            --hover-opacity: ${imageHoverOpacity?.Desktop || 0.8};
            --hover-scale: ${imageHoverScale?.Desktop || 1.05};
            --hover-lift: ${imageHoverLift?.Desktop || 10}${imageHoverLiftUnits?.Desktop || 'px'};
            ${imageHoverEffect === 'grayscale' ? 'filter: grayscale(1);' : ''}
        }

        .${blockId} .gslider-post-carousel-image:hover img {
            ${(imageHoverEffect === 'opacity' || imageHoverEffect === 'both') ? 'opacity: var(--hover-opacity);' : ''}
            ${(imageHoverEffect === 'scale' || imageHoverEffect === 'both') ? 'transform: scale(var(--hover-scale));' : ''}
            ${imageHoverEffect === 'move-up' ? 'transform: translateY(calc(-1 * var(--hover-lift)));' : ''}
            ${imageHoverEffect === 'grayscale' ? 'filter: grayscale(0);' : ''}
        }


        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-post-carousel-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ''} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ''}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ''}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ''}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ''}
            }
            .${blockId}.gslider-post-carousel-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId}.gslider-post-carousel-wrapper .gslider-post-carousel-content-wrapper {
                ${layoutHeight.Tablet ? `height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : 'auto'}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Tablet || 'center'};
            }


            .${blockId}.gslider-post-carousel-wrapper.outside {
                ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                    padding: ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet} 0 0;
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};
                ` : ''}
        
                ${navigationArrowPosition === 'center' ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};

                ` : ''}
            }

            ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} { 
                    gap: ${navigationArrowGap.Tablet ? `${navigationArrowGap.Tablet}${navigationArrowGapUnits.Tablet}` : '10px'};
                    ${navigationArrowPosition === 'top-left' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-center' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-right' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-left' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-center' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-right' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : '0'};
                    ` : ''}
                }
                    
            ` : ''}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowTabletBorderCssStyle ? `border-width: ${navigationArrowTabletBorderCssStyle};` : ''}  
                ${navigationArrowTabletBorderRadiusCssStyle ? `border-radius: ${navigationArrowTabletBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Tablet ? `width: ${navigationArrowWidth.Tablet}${navigationArrowWidthUnits.Tablet};` : ''}
                ${navigationArrowHeight.Tablet ? `height: ${navigationArrowHeight.Tablet}${navigationArrowHeightUnits.Tablet};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Tablet ? `font-size: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Tablet ? `top: ${paginationProgressbarPosition.Tablet}${paginationProgressbarPositionUnits.Tablet} !important;` : ''
        ) : (
            paginationDotsPosition.Tablet ? `bottom: ${paginationDotsPosition.Tablet}${paginationDotsPositionUnits.Tablet} !important;` : ''
        )}
                ${paginationDotsTabletMarginCssStyle ? `margin: ${paginationDotsTabletMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsTabletBorderCssStyle ? `border-width: ${paginationNormalDotsTabletBorderCssStyle};` : ''}   
                ${paginationNormalDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsTabletBorderRadiusCssStyle};` : ''}
                ${paginationNormalDotsWidth.Tablet ? `width: ${paginationNormalDotsWidth.Tablet}${paginationNormalDotsWidthUnits.Tablet};` : ''}
                ${paginationNormalDotsHeight.Tablet ? `height: ${paginationNormalDotsHeight.Tablet}${paginationNormalDotsHeightUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsTabletBorderCssStyle ? `border-width: ${paginationActiveDotsTabletBorderCssStyle};` : ''}   
                ${paginationActiveDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsTabletBorderRadiusCssStyle};` : ''}
                ${paginationActiveDotsWidth.Tablet ? `width: ${paginationActiveDotsWidth.Tablet}${paginationActiveDotsWidthUnits.Tablet};` : ''}
                ${paginationActiveDotsHeight.Tablet ? `height: ${paginationActiveDotsHeight.Tablet}${paginationActiveDotsHeightUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Tablet && paginationFractionFontSizeUnits.Tablet ? `font-size: ${paginationFractionFontSize.Tablet}${paginationFractionFontSizeUnits.Tablet};` : ''}
                ${paginationFractionLineHeight.Tablet && paginationFractionLineHeightUnits.Tablet ? `line-height: ${paginationFractionLineHeight.Tablet}${paginationFractionLineHeightUnits.Tablet};` : ''}
                ${paginationFractionLetterSpacing.Tablet && paginationFractionLetterSpacingUnits.Tablet ? `letter-spacing: ${paginationFractionLetterSpacing.Tablet}${paginationFractionLetterSpacingUnits.Tablet};` : ''}
                ${paginationFractionWordSpacing.Tablet && paginationFractionWordSpacingUnits.Tablet ? `word-spacing: ${paginationFractionWordSpacing.Tablet}${paginationFractionWordSpacingUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Tablet ? `height: ${paginationProgressbarHeight.Tablet}${paginationProgressbarHeightUnits.Tablet};` : ''}
            }

            .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title {
                ${postTitleAlign?.Tablet ? `text-align: ${postTitleAlign.Tablet};` : ''}
                ${postTitleFontSize.Tablet && postTitleFontSizeUnits.Tablet ? `font-size: ${postTitleFontSize.Tablet}${postTitleFontSizeUnits.Tablet};` : ''}
                ${postTitleLineHeight.Tablet && postTitleLineHeightUnits.Tablet ? `line-height: ${postTitleLineHeight.Tablet}${postTitleLineHeightUnits.Tablet};` : ''}
                ${postTitleLetterSpacing.Tablet && postTitleLetterSpacingUnits.Tablet ? `letter-spacing: ${postTitleLetterSpacing.Tablet}${postTitleLetterSpacingUnits.Tablet};` : ''}
                ${postTitleWordSpacing.Tablet && postTitleWordSpacingUnits.Tablet ? `word-spacing: ${postTitleWordSpacing.Tablet}${postTitleWordSpacingUnits.Tablet};` : ''}
                ${postTitleTabletMarginCssStyle ? `margin: ${postTitleTabletMarginCssStyle};` : ''}
                ${postTitleTabletPaddingCssStyle ? `padding: ${postTitleTabletPaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt {
                ${postExcerptAlign?.Tablet ? `text-align: ${postExcerptAlign.Tablet};` : ''}
                ${postExcerptFontSize.Tablet && postExcerptFontSizeUnits.Tablet ? `font-size: ${postExcerptFontSize.Tablet}${postExcerptFontSizeUnits.Tablet};` : ''}
                ${postExcerptLineHeight.Tablet && postExcerptLineHeightUnits.Tablet ? `line-height: ${postExcerptLineHeight.Tablet}${postExcerptLineHeightUnits.Tablet};` : ''}
                ${postExcerptLetterSpacing.Tablet && postExcerptLetterSpacingUnits.Tablet ? `letter-spacing: ${postExcerptLetterSpacing.Tablet}${postExcerptLetterSpacingUnits.Tablet};` : ''}
                ${postExcerptWordSpacing.Tablet && postExcerptWordSpacingUnits.Tablet ? `word-spacing: ${postExcerptWordSpacing.Tablet}${postExcerptWordSpacingUnits.Tablet};` : ''}
                ${postExcerptTabletMarginCssStyle ? `margin: ${postExcerptTabletMarginCssStyle};` : ''}
                ${postExcerptTabletPaddingCssStyle ? `padding: ${postExcerptTabletPaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-image {
                ${imageHeight.Tablet ? `height: ${imageHeight.Tablet}${imageHeightUnits.Tablet} !important;` : ''}
                ${imageMarginTabletCssStyle ? `margin: ${imageMarginTabletCssStyle};` : ''} 
                ${imagePaddingTabletCssStyle ? `padding: ${imagePaddingTabletCssStyle};` : ''}
                ${imageBorderTabletCssStyle ? `border-width: ${imageBorderTabletCssStyle};` : ''}  
                ${imageBorderRadiusTabletCssStyle ? `border-radius: ${imageBorderRadiusTabletCssStyle} !important;` : ''}
            }

            /* Post Category Styles */
            .${blockId} .gslider-post-carousel-categories {
                ${postCategoryAlign?.Tablet ? `justify-content: ${postCategoryAlign.Tablet === 'left' ? 'flex-start' : postCategoryAlign.Tablet === 'right' ? 'flex-end' : 'center'};` : ''}
                ${postCategoryGap?.Tablet ? `gap: ${postCategoryGap.Tablet}${postCategoryGapUnits.Tablet};` : ''}
                ${postCategoryTabletMarginCssStyle ? `margin: ${postCategoryTabletMarginCssStyle};` : ''}
                ${postCategoryTabletPaddingCssStyle ? `padding: ${postCategoryTabletPaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-categories span {
                ${postCategoryFontSize.Tablet && postCategoryFontSizeUnits.Tablet ? `font-size: ${postCategoryFontSize.Tablet}${postCategoryFontSizeUnits.Tablet};` : ''}
                ${postCategoryLineHeight.Tablet && postCategoryLineHeightUnits.Tablet ? `line-height: ${postCategoryLineHeight.Tablet}${postCategoryLineHeightUnits.Tablet};` : ''}
                ${postCategoryLetterSpacing.Tablet && postCategoryLetterSpacingUnits.Tablet ? `letter-spacing: ${postCategoryLetterSpacing.Tablet}${postCategoryLetterSpacingUnits.Tablet};` : ''}
                ${postCategoryWordSpacing.Tablet && postCategoryWordSpacingUnits.Tablet ? `word-spacing: ${postCategoryWordSpacing.Tablet}${postCategoryWordSpacingUnits.Tablet};` : ''}
                ${postCategoryItemTabletPaddingCssStyle ? `padding: ${postCategoryItemTabletPaddingCssStyle};` : ''}
                ${postCategoryBorderTabletCssStyle ? `border-width: ${postCategoryBorderTabletCssStyle};` : ''}
                ${postCategoryBorderRadiusTabletCssStyle ? `border-radius: ${postCategoryBorderRadiusTabletCssStyle} !important;` : ''}
            }

            .${blockId} .gslider-post-carousel-image img {
                ${imageMaxWidth.Tablet ? `max-width: ${imageMaxWidth.Tablet}${imageMaxWidthUnits.Tablet} !important;` : ''}
                height: 100% !important;
                --hover-opacity: ${imageHoverOpacity?.Tablet || 0.8};
                --hover-scale: ${imageHoverScale?.Tablet || 1.05};
                --hover-lift: ${imageHoverLift?.Tablet || 10}${imageHoverLiftUnits?.Tablet || 'px'};
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-post-carousel-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ''} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ''}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ''}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ''}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ''}
            }
            .${blockId}.gslider-post-carousel-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId}.gslider-post-carousel-wrapper .gslider-post-carousel-content-wrapper {
                ${layoutHeight.Mobile ? `height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : 'auto'}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Mobile || 'center'};
            }

            .${blockId}.gslider-post-carousel-wrapper.outside {
                ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                    padding: ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile} 0 0;
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};
                ` : ''}
        
                ${navigationArrowPosition === 'center' ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};

                ` : ''}
            }

            ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                    gap: ${navigationArrowGap.Mobile ? `${navigationArrowGap.Mobile}${navigationArrowGapUnits.Mobile}` : '10px'};
                    ${navigationArrowPosition === 'top-left' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-center' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-right' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-left' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-center' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-right' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : '0'};
                    ` : ''}
                }
                    
            ` : ''}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowMobileBorderCssStyle ? `border-width: ${navigationArrowMobileBorderCssStyle};` : ''}  
                ${navigationArrowMobileBorderRadiusCssStyle ? `border-radius: ${navigationArrowMobileBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Mobile ? `width: ${navigationArrowWidth.Mobile}${navigationArrowWidthUnits.Mobile};` : ''}
                ${navigationArrowHeight.Mobile ? `height: ${navigationArrowHeight.Mobile}${navigationArrowHeightUnits.Mobile};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Mobile ? `font-size: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Mobile ? `top: ${paginationProgressbarPosition.Mobile}${paginationProgressbarPositionUnits.Mobile} !important;` : ''
        ) : (
            paginationDotsPosition.Mobile ? `bottom: ${paginationDotsPosition.Mobile}${paginationDotsPositionUnits.Mobile} !important;` : ''
        )}
                ${paginationDotsMobileMarginCssStyle ? `margin: ${paginationDotsMobileMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsMobileBorderCssStyle ? `border-width: ${paginationNormalDotsMobileBorderCssStyle};` : ''}   
                ${paginationNormalDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsMobileBorderRadiusCssStyle};` : ''}
                ${paginationNormalDotsWidth.Mobile ? `width: ${paginationNormalDotsWidth.Mobile}${paginationNormalDotsWidthUnits.Mobile};` : ''}
                ${paginationNormalDotsHeight.Mobile ? `height: ${paginationNormalDotsHeight.Mobile}${paginationNormalDotsHeightUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsMobileBorderCssStyle ? `border-width: ${paginationActiveDotsMobileBorderCssStyle};` : ''}   
                ${paginationActiveDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsMobileBorderRadiusCssStyle};` : ''}
                ${paginationActiveDotsWidth.Mobile ? `width: ${paginationActiveDotsWidth.Mobile}${paginationActiveDotsWidthUnits.Mobile};` : ''}
                ${paginationActiveDotsHeight.Mobile ? `height: ${paginationActiveDotsHeight.Mobile}${paginationActiveDotsHeightUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Mobile && paginationFractionFontSizeUnits.Mobile ? `font-size: ${paginationFractionFontSize.Mobile}${paginationFractionFontSizeUnits.Mobile};` : ''}
                ${paginationFractionLineHeight.Mobile && paginationFractionLineHeightUnits.Mobile ? `line-height: ${paginationFractionLineHeight.Mobile}${paginationFractionLineHeightUnits.Mobile};` : ''}
                ${paginationFractionLetterSpacing.Mobile && paginationFractionLetterSpacingUnits.Mobile ? `letter-spacing: ${paginationFractionLetterSpacing.Mobile}${paginationFractionLetterSpacingUnits.Mobile};` : ''}
                ${paginationFractionWordSpacing.Mobile && paginationFractionWordSpacingUnits.Mobile ? `word-spacing: ${paginationFractionWordSpacing.Mobile}${paginationFractionWordSpacingUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Mobile ? `height: ${paginationProgressbarHeight.Mobile}${paginationProgressbarHeightUnits.Mobile};` : ''}
            }

            .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title {
                ${postTitleAlign?.Mobile ? `text-align: ${postTitleAlign.Mobile};` : ''}
                ${postTitleFontSize.Mobile && postTitleFontSizeUnits.Mobile ? `font-size: ${postTitleFontSize.Mobile}${postTitleFontSizeUnits.Mobile};` : ''}
                ${postTitleLineHeight.Mobile && postTitleLineHeightUnits.Mobile ? `line-height: ${postTitleLineHeight.Mobile}${postTitleLineHeightUnits.Mobile};` : ''}
                ${postTitleLetterSpacing.Mobile && postTitleLetterSpacingUnits.Mobile ? `letter-spacing: ${postTitleLetterSpacing.Mobile}${postTitleLetterSpacingUnits.Mobile};` : ''}
                ${postTitleWordSpacing.Mobile && postTitleWordSpacingUnits.Mobile ? `word-spacing: ${postTitleWordSpacing.Mobile}${postTitleWordSpacingUnits.Mobile};` : ''}
                ${postTitleMobileMarginCssStyle ? `margin: ${postTitleMobileMarginCssStyle};` : ''}
                ${postTitleMobilePaddingCssStyle ? `padding: ${postTitleMobilePaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt {
                ${postExcerptAlign?.Mobile ? `text-align: ${postExcerptAlign.Mobile};` : ''}
                ${postExcerptFontSize.Mobile && postExcerptFontSizeUnits.Mobile ? `font-size: ${postExcerptFontSize.Mobile}${postExcerptFontSizeUnits.Mobile};` : ''}
                ${postExcerptLineHeight.Mobile && postExcerptLineHeightUnits.Mobile ? `line-height: ${postExcerptLineHeight.Mobile}${postExcerptLineHeightUnits.Mobile};` : ''}
                ${postExcerptLetterSpacing.Mobile && postExcerptLetterSpacingUnits.Mobile ? `letter-spacing: ${postExcerptLetterSpacing.Mobile}${postExcerptLetterSpacingUnits.Mobile};` : ''}
                ${postExcerptWordSpacing.Mobile && postExcerptWordSpacingUnits.Mobile ? `word-spacing: ${postExcerptWordSpacing.Mobile}${postExcerptWordSpacingUnits.Mobile};` : ''}
                ${postExcerptMobileMarginCssStyle ? `margin: ${postExcerptMobileMarginCssStyle};` : ''}
                ${postExcerptMobilePaddingCssStyle ? `padding: ${postExcerptMobilePaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-image {
                ${imageHeight.Mobile ? `height: ${imageHeight.Mobile}${imageHeightUnits.Mobile} !important;` : ''}
                ${imageMarginMobileCssStyle ? `margin: ${imageMarginMobileCssStyle};` : ''} 
                ${imagePaddingMobileCssStyle ? `padding: ${imagePaddingMobileCssStyle};` : ''}
                ${imageBorderMobileCssStyle ? `border-width: ${imageBorderMobileCssStyle};` : ''}  
                ${imageBorderRadiusMobileCssStyle ? `border-radius: ${imageBorderRadiusMobileCssStyle} !important;` : ''}
            }

            /* Post Category Styles */
            .${blockId} .gslider-post-carousel-categories {
                ${postCategoryAlign?.Mobile ? `justify-content: ${postCategoryAlign.Mobile === 'left' ? 'flex-start' : postCategoryAlign.Mobile === 'right' ? 'flex-end' : 'center'};` : ''}
                ${postCategoryGap?.Mobile ? `gap: ${postCategoryGap.Mobile}${postCategoryGapUnits.Mobile};` : ''}
                ${postCategoryMobileMarginCssStyle ? `margin: ${postCategoryMobileMarginCssStyle};` : ''}
                ${postCategoryMobilePaddingCssStyle ? `padding: ${postCategoryMobilePaddingCssStyle};` : ''}
            }

            .${blockId} .gslider-post-carousel-categories span {
                ${postCategoryFontSize.Mobile && postCategoryFontSizeUnits.Mobile ? `font-size: ${postCategoryFontSize.Mobile}${postCategoryFontSizeUnits.Mobile};` : ''}
                ${postCategoryLineHeight.Mobile && postCategoryLineHeightUnits.Mobile ? `line-height: ${postCategoryLineHeight.Mobile}${postCategoryLineHeightUnits.Mobile};` : ''}
                ${postCategoryLetterSpacing.Mobile && postCategoryLetterSpacingUnits.Mobile ? `letter-spacing: ${postCategoryLetterSpacing.Mobile}${postCategoryLetterSpacingUnits.Mobile};` : ''}
                ${postCategoryWordSpacing.Mobile && postCategoryWordSpacingUnits.Mobile ? `word-spacing: ${postCategoryWordSpacing.Mobile}${postCategoryWordSpacingUnits.Mobile};` : ''}
                ${postCategoryItemMobilePaddingCssStyle ? `padding: ${postCategoryItemMobilePaddingCssStyle};` : ''}
                ${postCategoryBorderMobileCssStyle ? `border-width: ${postCategoryBorderMobileCssStyle};` : ''}
                ${postCategoryBorderRadiusMobileCssStyle ? `border-radius: ${postCategoryBorderRadiusMobileCssStyle} !important;` : ''}
            }

            .${blockId} .gslider-post-carousel-image img {
                ${imageMaxWidth.Mobile ? `max-width: ${imageMaxWidth.Mobile}${imageMaxWidthUnits.Mobile} !important;` : ''}
                height: 100% !important;
                --hover-opacity: ${imageHoverOpacity?.Mobile || 0.8};
                --hover-scale: ${imageHoverScale?.Mobile || 1.05};
                --hover-lift: ${imageHoverLift?.Mobile || 10}${imageHoverLiftUnits?.Mobile || 'px'};
            }
        }
    `;
    /** End All Block Style */

    // Custom CSS
    const customCss = getCustomCss(globalCustomCSS, `.${blockId}`);

    return `${postCarouselCSS} ${customCss}`.replace(/\s+/g, ' ').trim();
}

export default generatePostCarouselStyle;