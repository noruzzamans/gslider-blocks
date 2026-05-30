import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect,
    useMemo,
    memo,
    useCallback
} from '@wordpress/element';
import {
    PanelBody,
    ToggleControl,
    BaseControl,
    Button,
    RangeControl,
    SelectControl,
    TextControl,
    FormTokenField
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
    TEXT_ALIGN,
    ARROW_ICON_ALIGN,
    VERTICAL_ALIGN,
    VERTICAL_ALIGN_SELF,
    HORIZONTAL_ALIGN,
    NORMAL_HOVER,
    BORDER_STYLES,
    CAROUSEL_EFFECT_OPTIONS,
    PAGINATION_TYPE,
    NORMAL_ACTIVE,
    NAVIGATION_ARROW_POSITION_TYPE,
    PAGINATION_POSITION_TYPE,
    NAVIGATION_ARROW_POSITION,
    NAVIGATION_ARROW_DIRECTION,
    LAYOUT_HEIGHT_SWITCHER,
    HTML_TAGS,
    ICON_TYPE,
    ICON_POSITION,
    WIDTH_MODE,

} from "@Constants";

import './editor.scss';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import ImageControl from '@Components/image-control';
import InspectorControl from '@Components/inspector-controls';
import CustomCSSEditor from '@Components/custom-css-editor';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import getCustomCss from '@Utils/getCustomCss';
import generateSvgIcon from '@Utils/generateSvgIcon';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import { useDeviceType } from "@Utils/displayType";
import InputControls from '@Components/input-control';
import Select2Control from '@Components/select2-control';
import IconPicker from '@Components/icon-picker';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import ContentOrderControl from '@Components/content-order-control';
import { normalizeContentOrder } from './content-order';
import QuerySettingsPanel from '@Components/query-settings-panel';
import HtmlTagControl from '@Components/html-tag-control';
import UrlControl from '@Components/url-control';

const Inspector = ({ attributes, setAttributes, clientId }) => {
    const {
        blockId,
        deviceType,
        blockStyle,

        /** Start Carousel Settings */
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
        /** End Carousel Settings */

        /** Start Show/Hide Elements */
        paginationPositionType,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */

        /** Start Layout & Content Setting */
        layoutHeight,
        layoutHeightUnits,
        contentOrder,
        /** End Layout & Content Setting */

        /** Start Query Settings */
        postType,
        postsPerPage,
        categories,
        tags,
        authors,
        excludePosts,
        offset,
        orderBy,
        order,
        searchQuery,
        stickyPosts,
        taxonomyQuery,
        metaKey,
        metaValue,
        metaCompare,
        dateRange,
        excludeCurrentPost,
        /** End Query Settings */

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
        /** End Arrows Style */

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
        /** End Global Background */

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
        postTitleHtmlTag,

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
        postExcerptHtmlTag,

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

        postExcerptColorSwitcher,
        postExcerptColor,
        postExcerptColorHover,

        postExcerptMarginUnits,
        postExcerptDesktopMargin,
        postExcerptDesktopMarginCssStyle,
        postExcerptTabletMargin,
        postExcerptTabletMarginCssStyle,
        postExcerptMobileMargin,
        postExcerptMobileMarginCssStyle,
        postExcerptMarginLink,

        postExcerptPaddingUnits,
        postExcerptDesktopPadding,
        postExcerptDesktopPaddingCssStyle,
        postExcerptTabletPadding,
        postExcerptTabletPaddingCssStyle,
        postExcerptMobilePadding,
        postExcerptMobilePaddingCssStyle,
        postExcerptPaddingLink,
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

        /** Start Read More Button Settings */
        showReadMoreButton,
        readMoreButtonText,
        readMoreButtonLinkType,
        readMoreButtonLink,
        readMoreButtonTargetLink,
        readMoreButtonNofollow,
        readMoreButtonSponsored,
        readMoreButtonAlign,
        readMoreButtonWidth,
        readMoreButtonHoverAnimation,
        /** End Read More Button Settings */

        /** Start Read More Button Icon */
        readMoreButtonIconSwitcher,
        readMoreButtonIconType,
        readMoreButtonIconPosition,
        readMoreButtonIcon,
        readMoreButtonIconHtml, 
        readMoreButtonIconImageUrl,
        readMoreButtonIconImageAlt,
        readMoreButtonIconImageID,
        readMoreButtonIconHoverAnimation,
        /** End Read More Button Icon */

        /** Start Read More Button Typography */
        readMoreButtonFontFamily,
        readMoreButtonFontSize,
        readMoreButtonFontSizeUnits,
        readMoreButtonFontWeight,
        readMoreButtonFontStyle,
        readMoreButtonTextTransform,
        readMoreButtonTextDecoration,
        readMoreButtonLineHeight,
        readMoreButtonLineHeightUnits,
        readMoreButtonLetterSpacing,
        readMoreButtonLetterSpacingUnits,
        readMoreButtonWordSpacing,
        readMoreButtonWordSpacingUnits,
        /** End Read More Button Typography */

        /** Start Read More Button Color */
        readMoreButtonColorSwitcher,
        readMoreButtonColor,
        readMoreButtonColorHover,
        /** End Read More Button Color */

        /** Start Read More Button Background */
        readMoreButtonNormalBackgroundType,
        readMoreButtonNormalClassicColor,
        readMoreButtonNormalGradientColor,
        readMoreButtonNormalCustomGradientSwitcher,
        readMoreButtonNormalCustomGradientInputValue,
        readMoreButtonHoverBackgroundType,
        readMoreButtonHoverClassicColor,
        readMoreButtonHoverGradientColor,
        readMoreButtonHoverCustomGradientSwitcher,
        readMoreButtonHoverCustomGradientInputValue,
        /** End Read More Button Background */

        /** Start Read More Button Border */
        readMoreButtonBorder,
        readMoreButtonBorderColorSwitcher,
        readMoreButtonBorderColor,
        readMoreButtonBorderHoverColor,
        readMoreButtonBorderUnits,
        readMoreButtonDesktopBorder,
        readMoreButtonDesktopBorderCssStyle,
        readMoreButtonTabletBorder,
        readMoreButtonTabletBorderCssStyle,
        readMoreButtonMobileBorder,
        readMoreButtonMobileBorderCssStyle,
        readMoreButtonBorderLink,
        /** End Read More Button Border */

        /** Start Read More Button Border Radius */
        readMoreButtonBorderRadiusUnits,
        readMoreButtonDesktopBorderRadius,
        readMoreButtonDesktopBorderRadiusCssStyle,
        readMoreButtonTabletBorderRadius,
        readMoreButtonTabletBorderRadiusCssStyle,
        readMoreButtonMobileBorderRadius,
        readMoreButtonMobileBorderRadiusCssStyle,
        readMoreButtonBorderRadiusLink,
        /** End Read More Button Border Radius */

        /** Start Read More Button Box Shadow */
        readMoreButtonBoxShadowValuesSwitcher,
        readMoreButtonBoxShadowValues,
        readMoreButtonBoxShadowCssValue,
        readMoreButtonBoxShadowHoverValues,
        readMoreButtonBoxShadowHoverCssValue,
        /** End Read More Button Box Shadow */

        /** Start Read More Button Margin */
        readMoreButtonMarginUnits,
        readMoreButtonDesktopMargin,
        readMoreButtonDesktopMarginCssStyle,
        readMoreButtonTabletMargin,
        readMoreButtonTabletMarginCssStyle,
        readMoreButtonMobileMargin,
        readMoreButtonMobileMarginCssStyle,
        readMoreButtonMarginLink,
        /** End Read More Button Margin */

        /** Start Read More Button Padding */
        readMoreButtonPaddingUnits,
        readMoreButtonDesktopPadding,
        readMoreButtonDesktopPaddingCssStyle,
        readMoreButtonTabletPadding,
        readMoreButtonTabletPaddingCssStyle,
        readMoreButtonMobilePadding,
        readMoreButtonMobilePaddingCssStyle,
        readMoreButtonPaddingLink,
        /** End Read More Button Padding */

        /** Start Read More Button Icon Style */
        readMoreButtonIconSize,
        readMoreButtonIconSizeUnits,
        /** End Read More Button Icon Style */

        /** Start Read More Button Icon Dimensions */
        readMoreButtonIconWidth,
        readMoreButtonIconWidthUnits,
        readMoreButtonIconHeight,
        readMoreButtonIconHeightUnits,
        /** End Read More Button Icon Dimensions */

        /** Start Read More Button Icon Gap */
        readMoreButtonIconGap,
        readMoreButtonIconGapUnits,
        /** End Read More Button Icon Gap */

        /** Start Read More Button Icon Rotation */
        readMoreButtonIconRotationSwitcher,
        readMoreButtonIconRotation,
        readMoreButtonIconHoverRotation,
        /** End Read More Button Icon Rotation */

        /** Start Read More Button Icon Color */
        readMoreButtonIconColorSwitcher,
        readMoreButtonIconColor,
        readMoreButtonIconColorHover,
        /** End Read More Button Icon Color */

        /** Start Read More Button Icon Background */
        readMoreButtonIconNormalBackgroundType,
        readMoreButtonIconNormalClassicColor,
        readMoreButtonIconNormalGradientColor,
        readMoreButtonIconNormalCustomGradientSwitcher,
        readMoreButtonIconNormalCustomGradientInputValue,

        readMoreButtonIconHoverBackgroundType,
        readMoreButtonIconHoverClassicColor,
        readMoreButtonIconHoverGradientColor,
        readMoreButtonIconHoverCustomGradientSwitcher,
        readMoreButtonIconHoverCustomGradientInputValue,
        /** End Read More Button Icon Background */

        /** Start Read More Button Icon Border */
        readMoreButtonIconBorder,
        readMoreButtonIconBorderColorSwitcher,
        readMoreButtonIconBorderColor,
        readMoreButtonIconBorderHoverColor,
        readMoreButtonIconBorderUnits,
        readMoreButtonIconDesktopBorder,
        readMoreButtonIconDesktopBorderCssStyle,
        readMoreButtonIconTabletBorder,
        readMoreButtonIconTabletBorderCssStyle,
        readMoreButtonIconMobileBorder,
        readMoreButtonIconMobileBorderCssStyle,
        readMoreButtonIconBorderLink,
        /** End Read More Button Icon Border */

        /** Start Read More Button Icon Border Radius */
        readMoreButtonIconBorderRadiusUnits,
        readMoreButtonIconDesktopBorderRadius,
        readMoreButtonIconDesktopBorderRadiusCssStyle,
        readMoreButtonIconTabletBorderRadius,
        readMoreButtonIconTabletBorderRadiusCssStyle,
        readMoreButtonIconMobileBorderRadius,
        readMoreButtonIconMobileBorderRadiusCssStyle,
        readMoreButtonIconBorderRadiusLink,
        /** End Read More Button Icon Border Radius */

        /** Start Read More Button Icon Box Shadow */
        readMoreButtonIconBoxShadowValuesSwitcher,
        readMoreButtonIconBoxShadowValues,
        readMoreButtonIconBoxShadowCssValue,
        readMoreButtonIconBoxShadowHoverValues,
        readMoreButtonIconBoxShadowHoverCssValue,
        /** End Read More Button Icon Box Shadow */

    } = attributes;

    /** Get Current Device Type and set device Type */
    const currentDeviceType = useDeviceType();
    
    useEffect(() => {
        setAttributes({ deviceType: currentDeviceType });
    }, [currentDeviceType]);

    /** Normalize content order */
    const normalizedContentOrder = normalizeContentOrder(contentOrder);

    /** Load Google Font */
    if (postTitleFontFamily && postTitleFontFamily !== 'Default') {
        LoadGoogleFont(postTitleFontFamily);
    }
    if (postExcerptFontFamily && postExcerptFontFamily !== 'Default') {
        LoadGoogleFont(postExcerptFontFamily);
    }
    if (postCategoryFontFamily && postCategoryFontFamily !== 'Default') {
        LoadGoogleFont(postCategoryFontFamily);
    }
    if (readMoreButtonFontFamily !== 'Default') {
        LoadGoogleFont(readMoreButtonFontFamily);
    }

    /** Default Open Panels */
    const defaultOpenPanels = {
        general: 'show-hide-elements',
        styles: 'content',
        advanced: 'layout',
    };

    const [openPanels, setOpenPanels] = useState(defaultOpenPanels);

    const togglePanel = useCallback((tabName, panelKey) => {
        setOpenPanels((prev) => ({
            ...prev,
            [tabName]: prev[tabName] === panelKey ? null : panelKey,
        }));
    }, []);

    /** Format Spacing */
    const spacingFormat = (spacing, units) => {
        return spacing.top || spacing.right || spacing.bottom || spacing.left
            ? `${spacing.top}${units} ${spacing.right}${units} ${spacing.bottom}${units} ${spacing.left}${units}`
            : '';
    };

    /** set the css style if have default padding */
    useEffect(() => {
        setAttributes({
            navigationArrowDesktopBorderRadiusCssStyle: spacingFormat(navigationArrowDesktopBorderRadius, navigationArrowBorderRadiusUnits.Desktop),
            navigationArrowTabletBorderRadiusCssStyle: spacingFormat(navigationArrowTabletBorderRadius, navigationArrowBorderRadiusUnits.Tablet),
            navigationArrowMobileBorderRadiusCssStyle: spacingFormat(navigationArrowMobileBorderRadius, navigationArrowBorderRadiusUnits.Mobile),

            paginationNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(paginationNormalDotsDesktopBorderRadius, paginationNormalDotsBorderRadiusUnits.Desktop),
            paginationNormalDotsTabletBorderRadiusCssStyle: spacingFormat(paginationNormalDotsTabletBorderRadius, paginationNormalDotsBorderRadiusUnits.Tablet),
            paginationNormalDotsMobileBorderRadiusCssStyle: spacingFormat(paginationNormalDotsMobileBorderRadius, paginationNormalDotsBorderRadiusUnits.Mobile),

            postTitleDesktopMarginCssStyle: spacingFormat(postTitleDesktopMargin, postTitleMarginUnits.Desktop),
            postTitleTabletMarginCssStyle: spacingFormat(postTitleTabletMargin, postTitleMarginUnits.Tablet),
            postTitleMobileMarginCssStyle: spacingFormat(postTitleMobileMargin, postTitleMarginUnits.Mobile),

            postExcerptDesktopMarginCssStyle: spacingFormat(postExcerptDesktopMargin, postExcerptMarginUnits.Desktop),
            postExcerptTabletMarginCssStyle: spacingFormat(postExcerptTabletMargin, postExcerptMarginUnits.Tablet),
            postExcerptMobileMarginCssStyle: spacingFormat(postExcerptMobileMargin, postExcerptMarginUnits.Mobile),

            postExcerptDesktopPaddingCssStyle: spacingFormat(postExcerptDesktopPadding, postExcerptPaddingUnits.Desktop),
            postExcerptTabletPaddingCssStyle: spacingFormat(postExcerptTabletPadding, postExcerptPaddingUnits.Tablet),
            postExcerptMobilePaddingCssStyle: spacingFormat(postExcerptMobilePadding, postExcerptPaddingUnits.Mobile),

            postCategoryDesktopMarginCssStyle: spacingFormat(postCategoryDesktopMargin, postCategoryMarginUnits.Desktop),
            postCategoryTabletMarginCssStyle: spacingFormat(postCategoryTabletMargin, postCategoryMarginUnits.Tablet),
            postCategoryMobileMarginCssStyle: spacingFormat(postCategoryMobileMargin, postCategoryMarginUnits.Mobile),

            postCategoryDesktopPaddingCssStyle: spacingFormat(postCategoryDesktopPadding, postCategoryPaddingUnits.Desktop),
            postCategoryTabletPaddingCssStyle: spacingFormat(postCategoryTabletPadding, postCategoryPaddingUnits.Tablet),
            postCategoryMobilePaddingCssStyle: spacingFormat(postCategoryMobilePadding, postCategoryPaddingUnits.Mobile),

            postCategoryItemDesktopPaddingCssStyle: spacingFormat(postCategoryItemDesktopPadding, postCategoryItemPaddingUnits.Desktop),
            postCategoryItemTabletPaddingCssStyle: spacingFormat(postCategoryItemTabletPadding, postCategoryItemPaddingUnits.Tablet),
            postCategoryItemMobilePaddingCssStyle: spacingFormat(postCategoryItemMobilePadding, postCategoryItemPaddingUnits.Mobile),

            postCategoryBorderDesktopCssStyle: spacingFormat(postCategoryBorderDesktop, postCategoryBorderUnits.Desktop),
            postCategoryBorderTabletCssStyle: spacingFormat(postCategoryBorderTablet, postCategoryBorderUnits.Tablet),
            postCategoryBorderMobileCssStyle: spacingFormat(postCategoryBorderMobile, postCategoryBorderUnits.Mobile),

            postCategoryBorderRadiusDesktopCssStyle: spacingFormat(postCategoryBorderRadiusDesktop, postCategoryBorderRadiusUnits.Desktop),
            postCategoryBorderRadiusTabletCssStyle: spacingFormat(postCategoryBorderRadiusTablet, postCategoryBorderRadiusUnits.Tablet),
            postCategoryBorderRadiusMobileCssStyle: spacingFormat(postCategoryBorderRadiusMobile, postCategoryBorderRadiusUnits.Mobile),

            readMoreButtonDesktopBorderRadiusCssStyle: spacingFormat(readMoreButtonDesktopBorderRadius, readMoreButtonBorderRadiusUnits.Desktop),
            readMoreButtonTabletBorderRadiusCssStyle: spacingFormat(readMoreButtonTabletBorderRadius, readMoreButtonBorderRadiusUnits.Tablet),
            readMoreButtonMobileBorderRadiusCssStyle: spacingFormat(readMoreButtonMobileBorderRadius, readMoreButtonBorderRadiusUnits.Mobile),

            readMoreButtonDesktopPaddingCssStyle: spacingFormat(readMoreButtonDesktopPadding, readMoreButtonPaddingUnits.Desktop),
            readMoreButtonTabletPaddingCssStyle: spacingFormat(readMoreButtonTabletPadding, readMoreButtonPaddingUnits.Tablet),
            readMoreButtonMobilePaddingCssStyle: spacingFormat(readMoreButtonMobilePadding, readMoreButtonPaddingUnits.Mobile),
        });
    }, [
        navigationArrowDesktopBorderRadius,
        navigationArrowTabletBorderRadius,
        navigationArrowMobileBorderRadius,
        navigationArrowBorderRadiusUnits,

        paginationNormalDotsDesktopBorderRadius,
        paginationNormalDotsTabletBorderRadius,
        paginationNormalDotsMobileBorderRadius,
        paginationNormalDotsBorderRadiusUnits,

        postTitleDesktopMargin,
        postTitleTabletMargin,
        postTitleMobileMargin,
        postTitleMarginUnits,

        postExcerptDesktopMargin,
        postExcerptTabletMargin,
        postExcerptMobileMargin,
        postExcerptMarginUnits,

        postExcerptDesktopPadding,
        postExcerptTabletPadding,
        postExcerptMobilePadding,
        postExcerptPaddingUnits,

        postCategoryDesktopMargin,
        postCategoryTabletMargin,
        postCategoryMobileMargin,
        postCategoryMarginUnits,

        postCategoryDesktopPadding,
        postCategoryTabletPadding,
        postCategoryMobilePadding,
        postCategoryPaddingUnits,

        postCategoryItemDesktopPadding,
        postCategoryItemTabletPadding,
        postCategoryItemMobilePadding,
        postCategoryItemPaddingUnits,

        postCategoryBorderDesktop,
        postCategoryBorderTablet,
        postCategoryBorderMobile,
        postCategoryBorderUnits,

        postCategoryBorderRadiusDesktop,
        postCategoryBorderRadiusTablet,
        postCategoryBorderRadiusMobile,
        postCategoryBorderRadiusUnits,

        readMoreButtonDesktopBorderRadius,
        readMoreButtonTabletBorderRadius,
        readMoreButtonMobileBorderRadius,

        readMoreButtonDesktopPadding,
        readMoreButtonTabletPadding,
        readMoreButtonMobilePadding,
    ]);
    /** end if have default padding then set the css style */

    /** Navigation Custom Arrows */
    const navigationArrowsIconLeftHandler = (IconName) => {
        setAttributes({ navigationArrowsIconLeft: IconName })

    }
    const navigationArrowsIconRightHandler = (IconName) => {
        setAttributes({ navigationArrowsIconRight: IconName })
    }
    /** End Navigation Custom Arrows */

    /** Start Read more button icon */
    const readMoreButtonIconHandler = (IconName) => {
        setAttributes({ readMoreButtonIcon: IconName })
    }
    /** End Read more button icon */

    /** Generate svg icon for frontend */
    useEffect(() => {
        setAttributes({
            readMoreButtonIconHtml: generateSvgIcon(readMoreButtonIcon)
        });
    }, [readMoreButtonIcon]);

    useEffect(() => {
        setAttributes({
            navigationArrowsIconLeftHtml: generateSvgIcon(navigationArrowsIconLeft)
        });
    }, [navigationArrowsIconLeft]);

    useEffect(() => {
        setAttributes({
            navigationArrowsIconRightHtml: generateSvgIcon(navigationArrowsIconRight)
        });
    }, [navigationArrowsIconRight]);
    /** End Generate svg icon for frontend */

    /**
     * Inspector General Controls
     */
    const generalControls = (
        <>
            <PanelBody
                title={__("Show / Hide Elements", "gslider-blocks")}
                opened={openPanels.general === "show-hide-elements"}
                onToggle={() => togglePanel("general", "show-hide-elements")}
            >
                <ResponsiveToggleControl
                    label={__("Show Navigation", "gslider-blocks")}
                    toggleValue={showNavigation}
                    setToggleValue={(value) => setAttributes({ showNavigation: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
                <ResponsiveToggleControl
                    label={__("Show Pagination", "gslider-blocks")}
                    toggleValue={showPagination}
                    setToggleValue={(value) => setAttributes({ showPagination: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
                <ResponsiveToggleControl
                    label={__("Show Read More Button", "gslider-blocks")}
                    toggleValue={showReadMoreButton}
                    setToggleValue={(value) => setAttributes({ showReadMoreButton: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
            </PanelBody>

            <PanelBody
                title={__("Layout & Content Setting", "gslider-blocks")}
                opened={openPanels.general === "layout-content-setting"}
                onToggle={() => togglePanel("general", "layout-content-setting")}
            >
                <ResponsiveRangeControl
                    label={__("Height", "gslider-blocks")}
                    rangeValue={layoutHeight}
                    onChangeValue={(value) => setAttributes({ layoutHeight: value })}
                    onUnitChange={(value) => setAttributes({ layoutHeightUnits: value })}
                    deviceType={deviceType}
                    units={layoutHeightUnits}
                    resetFallbackValue={{
                        px: "150",
                        "%": "50",
                        vh: "50",
                        vw: "50",
                        em: "20",
                        rem: "20",
                    }}
                />

                <ResponsiveAlignmentControl
                    label={__("Vertical Alignment", "gslider-blocks")}
                    options={VERTICAL_ALIGN}
                    alignmentValue={verticalAlign}
                    setAlignmentValue={(value) => setAttributes({ verticalAlign: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                    className="gslider-vertical-alignment"
                />

                <HtmlTagControl
                    label={__("Title Tag", "gslider-blocks")}
                    options={HTML_TAGS}
                    value={postTitleHtmlTag}
                    onChange={(value) => setAttributes({ postTitleHtmlTag: value })}
                />

            </PanelBody>

            <QuerySettingsPanel
                attributes={attributes}
                setAttributes={setAttributes}
                opened={openPanels.general === "query-settings"}
                onToggle={() => togglePanel("general", "query-settings")}
                panelTitle={__("Query Settings", "gslider-blocks")}
                deviceType={deviceType}
            />

            <PanelBody
                title={__("Content Order", "gslider-blocks")}
                opened={openPanels.general === "content-order"}
                onToggle={() => togglePanel("general", "content-order")}
            >
                <ContentOrderControl
                    label={__("Post Elements Order", "gslider-blocks")}
                    items={[
                        { key: 'thumbnail', label: __('Featured Image', 'gslider-blocks'), icon: 'format-image' },
                        { key: 'categories', label: __('Categories', 'gslider-blocks'), icon: 'category' },
                        { key: 'title', label: __('Title', 'gslider-blocks'), icon: 'editor-textcolor' },
                        { key: 'excerpt', label: __('Excerpt', 'gslider-blocks'), icon: 'editor-alignleft' },
                        { key: 'meta', label: __('Author & Date Meta', 'gslider-blocks'), icon: 'admin-users' },
                        { key: 'readmore', label: __('Read More Link', 'gslider-blocks'), icon: 'admin-links' },
                    ]}
                    order={normalizedContentOrder}
                    onChange={(newOrder) => setAttributes({ contentOrder: newOrder })}
                    help={__("Drag items to reorder inside the post card", "gslider-blocks")}
                />
            </PanelBody>

            <PanelBody
                title={__("Carousel Settings", "gslider-blocks")}
                opened={openPanels.general === "carousel-settings"}
                onToggle={() => togglePanel("general", "carousel-settings")}
            >
                <ResponsiveRangeControl
                    min={1}
                    max={12}
                    label={__("Number of Columns", "gslider-blocks")}
                    rangeValue={carouselPerColumn}
                    onChangeValue={(value) => setAttributes({ carouselPerColumn: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={"2"}
                    isRangeUnit={false}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={200}
                    label={__("Column Gap (px)", "gslider-blocks")}
                    rangeValue={carouselPerColumnGap}
                    onChangeValue={(value) => setAttributes({ carouselPerColumnGap: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={""}
                    isRangeUnit={false}
                />
                <ToggleControl
                    label={__('Infinite Loop', 'gslider-blocks')}
                    checked={infiniteLoop}
                    onChange={(value) => setAttributes({ infiniteLoop: value })}
                />
                <ToggleControl
                    label={__('Touch Swipe Control', 'gslider-blocks')}
                    checked={allowTouchMove}
                    onChange={(value) => setAttributes({ allowTouchMove: value })}
                />
                <ToggleControl
                    label={__("Pause on Hover", "gslider-blocks")}
                    checked={pauseOnHover}
                    onChange={(value) => setAttributes({ pauseOnHover: value })}
                />
                <ToggleControl
                    label={__("Stop Autoplay at Last Slide", "gslider-blocks")}
                    checked={stopOnLastSlide}
                    onChange={(value) => {
                        setAttributes({ stopOnLastSlide: value });
                        if (value) {
                            setAttributes({ infiniteLoop: false });
                            setAttributes({ autoplay: true });
                        }
                    }}
                />
                <ToggleControl
                    label={__("Reverse Autoplay Direction", "gslider-blocks")}
                    checked={reverseDirection}
                    onChange={(value) => {
                        setAttributes({ reverseDirection: value });
                        if (value) {
                            setAttributes({ autoplay: true });
                        }
                    }}
                />
                <ToggleControl
                    label={__("Mousewheel Navigation", "gslider-blocks")}
                    checked={mousewheelControl}
                    onChange={(value) => setAttributes({ mousewheelControl: value })}
                />
                <ToggleControl
                    label={__("Keyboard Navigation", "gslider-blocks")}
                    checked={keyboardNavigation}
                    onChange={(value) => setAttributes({ keyboardNavigation: value })}
                />
                <ToggleControl
                    label={__('Autoplay', 'gslider-blocks')}
                    checked={autoplay}
                    onChange={(value) => setAttributes({ autoplay: value })}
                />
                {autoplay && (
                    <ResponsiveRangeControl
                        min={500}
                        max={20000}
                        label={__("Autoplay Delay (ms)", "gslider-blocks")}
                        rangeValue={autoplayDelay}
                        onChangeValue={(value) => setAttributes({ autoplayDelay: value })}
                        deviceType={deviceType}
                        step={100}
                        resetFallbackValue={"1000"}
                        isRangeUnit={false}
                    />
                )}

                <ResponsiveRangeControl
                    min={100}
                    max={5000}
                    label={__("Transition Speed (ms)", "gslider-blocks")}
                    rangeValue={speed}
                    onChangeValue={(value) => setAttributes({ speed: value })}
                    deviceType={deviceType}
                    step={50}
                    resetFallbackValue={"800"}
                    isRangeUnit={false}
                />
            </PanelBody>

            <PanelBody
                title={__("Carousel Effect", "gslider-blocks")}
                opened={openPanels.general === "carousel-effect"}
                onToggle={() => togglePanel("general", "carousel-effect")}
            >
                <Select2Control
                    label={__('Effect Type', 'gslider-blocks')}
                    options={CAROUSEL_EFFECT_OPTIONS}
                    value={carouselEffect}
                    onChange={(value) => setAttributes({ carouselEffect: value })}
                />
            </PanelBody>
            
            {showReadMoreButton?.[deviceType] && (
                <PanelBody
                    title={__("Read More Button", "gslider-blocks")}
                    opened={openPanels.general === "read-more-button"}
                    onToggle={() => togglePanel("general", "read-more-button")}
                >
                    <TextControl
                        label={__("Read More Button Text", "gslider-blocks")}
                        value={readMoreButtonText}
                        onChange={(value) => setAttributes({ readMoreButtonText: value })}
                    />
                    <SwitcherControl
                        label={__("Link Type", "gslider-blocks")}
                        options={[
                            { label: __("Post Permalink", "gslider-blocks"), value: "post" },
                            { label: __("Custom Link", "gslider-blocks"), value: "custom" },
                        ]}
                        value={readMoreButtonLinkType}
                        onChange={(value) => setAttributes({ readMoreButtonLinkType: value })}
                    />
                    {readMoreButtonLinkType === "custom" ? (
                        <UrlControl
                            url={readMoreButtonLink}
                            onChangeUrl={(value) => setAttributes({ readMoreButtonLink: value })}
                            openInNewTab={readMoreButtonTargetLink}
                            onChangeOpenInNewTab={(value) => setAttributes({ readMoreButtonTargetLink: value })}
                            nofollow={readMoreButtonNofollow}
                            onChangeNofollow={(value) => setAttributes({ readMoreButtonNofollow: value })}
                            sponsored={readMoreButtonSponsored}
                            onChangeSponsored={(value) => setAttributes({ readMoreButtonSponsored: value })}
                        />
                    ) : (
                        <>
                            <ToggleControl
                                label={__("Open in New Tab", "gslider-blocks")}
                                checked={readMoreButtonTargetLink}
                                onChange={(value) => setAttributes({ readMoreButtonTargetLink: value })}
                            />
                            <ToggleControl
                                label={__("Add Nofollow rel", "gslider-blocks")}
                                checked={readMoreButtonNofollow}
                                onChange={(value) => setAttributes({ readMoreButtonNofollow: value })}
                            />
                            <ToggleControl
                                label={__("Add Sponsored rel", "gslider-blocks")}
                                checked={readMoreButtonSponsored}
                                onChange={(value) => setAttributes({ readMoreButtonSponsored: value })}
                            />
                        </>
                    )}

                    <ToggleControl
                        label={__("Show Read More Icon", "gslider-blocks")}
                        checked={readMoreButtonIconSwitcher}
                        onChange={(value) => setAttributes({ readMoreButtonIconSwitcher: value })}
                    />

                    {readMoreButtonIconSwitcher && (
                        <>
                            <BaseControl>
                                <SwitcherControl
                                    label={__("Icon Type", "gslider-blocks")}
                                    options={ICON_TYPE}
                                    value={readMoreButtonIconType}
                                    onChange={(value) => setAttributes({ readMoreButtonIconType: value })}
                                />

                                {readMoreButtonIconType === 'icon' && (
                                    <IconPicker value={readMoreButtonIcon} setIconHandler={readMoreButtonIconHandler} />
                                )}

                                {readMoreButtonIconType === 'image' && (
                                    <ImageControl
                                        imageUrl={readMoreButtonIconImageUrl}
                                        setImageUrl={(value) => setAttributes({ readMoreButtonIconImageUrl: value })}
                                        imageAlt={readMoreButtonIconImageAlt}
                                        setImageAlt={(value) => setAttributes({ readMoreButtonIconImageAlt: value })}
                                        imageID={readMoreButtonIconImageID}
                                        setImageID={(value) => setAttributes({ readMoreButtonIconImageID: value })}
                                        isImageSize={false}
                                    />
                                )}
                            </BaseControl>
                            <SwitcherControl
                                label={__("Icon Position", "gslider-blocks")}
                                options={ICON_POSITION}
                                value={readMoreButtonIconPosition}
                                onChange={(value) => setAttributes({ readMoreButtonIconPosition: value })}
                            />
                        </>
                    )}
                </PanelBody>
            )}

            {showNavigation?.[deviceType] && (
                <PanelBody
                    title={__("Navigation", "gslider-blocks")}
                    opened={openPanels.general === "navigation"}
                    onToggle={() => togglePanel("general", "navigation")}
                >
                    <ToggleControl
                        label={__('Custom Icon', 'gslider-blocks')}
                        checked={navigationArrowsIconSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowsIconSwitcher: value })}
                    />

                    {navigationArrowsIconSwitcher && (
                        <>
                            <BaseControl>
                                <SwitcherControl
                                    label={__("Left Icon", "gslider-blocks")}
                                    options={ARROW_ICON_ALIGN}
                                    value={navigationArrowsIconLeftAlign}
                                    onChange={(value) => setAttributes({ navigationArrowsIconLeftAlign: value })}
                                />

                                {navigationArrowsIconLeftAlign === 'icon' && (
                                    <IconPicker value={navigationArrowsIconLeft} setIconHandler={navigationArrowsIconLeftHandler} />
                                )}

                                {navigationArrowsIconLeftAlign === 'image' && (
                                    <ImageControl
                                        imageUrl={navigationArrowsIconLeftImageUrl}
                                        setImageUrl={(value) => setAttributes({ navigationArrowsIconLeftImageUrl: value })}
                                        imageAlt={navigationArrowsIconLeftImageAlt}
                                        setImageAlt={(value) => setAttributes({ navigationArrowsIconLeftImageAlt: value })}
                                        imageID={navigationArrowsIconLeftImageID}
                                        setImageID={(value) => setAttributes({ navigationArrowsIconLeftImageID: value })}
                                        isImageSize={false}
                                    />
                                )}
                            </BaseControl>

                            <BaseControl>
                                <SwitcherControl
                                    label={__("Right Icon", "gslider-blocks")}
                                    options={ARROW_ICON_ALIGN}
                                    value={navigationArrowsIconRightAlign}
                                    onChange={(value) => setAttributes({ navigationArrowsIconRightAlign: value })}
                                />

                                {navigationArrowsIconRightAlign === 'icon' && (
                                    <IconPicker value={navigationArrowsIconRight} setIconHandler={navigationArrowsIconRightHandler} />
                                )}

                                {navigationArrowsIconRightAlign === 'image' && (
                                    <ImageControl
                                        imageUrl={navigationArrowsIconRightImageUrl}
                                        setImageUrl={(value) => setAttributes({ navigationArrowsIconRightImageUrl: value })}
                                        imageAlt={navigationArrowsIconRightImageAlt}
                                        setImageAlt={(value) => setAttributes({ navigationArrowsIconRightImageAlt: value })}
                                        imageID={navigationArrowsIconRightImageID}
                                        setImageID={(value) => setAttributes({ navigationArrowsIconRightImageID: value })}
                                        isImageSize={false}
                                    />
                                )}
                            </BaseControl>
                        </>
                    )}

                    <SwitcherControl
                        label={__("Positioning", "gslider-blocks")}
                        options={NAVIGATION_ARROW_POSITION_TYPE}
                        value={navigationArrowPositionType}
                        onChange={(value) => setAttributes({ navigationArrowPositionType: value })}
                    />

                    <Select2Control
                        label={__("Position", "gslider-blocks")}
                        options={NAVIGATION_ARROW_POSITION}
                        value={navigationArrowPosition}
                        onChange={(value) => setAttributes({ navigationArrowPosition: value })}
                    />

                    {navigationArrowPosition !== 'center' && (
                        <Select2Control
                            label={__("Arrow Direction", "gslider-blocks")}
                            options={NAVIGATION_ARROW_DIRECTION}
                            value={navigationArrowDirection}
                            onChange={(value) => setAttributes({ navigationArrowDirection: value })}
                        />
                    )}

                    {navigationArrowPosition === 'top-left' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}
                    {navigationArrowPosition === 'top-center' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'top-right' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Right Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionRightOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionRightOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionRightOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionRightOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'bottom-left' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Bottom Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}
                    {navigationArrowPosition === 'bottom-center' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'bottom-right' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Right Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionRightOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionRightOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionRightOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionRightOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition !== 'center' && (
                        <ResponsiveRangeControl
                            label={__("Gap", "gslider-blocks")}
                            rangeValue={navigationArrowGap}
                            onChangeValue={(value) => setAttributes({ navigationArrowGap: value })}
                            onUnitChange={(value) => setAttributes({ navigationArrowGapUnits: value })}
                            deviceType={deviceType}
                            units={navigationArrowGapUnits}
                            resetFallbackValue={{
                                px: "10",
                                "%": "2",
                                vh: "2",
                                vw: "2",
                                em: "0.75",
                                rem: "0.75",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />
                    )}

                    {navigationArrowPositionType === 'outside' && (
                        <ResponsiveRangeControl
                            label={__("Padding", "gslider-blocks")}
                            rangeValue={navigationArrowPositionOutsidePadding}
                            onChangeValue={(value) => setAttributes({ navigationArrowPositionOutsidePadding: value })}
                            onUnitChange={(value) => setAttributes({ navigationArrowPositionOutsidePaddingUnits: value })}
                            deviceType={deviceType}
                            units={navigationArrowPositionOutsidePaddingUnits}
                            resetFallbackValue={{
                                px: "60",
                                "%": "5",
                                vh: "5",
                                vw: "5",
                                em: "3.75",
                                rem: "3.75",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />
                    )}

                </PanelBody>
            )}

            {showPagination?.[deviceType] && (
                <PanelBody
                    title={__("Pagination", "gslider-blocks")}
                    opened={openPanels.general === "pagination"}
                    onToggle={() => togglePanel("general", "pagination")}
                >
                    <SwitcherControl
                        label={__("Position", "gslider-blocks")}
                        options={PAGINATION_POSITION_TYPE}
                        value={paginationPositionType}
                        onChange={(value) => setAttributes({ paginationPositionType: value })}
                    />

                    <Select2Control
                        label={__("Type", "gslider-blocks")}
                        options={PAGINATION_TYPE}
                        value={paginationType}
                        onChange={(value) => setAttributes({ paginationType: value })}
                    />

                    {paginationType === 'bullets' && (
                        <ToggleControl
                            label={__("Dynamic Bullets", "slider-blocks")}
                            checked={dynamicBullets}
                            onChange={(value) => setAttributes({ dynamicBullets: value })}
                        />
                    )}
                </PanelBody>
            )}

            <PanelBody
                title={__("Performance Settings", "gslider-blocks")}
                opened={openPanels.general === "performance-settings"}
                onToggle={() => togglePanel("general", "performance-settings")}
                initialOpen={false}
            >
                <ToggleControl
                    label={__("Enable Lazy Loading", "gslider-blocks")}
                    help={__("Delay loading of images until they are in the viewport.", "gslider-blocks")}
                    checked={enableLazyLoad}
                    onChange={(value) => setAttributes({ enableLazyLoad: value })}
                />
            </PanelBody>
        </>
    );

    /**
     * Inspector Style Controls
     */
    const styleControls = (
        <>
            <PanelBody
                title={__("Image", "gslider-blocks")}
                opened={openPanels.styles === "image"}
                onToggle={() => togglePanel("styles", "image")}
            >
                <ResponsiveRangeControl
                    label={__("Max Width", "gslider-blocks")}
                    rangeValue={imageMaxWidth}
                    onChangeValue={(value) => setAttributes({ imageMaxWidth: value })}
                    onUnitChange={(value) => setAttributes({ imageMaxWidthUnits: value })}
                    deviceType={deviceType}
                    units={imageMaxWidthUnits}
                    resetFallbackValue={""}
                    unitBounds={{
                        px: { min: 0, max: 1000, step: 1 },
                    }}
                />

                <ResponsiveRangeControl
                    label={__("Height", "gslider-blocks")}
                    rangeValue={imageHeight}
                    onChangeValue={(value) => setAttributes({ imageHeight: value })}
                    onUnitChange={(value) => setAttributes({ imageHeightUnits: value })}
                    deviceType={deviceType}
                    units={imageHeightUnits}
                    resetFallbackValue={""}
                    unitBounds={{
                        px: { min: 0, max: 1000, step: 1 },
                    }}
                />

                <Select2Control
                    label={__("Object Fit", "gslider-blocks")}
                    options={[
                        { label: __('Cover', 'gslider-blocks'), value: 'cover' },
                        { label: __('Contain', 'gslider-blocks'), value: 'contain' },
                        { label: __('Fill', 'gslider-blocks'), value: 'fill' },
                        { label: __('None', 'gslider-blocks'), value: 'none' },
                    ]}
                    value={imageObjectFit}
                    onChange={(value) => setAttributes({ imageObjectFit: value })}
                />

                <Select2Control
                    label={__("Object Position", "gslider-blocks")}
                    options={[
                        { label: __('Center', 'gslider-blocks'), value: 'center' },
                        { label: __('Top', 'gslider-blocks'), value: 'top' },
                        { label: __('Bottom', 'gslider-blocks'), value: 'bottom' },
                        { label: __('Left', 'gslider-blocks'), value: 'left' },
                        { label: __('Right', 'gslider-blocks'), value: 'right' },
                        { label: __('Left Top', 'gslider-blocks'), value: 'left top' },
                        { label: __('Right Top', 'gslider-blocks'), value: 'right top' },
                        { label: __('Left Bottom', 'gslider-blocks'), value: 'left bottom' },
                        { label: __('Right Bottom', 'gslider-blocks'), value: 'right bottom' },
                    ]}
                    value={imageObjectPosition}
                    onChange={(value) => setAttributes({ imageObjectPosition: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imagePaddingUnits}
                    onChangeUnits={(value) => setAttributes({ imagePaddingUnits: value })}
                    desktopSpacing={imagePaddingDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imagePaddingDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imagePaddingDesktopCssStyle: value })}
                    tabletSpacing={imagePaddingTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imagePaddingTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imagePaddingTabletCssStyle: value })}
                    mobileSpacing={imagePaddingMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imagePaddingMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imagePaddingMobileCssStyle: value })}
                    isLinked={imagePaddingLink}
                    onChangeLink={(value) => setAttributes({ imagePaddingLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imageMarginUnits}
                    onChangeUnits={(value) => setAttributes({ imageMarginUnits: value })}
                    desktopSpacing={imageMarginDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imageMarginDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imageMarginDesktopCssStyle: value })}
                    tabletSpacing={imageMarginTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imageMarginTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imageMarginTabletCssStyle: value })}
                    mobileSpacing={imageMarginMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imageMarginMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imageMarginMobileCssStyle: value })}
                    isLinked={imageMarginLink}
                    onChangeLink={(value) => setAttributes({ imageMarginLink: value })}
                />

                <BackgroundControl
                    label={__("Background Color", "gslider-blocks")}
                    deviceType={deviceType}

                    normalBackgroundType={imageNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ imageNormalBackgroundType: value })}
                    normalClassicColor={imageNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ imageNormalClassicColor: value })}
                    normalGradientColor={imageNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ imageNormalGradientColor: value })}
                    normalCustomGradientSwitcher={imageNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ imageNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={imageNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ imageNormalCustomGradientInputValue: value })}

                    hoverBackgroundType={imageHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ imageHoverBackgroundType: value })}
                    hoverClassicColor={imageHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ imageHoverClassicColor: value })}
                    hoverGradientColor={imageHoverGradientColor}
                    setHoverGradientColor={(value) => setAttributes({ imageHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={imageHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ imageHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={imageHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ imageHoverCustomGradientInputValue: value })}
                    setAttributes={setAttributes}
                    isBackgroundImage={false}
                />

                <Select2Control
                    label={__("Border Style", "gslider-blocks")}
                    options={BORDER_STYLES}
                    value={imageBorder}
                    onChange={(value) => setAttributes({ imageBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={imageBorderColorSwitcher}
                    onChange={(value) => setAttributes({ imageBorderColorSwitcher: value })}
                />

                {imageBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={imageBorderColor}
                        onChangeColor={(value) => setAttributes({ imageBorderColor: value })}
                    />
                )}

                {imageBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={imageBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ imageBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border Width", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imageBorderUnits}
                    onChangeUnits={(value) => setAttributes({ imageBorderUnits: value })}
                    desktopSpacing={imageBorderDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imageBorderDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imageBorderDesktopCssStyle: value })}
                    tabletSpacing={imageBorderTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imageBorderTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imageBorderTabletCssStyle: value })}
                    mobileSpacing={imageBorderMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imageBorderMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imageBorderMobileCssStyle: value })}
                    isLinked={imageBorderLink}
                    onChangeLink={(value) => setAttributes({ imageBorderLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imageBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ imageBorderRadiusUnits: value })}
                    desktopSpacing={imageBorderRadiusDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imageBorderRadiusDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imageBorderRadiusDesktopCssStyle: value })}
                    tabletSpacing={imageBorderRadiusTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imageBorderRadiusTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imageBorderRadiusTabletCssStyle: value })}
                    mobileSpacing={imageBorderRadiusMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imageBorderRadiusMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imageBorderRadiusMobileCssStyle: value })}
                    isLinked={imageBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ imageBorderRadiusLink: value })}
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={imageBoxShadowValuesSwitcher}
                    onChange={(value) => setAttributes({ imageBoxShadowValuesSwitcher: value })}
                />

                {imageBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ imageBoxShadowValues: value })}
                        initialShadowValue={imageBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ imageBoxShadowCssValue: value })}
                    />
                )}

                {imageBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ imageBoxShadowHoverValues: value })}
                        initialShadowValue={imageBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ imageBoxShadowHoverCssValue: value })}
                    />
                )}

                <Select2Control
                    label={__('Hover Effect', 'gslider-blocks')}
                    options={[
                        { label: __('None', 'gslider-blocks'), value: 'none' },
                        { label: __('Opacity', 'gslider-blocks'), value: 'opacity' },
                        { label: __('Scale', 'gslider-blocks'), value: 'scale' },
                        { label: __('Move Up', 'gslider-blocks'), value: 'move-up' },
                        { label: __('Grayscale to Color', 'gslider-blocks'), value: 'grayscale' },
                        { label: __('Opacity & Scale', 'gslider-blocks'), value: 'both' },
                    ]}
                    value={imageHoverEffect}
                    onChange={(value) => setAttributes({ imageHoverEffect: value })}
                />

                {(imageHoverEffect === 'opacity' || imageHoverEffect === 'both') && (
                    <ResponsiveRangeControl
                        min={0}
                        max={1}
                        step={0.05}
                        label={__("Hover Opacity", "gslider-blocks")}
                        rangeValue={imageHoverOpacity}
                        onChangeValue={(value) => setAttributes({ imageHoverOpacity: value })}
                        deviceType={deviceType}
                        resetFallbackValue={"0.8"}
                        isRangeUnit={false}
                    />
                )}

                {(imageHoverEffect === 'scale' || imageHoverEffect === 'both') && (
                    <ResponsiveRangeControl
                        min={0.8}
                        max={1.5}
                        step={0.05}
                        label={__("Hover Scale", "gslider-blocks")}
                        rangeValue={imageHoverScale}
                        onChangeValue={(value) => setAttributes({ imageHoverScale: value })}
                        deviceType={deviceType}
                        resetFallbackValue={"1.05"}
                        isRangeUnit={false}
                    />
                )}

                {(imageHoverEffect === 'move-up') && (
                    <ResponsiveRangeControl
                        label={__("Lift Amount", "gslider-blocks")}
                        rangeValue={imageHoverLift}
                        onChangeValue={(value) => setAttributes({ imageHoverLift: value })}
                        onUnitChange={(value) => setAttributes({ imageHoverLiftUnits: value })}
                        deviceType={deviceType}
                        units={imageHoverLiftUnits}
                        resetFallbackValue={{
                            px: "10",
                            "%": "5",
                            em: "1",
                            rem: "1",
                            vw: "1",
                            vh: "1"
                        }}
                        isRangeUnit={true}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                            em: { min: 0, max: 10, step: 0.1 },
                            rem: { min: 0, max: 10, step: 0.1 },
                            '%': { min: 0, max: 100, step: 1 },
                        }}
                    />
                )}

                <ResponsiveRangeControl
                    min={100}
                    max={1000}
                    step={50}
                    label={__("Transition Duration (ms)", "gslider-blocks")}
                    rangeValue={imageTransitionDuration}
                    onChangeValue={(value) => setAttributes({ imageTransitionDuration: value })}
                    deviceType={deviceType}
                    resetFallbackValue={"300"}
                    isRangeUnit={false}
                />
            </PanelBody>

            <PanelBody
                title={__("Categories", "gslider-blocks")}
                opened={openPanels.styles === "post-categories"}
                onToggle={() => togglePanel("styles", "post-categories")}
            >
                <ResponsiveTypographyControl
                    fontFamily={postCategoryFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ postCategoryFontFamily: value })}

                    fontSize={postCategoryFontSize}
                    onChangeFontSize={(value) => setAttributes({ postCategoryFontSize: value })}

                    fontSizeUnits={postCategoryFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ postCategoryFontSizeUnits: value })}

                    fontWeight={postCategoryFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ postCategoryFontWeight: value })}

                    fontStyle={postCategoryFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ postCategoryFontStyle: value })}

                    textTransform={postCategoryTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ postCategoryTextTransform: value })}

                    textDecoration={postCategoryTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ postCategoryTextDecoration: value })}

                    lineHeight={postCategoryLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ postCategoryLineHeight: value })}

                    lineHeightUnits={postCategoryLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ postCategoryLineHeightUnits: value })}

                    letterSpacing={postCategoryLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ postCategoryLetterSpacing: value })}

                    letterSpacingUnits={postCategoryLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ postCategoryLetterSpacingUnits: value })}

                    wordSpacing={postCategoryWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ postCategoryWordSpacing: value })}

                    wordSpacingUnits={postCategoryWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ postCategoryWordSpacingUnits: value })}

                    deviceType={deviceType}
                />

                <ResponsiveAlignmentControl
                    label={__("Alignment", "gslider-blocks")}
                    options={TEXT_ALIGN}
                    alignmentValue={postCategoryAlign}
                    setAlignmentValue={(value) => setAttributes({ postCategoryAlign: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />

                <SwitcherControl
                    label={__("Text Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={postCategoryColorSwitcher}
                    onChange={(value) => setAttributes({ postCategoryColorSwitcher: value })}
                />

                {postCategoryColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={postCategoryColor}
                        onChangeColor={(value) => setAttributes({ postCategoryColor: value })}
                        defaultColor=''
                    />
                )}

                {postCategoryColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={postCategoryColorHover}
                        onChangeColor={(value) => setAttributes({ postCategoryColorHover: value })}
                        defaultColor=''
                    />
                )}

                <BackgroundControl
                    label={__("Background Color", "gslider-blocks")}
                    deviceType={deviceType}

                    normalBackgroundType={postCategoryNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ postCategoryNormalBackgroundType: value })}
                    normalClassicColor={postCategoryNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ postCategoryNormalClassicColor: value })}
                    normalGradientColor={postCategoryNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ postCategoryNormalGradientColor: value })}
                    normalCustomGradientSwitcher={postCategoryNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ postCategoryNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={postCategoryNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ postCategoryNormalCustomGradientInputValue: value })}

                    hoverBackgroundType={postCategoryHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ postCategoryHoverBackgroundType: value })}
                    hoverClassicColor={postCategoryHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ postCategoryHoverClassicColor: value })}
                    hoverGradientColor={postCategoryHoverGradientColor}
                    setHoverGradientColor={(value) => setAttributes({ postCategoryHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={postCategoryHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ postCategoryHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={postCategoryHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ postCategoryHoverCustomGradientInputValue: value })}
                    setAttributes={setAttributes}
                    isBackgroundImage={false}
                />

                <Select2Control
                    label={__('Border Style', 'gslider-blocks')}
                    options={BORDER_STYLES}
                    value={postCategoryBorder}
                    onChange={(value) => setAttributes({ postCategoryBorder: value })}
                />

                {postCategoryBorder !== 'none' && (
                    <>
                        <SwitcherControl
                            label={__("Border Color", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={postCategoryBorderColorSwitcher}
                            onChange={(value) => setAttributes({ postCategoryBorderColorSwitcher: value })}
                        />

                        {postCategoryBorderColorSwitcher === 'normal' && (
                            <ColorControl
                                label={__("Border Color", "gslider-blocks")}
                                color={postCategoryBorderColor}
                                onChangeColor={(value) => setAttributes({ postCategoryBorderColor: value })}
                            />
                        )}

                        {postCategoryBorderColorSwitcher === 'hover' && (
                            <ColorControl
                                label={__("Hover Color", "gslider-blocks")}
                                color={postCategoryBorderHoverColor}
                                onChangeColor={(value) => setAttributes({ postCategoryBorderHoverColor: value })}
                            />
                        )}

                        <ResponsiveSpacingControl
                            label={__("Border Width", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={postCategoryBorderUnits}
                            onChangeUnits={(value) => setAttributes({ postCategoryBorderUnits: value })}
                            desktopSpacing={postCategoryBorderDesktop}
                            onChangeDesktopSpacing={(value) => setAttributes({ postCategoryBorderDesktop: value })}
                            desktopSpacingStyle={(value) => setAttributes({ postCategoryBorderDesktopCssStyle: value })}
                            tabletSpacing={postCategoryBorderTablet}
                            onChangeTabletSpacing={(value) => setAttributes({ postCategoryBorderTablet: value })}
                            tabletSpacingStyle={(value) => setAttributes({ postCategoryBorderTabletCssStyle: value })}
                            mobileSpacing={postCategoryBorderMobile}
                            onChangeMobileSpacing={(value) => setAttributes({ postCategoryBorderMobile: value })}
                            mobileSpacingStyle={(value) => setAttributes({ postCategoryBorderMobileCssStyle: value })}
                            isLinked={postCategoryBorderLink}
                            onChangeLink={(value) => setAttributes({ postCategoryBorderLink: value })}
                        />
                    </>
                )}

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postCategoryBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ postCategoryBorderRadiusUnits: value })}
                    desktopSpacing={postCategoryBorderRadiusDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ postCategoryBorderRadiusDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postCategoryBorderRadiusDesktopCssStyle: value })}
                    tabletSpacing={postCategoryBorderRadiusTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ postCategoryBorderRadiusTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postCategoryBorderRadiusTabletCssStyle: value })}
                    mobileSpacing={postCategoryBorderRadiusMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ postCategoryBorderRadiusMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postCategoryBorderRadiusMobileCssStyle: value })}
                    isLinked={postCategoryBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ postCategoryBorderRadiusLink: value })}
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={postCategoryBoxShadowValuesSwitcher}
                    onChange={(value) => setAttributes({ postCategoryBoxShadowValuesSwitcher: value })}
                />

                {postCategoryBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ postCategoryBoxShadowValues: value })}
                        initialShadowValue={postCategoryBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ postCategoryBoxShadowCssValue: value })}
                    />
                )}

                {postCategoryBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ postCategoryBoxShadowHoverValues: value })}
                        initialShadowValue={postCategoryBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ postCategoryBoxShadowHoverCssValue: value })}
                    />
                )}

                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Gap", "gslider-blocks")}
                    rangeValue={postCategoryGap}
                    onChangeValue={(value) => setAttributes({ postCategoryGap: value })}
                    onUnitChange={(value) => setAttributes({ postCategoryGapUnits: value })}
                    deviceType={deviceType}
                    units={postCategoryGapUnits}
                    resetFallbackValue={{
                        px: "5",
                        em: "0.5",
                        rem: "0.5"
                    }}
                />

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postCategoryMarginUnits}
                    onChangeUnits={(value) => setAttributes({ postCategoryMarginUnits: value })}
                    desktopSpacing={postCategoryDesktopMargin}
                    onChangeDesktopSpacing={(value) => setAttributes({ postCategoryDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postCategoryDesktopMarginCssStyle: value })}
                    tabletSpacing={postCategoryTabletMargin}
                    onChangeTabletSpacing={(value) => setAttributes({ postCategoryTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postCategoryTabletMarginCssStyle: value })}
                    mobileSpacing={postCategoryMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ postCategoryMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postCategoryMobileMarginCssStyle: value })}
                    isLinked={postCategoryMarginLink}
                    onChangeLink={(value) => setAttributes({ postCategoryMarginLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postCategoryPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ postCategoryPaddingUnits: value })}
                    desktopSpacing={postCategoryDesktopPadding}
                    onChangeDesktopSpacing={(value) => setAttributes({ postCategoryDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postCategoryDesktopPaddingCssStyle: value })}
                    tabletSpacing={postCategoryTabletPadding}
                    onChangeTabletSpacing={(value) => setAttributes({ postCategoryTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postCategoryTabletPaddingCssStyle: value })}
                    mobileSpacing={postCategoryMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ postCategoryMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postCategoryMobilePaddingCssStyle: value })}
                    isLinked={postCategoryPaddingLink}
                    onChangeLink={(value) => setAttributes({ postCategoryPaddingLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Item Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postCategoryItemPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ postCategoryItemPaddingUnits: value })}
                    desktopSpacing={postCategoryItemDesktopPadding}
                    onChangeDesktopSpacing={(value) => setAttributes({ postCategoryItemDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postCategoryItemDesktopPaddingCssStyle: value })}
                    tabletSpacing={postCategoryItemTabletPadding}
                    onChangeTabletSpacing={(value) => setAttributes({ postCategoryItemTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postCategoryItemTabletPaddingCssStyle: value })}
                    mobileSpacing={postCategoryItemMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ postCategoryItemMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postCategoryItemMobilePaddingCssStyle: value })}
                    isLinked={postCategoryItemPaddingLink}
                    onChangeLink={(value) => setAttributes({ postCategoryItemPaddingLink: value })}
                />
            </PanelBody>

            <PanelBody
                title={__("Title", "gslider-blocks")}
                opened={openPanels.styles === "post-title"}
                onToggle={() => togglePanel("styles", "post-title")}
            >
                <ResponsiveTypographyControl
                    fontFamily={postTitleFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ postTitleFontFamily: value })}

                    fontSize={postTitleFontSize}
                    onChangeFontSize={(value) => setAttributes({ postTitleFontSize: value })}

                    fontSizeUnits={postTitleFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ postTitleFontSizeUnits: value })}

                    fontWeight={postTitleFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ postTitleFontWeight: value })}

                    fontStyle={postTitleFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ postTitleFontStyle: value })}

                    textTransform={postTitleTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ postTitleTextTransform: value })}

                    textDecoration={postTitleTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ postTitleTextDecoration: value })}

                    lineHeight={postTitleLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ postTitleLineHeight: value })}

                    lineHeightUnits={postTitleLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ postTitleLineHeightUnits: value })}

                    letterSpacing={postTitleLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ postTitleLetterSpacing: value })}

                    letterSpacingUnits={postTitleLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ postTitleLetterSpacingUnits: value })}

                    wordSpacing={postTitleWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ postTitleWordSpacing: value })}

                    wordSpacingUnits={postTitleWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ postTitleWordSpacingUnits: value })}

                    deviceType={deviceType}
                />

                <ResponsiveAlignmentControl
                    label={__("Alignment", "gslider-blocks")}
                    options={TEXT_ALIGN}
                    alignmentValue={postTitleAlign}
                    setAlignmentValue={(value) => setAttributes({ postTitleAlign: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />

                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={postTitleColorSwitcher}
                    onChange={(value) => setAttributes({ postTitleColorSwitcher: value })}
                />

                {postTitleColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={postTitleColor}
                        onChangeColor={(value) => setAttributes({ postTitleColor: value })}
                        defaultColor=''
                    />
                )}

                {postTitleColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={postTitleColorHover}
                        onChangeColor={(value) => setAttributes({ postTitleColorHover: value })}
                        defaultColor=''
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postTitleMarginUnits}
                    onChangeUnits={(value) => setAttributes({ postTitleMarginUnits: value })}
                    desktopSpacing={postTitleDesktopMargin}
                    onChangeDesktopSpacing={(value) => setAttributes({ postTitleDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postTitleDesktopMarginCssStyle: value })}
                    tabletSpacing={postTitleTabletMargin}
                    onChangeTabletSpacing={(value) => setAttributes({ postTitleTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postTitleTabletMarginCssStyle: value })}
                    mobileSpacing={postTitleMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ postTitleMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postTitleMobileMarginCssStyle: value })}
                    isLinked={postTitleMarginLink}
                    onChangeLink={(value) => setAttributes({ postTitleMarginLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postTitlePaddingUnits}
                    onChangeUnits={(value) => setAttributes({ postTitlePaddingUnits: value })}
                    desktopSpacing={postTitleDesktopPadding}
                    onChangeDesktopSpacing={(value) => setAttributes({ postTitleDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postTitleDesktopPaddingCssStyle: value })}
                    tabletSpacing={postTitleTabletPadding}
                    onChangeTabletSpacing={(value) => setAttributes({ postTitleTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postTitleTabletPaddingCssStyle: value })}
                    mobileSpacing={postTitleMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ postTitleMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postTitleMobilePaddingCssStyle: value })}
                    isLinked={postTitlePaddingLink}
                    onChangeLink={(value) => setAttributes({ postTitlePaddingLink: value })}
                />
            </PanelBody>

            <PanelBody
                title={__("Excerpt", "gslider-blocks")}
                opened={openPanels.styles === "post-excerpt"}
                onToggle={() => togglePanel("styles", "post-excerpt")}
            >
                <HtmlTagControl
                    label={__("Html Tag", "gslider-blocks")}
                    options={HTML_TAGS}
                    value={postExcerptHtmlTag}
                    onChange={(value) => setAttributes({ postExcerptHtmlTag: value })}
                />

                <ResponsiveTypographyControl
                    fontFamily={postExcerptFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ postExcerptFontFamily: value })}

                    fontSize={postExcerptFontSize}
                    onChangeFontSize={(value) => setAttributes({ postExcerptFontSize: value })}

                    fontSizeUnits={postExcerptFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ postExcerptFontSizeUnits: value })}

                    fontWeight={postExcerptFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ postExcerptFontWeight: value })}

                    fontStyle={postExcerptFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ postExcerptFontStyle: value })}

                    textTransform={postExcerptTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ postExcerptTextTransform: value })}

                    textDecoration={postExcerptTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ postExcerptTextDecoration: value })}

                    lineHeight={postExcerptLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ postExcerptLineHeight: value })}

                    lineHeightUnits={postExcerptLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ postExcerptLineHeightUnits: value })}

                    letterSpacing={postExcerptLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ postExcerptLetterSpacing: value })}

                    letterSpacingUnits={postExcerptLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ postExcerptLetterSpacingUnits: value })}

                    wordSpacing={postExcerptWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ postExcerptWordSpacing: value })}

                    wordSpacingUnits={postExcerptWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ postExcerptWordSpacingUnits: value })}

                    deviceType={deviceType}
                />

                <ResponsiveAlignmentControl
                    label={__("Alignment", "gslider-blocks")}
                    options={TEXT_ALIGN}
                    alignmentValue={postExcerptAlign}
                    setAlignmentValue={(value) => setAttributes({ postExcerptAlign: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />

                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={postExcerptColorSwitcher}
                    onChange={(value) => setAttributes({ postExcerptColorSwitcher: value })}
                />

                {postExcerptColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={postExcerptColor}
                        onChangeColor={(value) => setAttributes({ postExcerptColor: value })}
                        defaultColor=''
                    />
                )}

                {postExcerptColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={postExcerptColorHover}
                        onChangeColor={(value) => setAttributes({ postExcerptColorHover: value })}
                        defaultColor=''
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postExcerptMarginUnits}
                    onChangeUnits={(value) => setAttributes({ postExcerptMarginUnits: value })}
                    desktopSpacing={postExcerptDesktopMargin}
                    onChangeDesktopSpacing={(value) => setAttributes({ postExcerptDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postExcerptDesktopMarginCssStyle: value })}
                    tabletSpacing={postExcerptTabletMargin}
                    onChangeTabletSpacing={(value) => setAttributes({ postExcerptTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postExcerptTabletMarginCssStyle: value })}
                    mobileSpacing={postExcerptMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ postExcerptMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postExcerptMobileMarginCssStyle: value })}
                    isLinked={postExcerptMarginLink}
                    onChangeLink={(value) => setAttributes({ postExcerptMarginLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={postExcerptPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ postExcerptPaddingUnits: value })}
                    desktopSpacing={postExcerptDesktopPadding}
                    onChangeDesktopSpacing={(value) => setAttributes({ postExcerptDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ postExcerptDesktopPaddingCssStyle: value })}
                    tabletSpacing={postExcerptTabletPadding}
                    onChangeTabletSpacing={(value) => setAttributes({ postExcerptTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ postExcerptTabletPaddingCssStyle: value })}
                    mobileSpacing={postExcerptMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ postExcerptMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ postExcerptMobilePaddingCssStyle: value })}
                    isLinked={postExcerptPaddingLink}
                    onChangeLink={(value) => setAttributes({ postExcerptPaddingLink: value })}
                />
            </PanelBody>

            {showReadMoreButton && (
                <>
                    <PanelBody
                        title={__("Read More Button", "gslider-blocks")}
                        opened={openPanels.styles === "read-more-button"}
                        onToggle={() => togglePanel("styles", "read-more-button")}
                    >
                        <ResponsiveTypographyControl
                            fontFamily={readMoreButtonFontFamily}
                            onChangeFontFamily={(value) => setAttributes({ readMoreButtonFontFamily: value })}

                            fontSize={readMoreButtonFontSize}
                            onChangeFontSize={(value) => setAttributes({ readMoreButtonFontSize: value })}

                            fontSizeUnits={readMoreButtonFontSizeUnits}
                            onChangeFontSizeUnit={(value) => setAttributes({ readMoreButtonFontSizeUnits: value })}

                            fontWeight={readMoreButtonFontWeight}
                            onChangeFontWeight={(value) => setAttributes({ readMoreButtonFontWeight: value })}

                            fontStyle={readMoreButtonFontStyle}
                            onChangeFontStyle={(value) => setAttributes({ readMoreButtonFontStyle: value })}

                            textTransform={readMoreButtonTextTransform}
                            onChangeTextTransform={(value) => setAttributes({ readMoreButtonTextTransform: value })}

                            textDecoration={readMoreButtonTextDecoration}
                            onChangeTextDecoration={(value) => setAttributes({ readMoreButtonTextDecoration: value })}

                            lineHeight={readMoreButtonLineHeight}
                            onChangeLineHeight={(value) => setAttributes({ readMoreButtonLineHeight: value })}

                            lineHeightUnits={readMoreButtonLineHeightUnits}
                            onChangeLineHeightUnit={(value) => setAttributes({ readMoreButtonLineHeightUnits: value })}

                            letterSpacing={readMoreButtonLetterSpacing}
                            onChangeLetterSpacing={(value) => setAttributes({ readMoreButtonLetterSpacing: value })}

                            letterSpacingUnits={readMoreButtonLetterSpacingUnits}
                            onChangeLetterSpacingUnit={(value) => setAttributes({ readMoreButtonLetterSpacingUnits: value })}

                            wordSpacing={readMoreButtonWordSpacing}
                            onChangeWordSpacing={(value) => setAttributes({ readMoreButtonWordSpacing: value })}

                            wordSpacingUnits={readMoreButtonWordSpacingUnits}
                            onChangeWordSpacingUnit={(value) => setAttributes({ readMoreButtonWordSpacingUnits: value })}

                            deviceType={deviceType}
                        />

                        <SwitcherControl
                            label={__("Button Width", "gslider-blocks")}
                            options={WIDTH_MODE}
                            value={readMoreButtonWidth}
                            onChange={(value) => setAttributes({ readMoreButtonWidth: value })}
                        />

                        {readMoreButtonWidth !== 'full' && (
                            <ResponsiveAlignmentControl
                                label={__("Button Alignment", "gslider-blocks")}
                                options={TEXT_ALIGN}
                                alignmentValue={readMoreButtonAlign}
                                setAlignmentValue={(value) => setAttributes({ readMoreButtonAlign: value })}
                                deviceType={deviceType}
                                setAttributes={setAttributes}
                            />
                        )}

                        <Select2Control
                            label={__("Button Hover Animation", "gslider-blocks")}
                            options={[
                                { label: __("None", "gslider-blocks"), value: "none" },
                                { label: __("Grow", "gslider-blocks"), value: "grow" },
                                { label: __("Shrink", "gslider-blocks"), value: "shrink" },
                                { label: __("Float Up", "gslider-blocks"), value: "float" },
                                { label: __("Shift Right", "gslider-blocks"), value: "shift-right" },
                                { label: __("Shimmer (Shiny Sweep)", "gslider-blocks"), value: "shimmer" },
                                { label: __("Pulse", "gslider-blocks"), value: "pulse" },
                            ]}
                            value={readMoreButtonHoverAnimation}
                            onChange={(value) => setAttributes({ readMoreButtonHoverAnimation: value })}
                        />

                        <SwitcherControl
                            label={__("Color", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonColorSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonColorSwitcher: value })}
                        />

                        {readMoreButtonColorSwitcher === 'normal' && (
                            <ColorControl
                                label={__("Normal Color", "gslider-blocks")}
                                color={readMoreButtonColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonColor: value })}
                                defaultColor=''
                            />
                        )}

                        {readMoreButtonColorSwitcher === 'hover' && (
                            <ColorControl
                                label={__("Hover Color", "gslider-blocks")}
                                color={readMoreButtonColorHover}
                                onChangeColor={(value) => setAttributes({ readMoreButtonColorHover: value })}
                                defaultColor=''
                            />
                        )}

                        <BackgroundControl
                            label={__("Background Color", "gslider-blocks")}

                            normalBackgroundType={readMoreButtonNormalBackgroundType}
                            setNormalBackgroundType={(value) => setAttributes({ readMoreButtonNormalBackgroundType: value })}
                            normalClassicColor={readMoreButtonNormalClassicColor}
                            setNormalClassicColor={(value) => setAttributes({ readMoreButtonNormalClassicColor: value })}
                            normalGradientColor={readMoreButtonNormalGradientColor}
                            setNormalGradientColor={(value) => setAttributes({ readMoreButtonNormalGradientColor: value })}
                            normalCustomGradientSwitcher={readMoreButtonNormalCustomGradientSwitcher}
                            setNormalCustomGradientSwitcher={(value) => setAttributes({ readMoreButtonNormalCustomGradientSwitcher: value })}
                            normalCustomGradientInputValue={readMoreButtonNormalCustomGradientInputValue}
                            setNormalCustomGradientInputValue={(value) => setAttributes({ readMoreButtonNormalCustomGradientInputValue: value })}
                            normalClassicDefaultColor={'#d2d2d2c7'}

                            hoverBackgroundType={readMoreButtonHoverBackgroundType}
                            setHoverBackgroundType={(value) => setAttributes({ readMoreButtonHoverBackgroundType: value })}
                            hoverClassicColor={readMoreButtonHoverClassicColor}
                            setHoverClassicColor={(value) => setAttributes({ readMoreButtonHoverClassicColor: value })}
                            hoverGradientColor={readMoreButtonHoverGradientColor}
                            setHoverGradientColor={(value) => setAttributes({ readMoreButtonHoverGradientColor: value })}
                            hoverCustomGradientSwitcher={readMoreButtonHoverCustomGradientSwitcher}
                            setHoverCustomGradientSwitcher={(value) => setAttributes({ readMoreButtonHoverCustomGradientSwitcher: value })}
                            hoverCustomGradientInputValue={readMoreButtonHoverCustomGradientInputValue}
                            setHoverCustomGradientInputValue={(value) => setAttributes({ readMoreButtonHoverCustomGradientInputValue: value })}
                            hoverClassicDefaultColor={'#787878b8'}
                            isBackgroundImage={false}
                        />

                        <Select2Control
                            label={__("Border Style", "gslider-blocks")}
                            options={BORDER_STYLES}
                            value={readMoreButtonBorder}
                            onChange={(value) => setAttributes({ readMoreButtonBorder: value })}
                        />

                        <SwitcherControl
                            label={__("Border Color", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonBorderColorSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonBorderColorSwitcher: value })}
                        />

                        {readMoreButtonBorderColorSwitcher === 'normal' && (
                            <ColorControl
                                label={__("Normal Color", "gslider-blocks")}
                                color={readMoreButtonBorderColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonBorderColor: value })}
                            />
                        )}

                        {readMoreButtonBorderColorSwitcher === 'hover' && (
                            <ColorControl
                                label={__("Hover Color", "gslider-blocks")}
                                color={readMoreButtonBorderHoverColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonBorderHoverColor: value })}
                            />
                        )}

                        <ResponsiveSpacingControl
                            label={__("Border Width", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonBorderUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonBorderUnits: value })}
                            desktopSpacing={readMoreButtonDesktopBorder}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonDesktopBorder: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonDesktopBorderCssStyle: value })}
                            tabletSpacing={readMoreButtonTabletBorder}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonTabletBorder: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonTabletBorderCssStyle: value })}
                            mobileSpacing={readMoreButtonMobileBorder}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonMobileBorder: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonMobileBorderCssStyle: value })}
                            isLinked={readMoreButtonBorderLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonBorderLink: value })}
                        />

                        <ResponsiveSpacingControl
                            label={__("Border Radius", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonBorderRadiusUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonBorderRadiusUnits: value })}
                            desktopSpacing={readMoreButtonDesktopBorderRadius}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonDesktopBorderRadius: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonDesktopBorderRadiusCssStyle: value })}
                            tabletSpacing={readMoreButtonTabletBorderRadius}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonTabletBorderRadius: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonTabletBorderRadiusCssStyle: value })}
                            mobileSpacing={readMoreButtonMobileBorderRadius}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonMobileBorderRadius: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonMobileBorderRadiusCssStyle: value })}
                            isLinked={readMoreButtonBorderRadiusLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonBorderRadiusLink: value })}
                        />

                        <SwitcherControl
                            label={__("Box Shadow", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonBoxShadowValuesSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonBoxShadowValuesSwitcher: value })}
                        />

                        {readMoreButtonBoxShadowValuesSwitcher === 'normal' && (
                            <BoxShadowSettingsControl
                                label={__("Normal Shadow", "gslider-blocks")}
                                onBoxShadowChange={(value) => setAttributes({ readMoreButtonBoxShadowValues: value })}
                                initialShadowValue={readMoreButtonBoxShadowValues}
                                onBoxShadowStyleChange={(value) => setAttributes({ readMoreButtonBoxShadowCssValue: value })}
                            />
                        )}

                        {readMoreButtonBoxShadowValuesSwitcher === 'hover' && (
                            <BoxShadowSettingsControl
                                label={__("Hover Shadow", "gslider-blocks")}
                                onBoxShadowChange={(value) => setAttributes({ readMoreButtonBoxShadowHoverValues: value })}
                                initialShadowValue={readMoreButtonBoxShadowHoverValues}
                                onBoxShadowStyleChange={(value) => setAttributes({ readMoreButtonBoxShadowHoverCssValue: value })}
                            />
                        )}

                        <ResponsiveSpacingControl
                            label={__("Margin", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonMarginUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonMarginUnits: value })}
                            desktopSpacing={readMoreButtonDesktopMargin}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonDesktopMargin: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonDesktopMarginCssStyle: value })}
                            tabletSpacing={readMoreButtonTabletMargin}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonTabletMargin: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonTabletMarginCssStyle: value })}
                            mobileSpacing={readMoreButtonMobileMargin}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonMobileMargin: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonMobileMarginCssStyle: value })}
                            isLinked={readMoreButtonMarginLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonMarginLink: value })}
                        />

                        <ResponsiveSpacingControl
                            label={__("Padding", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonPaddingUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonPaddingUnits: value })}
                            desktopSpacing={readMoreButtonDesktopPadding}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonDesktopPadding: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonDesktopPaddingCssStyle: value })}
                            tabletSpacing={readMoreButtonTabletPadding}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonTabletPadding: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonTabletPaddingCssStyle: value })}
                            mobileSpacing={readMoreButtonMobilePadding}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonMobilePadding: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonMobilePaddingCssStyle: value })}
                            isLinked={readMoreButtonPaddingLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonPaddingLink: value })}
                        />

                    </PanelBody>

                    <PanelBody
                        title={__("Read More Button Icon", "gslider-blocks")}
                        opened={openPanels.styles === "readMoreButtonIcon"}
                        onToggle={() => togglePanel("styles", "readMoreButtonIcon")}
                    >
                        <ResponsiveRangeControl
                            label={__("Icon Size", "gslider-blocks")}
                            rangeValue={readMoreButtonIconSize}
                            onChangeValue={(value) => setAttributes({ readMoreButtonIconSize: value })}
                            onUnitChange={(value) => setAttributes({ readMoreButtonIconSizeUnits: value })}
                            deviceType={deviceType}
                            units={readMoreButtonIconSizeUnits}
                            resetFallbackValue={{
                                px: "16",
                                "%": "5",
                                vh: "",
                                vw: "",
                                em: "1",
                                rem: "1",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />

                        <Select2Control
                            label={__("Icon Hover Animation", "gslider-blocks")}
                            options={[
                                { label: __("None", "gslider-blocks"), value: "none" },
                                { label: __("Slide Right", "gslider-blocks"), value: "slide-right" },
                                { label: __("Slide Left", "gslider-blocks"), value: "slide-left" },
                                { label: __("Zoom In", "gslider-blocks"), value: "zoom-in" },
                                { label: __("Zoom Out", "gslider-blocks"), value: "zoom-out" },
                            ]}
                            value={readMoreButtonIconHoverAnimation}
                            onChange={(value) => setAttributes({ readMoreButtonIconHoverAnimation: value })}
                        />

                        <ResponsiveRangeControl
                            label={__("Width", "gslider-blocks")}
                            rangeValue={readMoreButtonIconWidth}
                            onChangeValue={(value) => setAttributes({ readMoreButtonIconWidth: value })}
                            onUnitChange={(value) => setAttributes({ readMoreButtonIconWidthUnits: value })}
                            deviceType={deviceType}
                            units={readMoreButtonIconWidthUnits}
                            resetFallbackValue={{
                                px: "46",
                                "%": "5",
                                vh: "",
                                vw: "",
                                em: "2.875",
                                rem: "2.875",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />
                        <ResponsiveRangeControl
                            label={__("Height", "gslider-blocks")}
                            rangeValue={readMoreButtonIconHeight}
                            onChangeValue={(value) => setAttributes({ readMoreButtonIconHeight: value })}
                            onUnitChange={(value) => setAttributes({ readMoreButtonIconHeightUnits: value })}
                            deviceType={deviceType}
                            units={readMoreButtonIconHeightUnits}
                            resetFallbackValue={{
                                px: "16",
                                "%": "5",
                                vh: "",
                                vw: "",
                                em: "1",
                                rem: "1",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />

                        <ResponsiveRangeControl
                            min={0}
                            max={100}
                            label={__("Gap", "gslider-blocks")}
                            rangeValue={readMoreButtonIconGap}
                            onChangeValue={(value) => setAttributes({ readMoreButtonIconGap: value })}
                            onUnitChange={(value) => setAttributes({ readMoreButtonIconGapUnits: value })}
                            deviceType={deviceType}
                            units={readMoreButtonIconGapUnits}
                            resetFallbackValue={{
                                px: "8",
                                em: "0.5",
                                rem: "0.5"
                            }}
                        />

                        <SwitcherControl
                            label={__("Icon Rotation", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonIconRotationSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonIconRotationSwitcher: value })}
                        />

                        {readMoreButtonIconRotationSwitcher === 'normal' && (
                            <ResponsiveRangeControl
                                min={-360}
                                max={360}
                                label={__("Icon Rotation (deg)", "gslider-blocks")}
                                rangeValue={readMoreButtonIconRotation}
                                onChangeValue={(value) => setAttributes({ readMoreButtonIconRotation: value })}
                                deviceType={deviceType}
                                step={1}
                                resetFallbackValue={"0"}
                                isRangeUnit={false}
                            />
                        )}

                        {readMoreButtonIconRotationSwitcher === 'hover' && (
                            <ResponsiveRangeControl
                                min={-360}
                                max={360}
                                label={__("Icon Hover Rotation (deg)", "gslider-blocks")}
                                rangeValue={readMoreButtonIconHoverRotation}
                                onChangeValue={(value) => setAttributes({ readMoreButtonIconHoverRotation: value })}
                                deviceType={deviceType}
                                step={1}
                                resetFallbackValue={"0"}
                                isRangeUnit={false}
                            />
                        )}

                        <SwitcherControl
                            label={__("Icon Color", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonIconColorSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonIconColorSwitcher: value })}
                        />

                        {readMoreButtonIconColorSwitcher === 'normal' && (
                            <ColorControl
                                label={__("Normal Color", "gslider-blocks")}
                                color={readMoreButtonIconColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonIconColor: value })}
                                defaultColor='#333333'
                            />
                        )}

                        {readMoreButtonIconColorSwitcher === 'hover' && (
                            <ColorControl
                                label={__("Hover Color", "gslider-blocks")}
                                color={readMoreButtonIconColorHover}
                                onChangeColor={(value) => setAttributes({ readMoreButtonIconColorHover: value })}
                            />
                        )}

                        <BackgroundControl
                            label={__("Background Color", "gslider-blocks")}

                            normalBackgroundType={readMoreButtonIconNormalBackgroundType}
                            setNormalBackgroundType={(value) => setAttributes({ readMoreButtonIconNormalBackgroundType: value })}
                            normalClassicColor={readMoreButtonIconNormalClassicColor}
                            setNormalClassicColor={(value) => setAttributes({ readMoreButtonIconNormalClassicColor: value })}
                            normalGradientColor={readMoreButtonIconNormalGradientColor}
                            setNormalGradientColor={(value) => setAttributes({ readMoreButtonIconNormalGradientColor: value })}
                            normalCustomGradientSwitcher={readMoreButtonIconNormalCustomGradientSwitcher}
                            setNormalCustomGradientSwitcher={(value) => setAttributes({ readMoreButtonIconNormalCustomGradientSwitcher: value })}
                            normalCustomGradientInputValue={readMoreButtonIconNormalCustomGradientInputValue}
                            setNormalCustomGradientInputValue={(value) => setAttributes({ readMoreButtonIconNormalCustomGradientInputValue: value })}
                            normalClassicDefaultColor={'#d2d2d2c7'}

                            hoverBackgroundType={readMoreButtonIconHoverBackgroundType}
                            setHoverBackgroundType={(value) => setAttributes({ readMoreButtonIconHoverBackgroundType: value })}
                            hoverClassicColor={readMoreButtonIconHoverClassicColor}
                            setHoverClassicColor={(value) => setAttributes({ readMoreButtonIconHoverClassicColor: value })}
                            hoverGradientColor={readMoreButtonIconHoverGradientColor}
                            setHoverGradientColor={(value) => setAttributes({ readMoreButtonIconHoverGradientColor: value })}
                            hoverCustomGradientSwitcher={readMoreButtonIconHoverCustomGradientSwitcher}
                            setHoverCustomGradientSwitcher={(value) => setAttributes({ readMoreButtonIconHoverCustomGradientSwitcher: value })}
                            hoverCustomGradientInputValue={readMoreButtonIconHoverCustomGradientInputValue}
                            setHoverCustomGradientInputValue={(value) => setAttributes({ readMoreButtonIconHoverCustomGradientInputValue: value })}
                            hoverClassicDefaultColor={'#787878b8'}
                            isBackgroundImage={false}
                        />

                        <Select2Control
                            label={__("Border Style", "gslider-blocks")}
                            options={BORDER_STYLES}
                            value={readMoreButtonIconBorder}
                            onChange={(value) => setAttributes({ readMoreButtonIconBorder: value })}
                        />

                        <SwitcherControl
                            label={__("Border Color", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonIconBorderColorSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonIconBorderColorSwitcher: value })}
                        />

                        {readMoreButtonIconBorderColorSwitcher === 'normal' && (
                            <ColorControl
                                label={__("Normal Color", "gslider-blocks")}
                                color={readMoreButtonIconBorderColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonIconBorderColor: value })}
                            />
                        )}

                        {readMoreButtonIconBorderColorSwitcher === 'hover' && (
                            <ColorControl
                                label={__("Hover Color", "gslider-blocks")}
                                color={readMoreButtonIconBorderHoverColor}
                                onChangeColor={(value) => setAttributes({ readMoreButtonIconBorderHoverColor: value })}
                            />
                        )}

                        <ResponsiveSpacingControl
                            label={__("Border Width", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonIconBorderUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonIconBorderUnits: value })}
                            desktopSpacing={readMoreButtonIconDesktopBorder}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonIconDesktopBorder: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonIconDesktopBorderCssStyle: value })}
                            tabletSpacing={readMoreButtonIconTabletBorder}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonIconTabletBorder: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonIconTabletBorderCssStyle: value })}
                            mobileSpacing={readMoreButtonIconMobileBorder}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonIconMobileBorder: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonIconMobileBorderCssStyle: value })}
                            isLinked={readMoreButtonIconBorderLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonIconBorderLink: value })}
                        />

                        <ResponsiveSpacingControl
                            label={__("Border Radius", "gslider-blocks")}
                            deviceType={deviceType}
                            onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                            units={readMoreButtonIconBorderRadiusUnits}
                            onChangeUnits={(value) => setAttributes({ readMoreButtonIconBorderRadiusUnits: value })}
                            desktopSpacing={readMoreButtonIconDesktopBorderRadius}
                            onChangeDesktopSpacing={(value) => setAttributes({ readMoreButtonIconDesktopBorderRadius: value })}
                            desktopSpacingStyle={(value) => setAttributes({ readMoreButtonIconDesktopBorderRadiusCssStyle: value })}
                            tabletSpacing={readMoreButtonIconTabletBorderRadius}
                            onChangeTabletSpacing={(value) => setAttributes({ readMoreButtonIconTabletBorderRadius: value })}
                            tabletSpacingStyle={(value) => setAttributes({ readMoreButtonIconTabletBorderRadiusCssStyle: value })}
                            mobileSpacing={readMoreButtonIconMobileBorderRadius}
                            onChangeMobileSpacing={(value) => setAttributes({ readMoreButtonIconMobileBorderRadius: value })}
                            mobileSpacingStyle={(value) => setAttributes({ readMoreButtonIconMobileBorderRadiusCssStyle: value })}
                            isLinked={readMoreButtonIconBorderRadiusLink}
                            onChangeLink={(value) => setAttributes({ readMoreButtonIconBorderRadiusLink: value })}
                        />

                        <SwitcherControl
                            label={__("Box Shadow", "gslider-blocks")}
                            options={NORMAL_HOVER}
                            value={readMoreButtonIconBoxShadowValuesSwitcher}
                            onChange={(value) => setAttributes({ readMoreButtonIconBoxShadowValuesSwitcher: value })}
                        />

                        {readMoreButtonIconBoxShadowValuesSwitcher === 'normal' && (
                            <BoxShadowSettingsControl
                                label={__("Normal Shadow", "gslider-blocks")}
                                onBoxShadowChange={(value) => setAttributes({ readMoreButtonIconBoxShadowValues: value })}
                                initialShadowValue={readMoreButtonIconBoxShadowValues}
                                onBoxShadowStyleChange={(value) => setAttributes({ readMoreButtonIconBoxShadowCssValue: value })}
                            />
                        )}

                        {readMoreButtonIconBoxShadowValuesSwitcher === 'hover' && (
                            <BoxShadowSettingsControl
                                label={__("Hover Shadow", "gslider-blocks")}
                                onBoxShadowChange={(value) => setAttributes({ readMoreButtonIconBoxShadowHoverValues: value })}
                                initialShadowValue={readMoreButtonIconBoxShadowHoverValues}
                                onBoxShadowStyleChange={(value) => setAttributes({ readMoreButtonIconBoxShadowHoverCssValue: value })}
                            />
                        )}
                    </PanelBody>
                </>
            )}

            {showNavigation?.[deviceType] && (
                <PanelBody
                    title={__("Navigation", "gslider-blocks")}
                    opened={openPanels.styles === "navigation"}
                    onToggle={() => togglePanel("styles", "navigation")}
                >
                    <ResponsiveRangeControl
                        label={__("Icon Size", "gslider-blocks")}
                        rangeValue={navigationArrowSize}
                        onChangeValue={(value) => setAttributes({ navigationArrowSize: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowSizeUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowSizeUnits}
                        resetFallbackValue={{
                            px: "16",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "1",
                            rem: "1",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />

                    <ResponsiveRangeControl
                        label={__("Width", "gslider-blocks")}
                        rangeValue={navigationArrowWidth}
                        onChangeValue={(value) => setAttributes({ navigationArrowWidth: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowWidthUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowWidthUnits}
                        resetFallbackValue={{
                            px: "46",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "2.875",
                            rem: "2.875",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />
                    <ResponsiveRangeControl
                        label={__("Height", "gslider-blocks")}
                        rangeValue={navigationArrowHeight}
                        onChangeValue={(value) => setAttributes({ navigationArrowHeight: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowHeightUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowHeightUnits}
                        resetFallbackValue={{
                            px: "46",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "2.875",
                            rem: "2.875",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />

                    <SwitcherControl
                        label={__("Icon Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowColorSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowColorSwitcher: value })}
                    />

                    {navigationArrowColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={navigationArrowColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowColor: value })}
                            defaultColor='#333333'
                        />
                    )}

                    {navigationArrowColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={navigationArrowColorHover}
                            onChangeColor={(value) => setAttributes({ navigationArrowColorHover: value })}
                        />
                    )}

                    <BackgroundControl
                        label={__("Background Color", "gslider-blocks")}

                        normalBackgroundType={navigationArrowNormalBackgroundType}
                        setNormalBackgroundType={(value) => setAttributes({ navigationArrowNormalBackgroundType: value })}
                        normalClassicColor={navigationArrowNormalClassicColor}
                        setNormalClassicColor={(value) => setAttributes({ navigationArrowNormalClassicColor: value })}
                        normalGradientColor={navigationArrowNormalGradientColor}
                        setNormalGradientColor={(value) => setAttributes({ navigationArrowNormalGradientColor: value })}
                        normalCustomGradientSwitcher={navigationArrowNormalCustomGradientSwitcher}
                        setNormalCustomGradientSwitcher={(value) => setAttributes({ navigationArrowNormalCustomGradientSwitcher: value })}
                        normalCustomGradientInputValue={navigationArrowNormalCustomGradientInputValue}
                        setNormalCustomGradientInputValue={(value) => setAttributes({ navigationArrowNormalCustomGradientInputValue: value })}
                        normalClassicDefaultColor={'#d2d2d2c7'}

                        hoverBackgroundType={navigationArrowHoverBackgroundType}
                        setHoverBackgroundType={(value) => setAttributes({ navigationArrowHoverBackgroundType: value })}
                        hoverClassicColor={navigationArrowHoverClassicColor}
                        setHoverClassicColor={(value) => setAttributes({ navigationArrowHoverClassicColor: value })}
                        hoverGradientColor={navigationArrowHoverGradientColor}
                        setHoverGradientColor={(value) => setAttributes({ navigationArrowHoverGradientColor: value })}
                        hoverCustomGradientSwitcher={navigationArrowHoverCustomGradientSwitcher}
                        setHoverCustomGradientSwitcher={(value) => setAttributes({ navigationArrowHoverCustomGradientSwitcher: value })}
                        hoverCustomGradientInputValue={navigationArrowHoverCustomGradientInputValue}
                        setHoverCustomGradientInputValue={(value) => setAttributes({ navigationArrowHoverCustomGradientInputValue: value })}
                        hoverClassicDefaultColor={'#787878b8'}
                        isBackgroundImage={false}
                    />

                    <Select2Control
                        label={__("Border Style", "gslider-blocks")}
                        options={BORDER_STYLES}
                        value={navigationArrowBorder}
                        onChange={(value) => setAttributes({ navigationArrowBorder: value })}
                    />

                    <SwitcherControl
                        label={__("Border Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowBorderColorSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowBorderColorSwitcher: value })}
                    />

                    {navigationArrowBorderColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={navigationArrowBorderColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowBorderColor: value })}
                        />
                    )}

                    {navigationArrowBorderColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={navigationArrowBorderHoverColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowBorderHoverColor: value })}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Border Width", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={navigationArrowBorderUnits}
                        onChangeUnits={(value) => setAttributes({ navigationArrowBorderUnits: value })}
                        desktopSpacing={navigationArrowDesktopBorder}
                        onChangeDesktopSpacing={(value) => setAttributes({ navigationArrowDesktopBorder: value })}
                        desktopSpacingStyle={(value) => setAttributes({ navigationArrowDesktopBorderCssStyle: value })}
                        tabletSpacing={navigationArrowTabletBorder}
                        onChangeTabletSpacing={(value) => setAttributes({ navigationArrowTabletBorder: value })}
                        tabletSpacingStyle={(value) => setAttributes({ navigationArrowTabletBorderCssStyle: value })}
                        mobileSpacing={navigationArrowMobileBorder}
                        onChangeMobileSpacing={(value) => setAttributes({ navigationArrowMobileBorder: value })}
                        mobileSpacingStyle={(value) => setAttributes({ navigationArrowMobileBorderCssStyle: value })}
                        isLinked={navigationArrowBorderLink}
                        onChangeLink={(value) => setAttributes({ navigationArrowBorderLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Border Radius", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={navigationArrowBorderRadiusUnits}
                        onChangeUnits={(value) => setAttributes({ navigationArrowBorderRadiusUnits: value })}
                        desktopSpacing={navigationArrowDesktopBorderRadius}
                        onChangeDesktopSpacing={(value) => setAttributes({ navigationArrowDesktopBorderRadius: value })}
                        desktopSpacingStyle={(value) => setAttributes({ navigationArrowDesktopBorderRadiusCssStyle: value })}
                        tabletSpacing={navigationArrowTabletBorderRadius}
                        onChangeTabletSpacing={(value) => setAttributes({ navigationArrowTabletBorderRadius: value })}
                        tabletSpacingStyle={(value) => setAttributes({ navigationArrowTabletBorderRadiusCssStyle: value })}
                        mobileSpacing={navigationArrowMobileBorderRadius}
                        onChangeMobileSpacing={(value) => setAttributes({ navigationArrowMobileBorderRadius: value })}
                        mobileSpacingStyle={(value) => setAttributes({ navigationArrowMobileBorderRadiusCssStyle: value })}
                        isLinked={navigationArrowBorderRadiusLink}
                        onChangeLink={(value) => setAttributes({ navigationArrowBorderRadiusLink: value })}
                    />

                    <SwitcherControl
                        label={__("Box Shadow", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowBoxShadowValuesSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowBoxShadowValuesSwitcher: value })}
                    />

                    {navigationArrowBoxShadowValuesSwitcher === 'normal' && (
                        <BoxShadowSettingsControl
                            label={__("Normal Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ navigationArrowBoxShadowValues: value })}
                            initialShadowValue={navigationArrowBoxShadowValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ navigationArrowBoxShadowCssValue: value })}
                        />
                    )}

                    {navigationArrowBoxShadowValuesSwitcher === 'hover' && (
                        <BoxShadowSettingsControl
                            label={__("Hover Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ navigationArrowBoxShadowHoverValues: value })}
                            initialShadowValue={navigationArrowBoxShadowHoverValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ navigationArrowBoxShadowHoverCssValue: value })}
                        />
                    )}

                </PanelBody>
            )}

            {showPagination?.[deviceType] && (
                <PanelBody
                    title={__("Pagination", "gslider-blocks")}
                    opened={openPanels.styles === "pagination"}
                    onToggle={() => togglePanel("styles", "pagination")}
                >

                    {(paginationType === 'bullets' || paginationType === 'fraction') && (
                        <ResponsiveRangeControl
                            label={__("Position", "gslider-blocks")}
                            rangeValue={paginationDotsPosition}
                            onChangeValue={(value) => setAttributes({ paginationDotsPosition: value })}
                            onUnitChange={(value) => setAttributes({ paginationDotsPositionUnits: value })}
                            deviceType={deviceType}
                            units={paginationDotsPositionUnits}
                            resetFallbackValue={""}
                            unitBounds={{
                                px: { min: -200, max: 200, step: 1 },
                            }}
                        />
                    )}

                    {paginationType === 'progressbar' && (
                        <ResponsiveRangeControl
                            label={__("Position", "gslider-blocks")}
                            rangeValue={paginationProgressbarPosition}
                            onChangeValue={(value) => setAttributes({ paginationProgressbarPosition: value })}
                            onUnitChange={(value) => setAttributes({ paginationProgressbarPositionUnits: value })}
                            deviceType={deviceType}
                            units={paginationProgressbarPositionUnits}
                            resetFallbackValue={""}
                            unitBounds={{
                                px: { min: -200, max: 200, step: 1 },
                            }}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Margin", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={paginationDotsMarginUnits}
                        onChangeUnits={(value) => setAttributes({ paginationDotsMarginUnits: value })}
                        desktopSpacing={paginationDotsDesktopMargin}
                        onChangeDesktopSpacing={(value) => setAttributes({ paginationDotsDesktopMargin: value })}
                        desktopSpacingStyle={(value) => setAttributes({ paginationDotsDesktopMarginCssStyle: value })}
                        tabletSpacing={paginationDotsTabletMargin}
                        onChangeTabletSpacing={(value) => setAttributes({ paginationDotsTabletMargin: value })}
                        tabletSpacingStyle={(value) => setAttributes({ paginationDotsTabletMarginCssStyle: value })}
                        mobileSpacing={paginationDotsMobileMargin}
                        onChangeMobileSpacing={(value) => setAttributes({ paginationDotsMobileMargin: value })}
                        mobileSpacingStyle={(value) => setAttributes({ paginationDotsMobileMarginCssStyle: value })}
                        isLinked={paginationDotsMarginLink}
                        onChangeLink={(value) => setAttributes({ paginationDotsMarginLink: value })}
                    />

                    {paginationType === 'bullets' && (
                        <>
                            <SwitcherControl
                                label={__("Bullets Style", "gslider-blocks")}
                                options={NORMAL_ACTIVE}
                                value={paginationDotsSwitcher}
                                onChange={(value) => setAttributes({ paginationDotsSwitcher: value })}
                            />
                            {paginationDotsSwitcher === 'normal' && (
                                <>
                                    <ResponsiveRangeControl
                                        label={__("Width", "gslider-blocks")}
                                        rangeValue={paginationNormalDotsWidth}
                                        onChangeValue={(value) => setAttributes({ paginationNormalDotsWidth: value })}
                                        onUnitChange={(value) => setAttributes({ paginationNormalDotsWidthUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationNormalDotsWidthUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ResponsiveRangeControl
                                        label={__("Height", "gslider-blocks")}
                                        rangeValue={paginationNormalDotsHeight}
                                        onChangeValue={(value) => setAttributes({ paginationNormalDotsHeight: value })}
                                        onUnitChange={(value) => setAttributes({ paginationNormalDotsHeightUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationNormalDotsHeightUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ColorControl
                                        label={__("Color", "gslider-blocks")}
                                        color={paginationNormalDotsBgColor}
                                        onChangeColor={(value) => setAttributes({ paginationNormalDotsBgColor: value })}
                                        defaultColor='#333333'
                                    />

                                    <Select2Control
                                        label={__("Border Style", "gslider-blocks")}
                                        options={BORDER_STYLES}
                                        value={paginationNormalDotsBorder}
                                        onChange={(value) => setAttributes({ paginationNormalDotsBorder: value })}
                                    />

                                    <SwitcherControl
                                        label={__("Border Color", "gslider-blocks")}
                                        options={NORMAL_HOVER}
                                        value={paginationNormalDotsBorderColorSwitcher}
                                        onChange={(value) => setAttributes({ paginationNormalDotsBorderColorSwitcher: value })}
                                    />

                                    {paginationNormalDotsBorderColorSwitcher === 'normal' && (
                                        <ColorControl
                                            label={__("Normal Color", "gslider-blocks")}
                                            color={paginationNormalDotsBorderColor}
                                            onChangeColor={(value) => setAttributes({ paginationNormalDotsBorderColor: value })}
                                        />
                                    )}

                                    {paginationNormalDotsBorderColorSwitcher === 'hover' && (
                                        <ColorControl
                                            label={__("Hover Color", "gslider-blocks")}
                                            color={paginationNormalDotsBorderHoverColor}
                                            onChangeColor={(value) => setAttributes({ paginationNormalDotsBorderHoverColor: value })}
                                        />
                                    )}

                                    <ResponsiveSpacingControl
                                        label={__("Border Width", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationNormalDotsBorderUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationNormalDotsBorderUnits: value })}
                                        desktopSpacing={paginationNormalDotsDesktopBorder}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationNormalDotsDesktopBorder: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationNormalDotsDesktopBorderCssStyle: value })}
                                        tabletSpacing={paginationNormalDotsTabletBorder}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationNormalDotsTabletBorder: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationNormalDotsTabletBorderCssStyle: value })}
                                        mobileSpacing={paginationNormalDotsMobileBorder}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationNormalDotsMobileBorder: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationNormalDotsMobileBorderCssStyle: value })}
                                        isLinked={paginationNormalDotsBorderLink}
                                        onChangeLink={(value) => setAttributes({ paginationNormalDotsBorderLink: value })}
                                    />

                                    <ResponsiveSpacingControl
                                        label={__("Border Radius", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationNormalDotsBorderRadiusUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationNormalDotsBorderRadiusUnits: value })}
                                        desktopSpacing={paginationNormalDotsDesktopBorderRadius}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationNormalDotsDesktopBorderRadius: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationNormalDotsDesktopBorderRadiusCssStyle: value })}
                                        tabletSpacing={paginationNormalDotsTabletBorderRadius}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationNormalDotsTabletBorderRadius: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationNormalDotsTabletBorderRadiusCssStyle: value })}
                                        mobileSpacing={paginationNormalDotsMobileBorderRadius}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationNormalDotsMobileBorderRadius: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationNormalDotsMobileBorderRadiusCssStyle: value })}
                                        isLinked={paginationNormalDotsBorderRadiusLink}
                                        onChangeLink={(value) => setAttributes({ paginationNormalDotsBorderRadiusLink: value })}
                                    />
                                </>
                            )}

                            {paginationDotsSwitcher === 'active' && (
                                <>
                                    <ResponsiveRangeControl
                                        label={__("Width", "gslider-blocks")}
                                        rangeValue={paginationActiveDotsWidth}
                                        onChangeValue={(value) => setAttributes({ paginationActiveDotsWidth: value })}
                                        onUnitChange={(value) => setAttributes({ paginationActiveDotsWidthUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationActiveDotsWidthUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ResponsiveRangeControl
                                        label={__("Height", "gslider-blocks")}
                                        rangeValue={paginationActiveDotsHeight}
                                        onChangeValue={(value) => setAttributes({ paginationActiveDotsHeight: value })}
                                        onUnitChange={(value) => setAttributes({ paginationActiveDotsHeightUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationActiveDotsHeightUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ColorControl
                                        label={__("Color", "gslider-blocks")}
                                        color={paginationActiveDotsBgColor}
                                        onChangeColor={(value) => setAttributes({ paginationActiveDotsBgColor: value })}
                                    />

                                    <Select2Control
                                        label={__("Border Style", "gslider-blocks")}
                                        options={BORDER_STYLES}
                                        value={paginationActiveDotsBorder}
                                        onChange={(value) => setAttributes({ paginationActiveDotsBorder: value })}
                                    />

                                    <SwitcherControl
                                        label={__("Border Color", "gslider-blocks")}
                                        options={NORMAL_HOVER}
                                        value={paginationActiveDotsBorderColorSwitcher}
                                        onChange={(value) => setAttributes({ paginationActiveDotsBorderColorSwitcher: value })}
                                    />

                                    {paginationActiveDotsBorderColorSwitcher === 'normal' && (
                                        <ColorControl
                                            label={__("Normal Color", "gslider-blocks")}
                                            color={paginationActiveDotsBorderColor}
                                            onChangeColor={(value) => setAttributes({ paginationActiveDotsBorderColor: value })}
                                        />
                                    )}

                                    {paginationActiveDotsBorderColorSwitcher === 'hover' && (
                                        <ColorControl
                                            label={__("Hover Color", "gslider-blocks")}
                                            color={paginationActiveDotsBorderHoverColor}
                                            onChangeColor={(value) => setAttributes({ paginationActiveDotsBorderHoverColor: value })}
                                        />
                                    )}

                                    <ResponsiveSpacingControl
                                        label={__("Border Width", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationActiveDotsBorderUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationActiveDotsBorderUnits: value })}
                                        desktopSpacing={paginationActiveDotsDesktopBorder}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationActiveDotsDesktopBorder: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationActiveDotsDesktopBorderCssStyle: value })}
                                        tabletSpacing={paginationActiveDotsTabletBorder}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationActiveDotsTabletBorder: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationActiveDotsTabletBorderCssStyle: value })}
                                        mobileSpacing={paginationActiveDotsMobileBorder}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationActiveDotsMobileBorder: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationActiveDotsMobileBorderCssStyle: value })}
                                        isLinked={paginationActiveDotsBorderLink}
                                        onChangeLink={(value) => setAttributes({ paginationActiveDotsBorderLink: value })}
                                    />

                                    <ResponsiveSpacingControl
                                        label={__("Border Radius", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationActiveDotsBorderRadiusUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationActiveDotsBorderRadiusUnits: value })}
                                        desktopSpacing={paginationActiveDotsDesktopBorderRadius}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationActiveDotsDesktopBorderRadius: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationActiveDotsDesktopBorderRadiusCssStyle: value })}
                                        tabletSpacing={paginationActiveDotsTabletBorderRadius}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationActiveDotsTabletBorderRadius: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationActiveDotsTabletBorderRadiusCssStyle: value })}
                                        mobileSpacing={paginationActiveDotsMobileBorderRadius}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationActiveDotsMobileBorderRadius: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationActiveDotsMobileBorderRadiusCssStyle: value })}
                                        isLinked={paginationActiveDotsBorderRadiusLink}
                                        onChangeLink={(value) => setAttributes({ paginationActiveDotsBorderRadiusLink: value })}
                                    />
                                </>
                            )}
                        </>
                    )}

                    {paginationType === 'fraction' && (
                        <>
                            <ResponsiveTypographyControl
                                fontFamily={paginationFractionFontFamily}
                                onChangeFontFamily={(value) => setAttributes({ paginationFractionFontFamily: value })}

                                fontSize={paginationFractionFontSize}
                                onChangeFontSize={(value) => setAttributes({ paginationFractionFontSize: value })}

                                fontSizeUnits={paginationFractionFontSizeUnits}
                                onChangeFontSizeUnit={(value) => setAttributes({ paginationFractionFontSizeUnits: value })}

                                fontWeight={paginationFractionFontWeight}
                                onChangeFontWeight={(value) => setAttributes({ paginationFractionFontWeight: value })}

                                fontStyle={paginationFractionFontStyle}
                                onChangeFontStyle={(value) => setAttributes({ paginationFractionFontStyle: value })}

                                textTransform={paginationFractionTextTransform}
                                onChangeTextTransform={(value) => setAttributes({ paginationFractionTextTransform: value })}

                                textDecoration={paginationFractionTextDecoration}
                                onChangeTextDecoration={(value) => setAttributes({ paginationFractionTextDecoration: value })}

                                lineHeight={paginationFractionLineHeight}
                                onChangeLineHeight={(value) => setAttributes({ paginationFractionLineHeight: value })}

                                lineHeightUnits={paginationFractionLineHeightUnits}
                                onChangeLineHeightUnit={(value) => setAttributes({ paginationFractionLineHeightUnits: value })}

                                letterSpacing={paginationFractionLetterSpacing}
                                onChangeLetterSpacing={(value) => setAttributes({ paginationFractionLetterSpacing: value })}

                                letterSpacingUnits={paginationFractionLetterSpacingUnits}
                                onChangeLetterSpacingUnit={(value) => setAttributes({ paginationFractionLetterSpacingUnits: value })}

                                wordSpacing={paginationFractionWordSpacing}
                                onChangeWordSpacing={(value) => setAttributes({ paginationFractionWordSpacing: value })}

                                wordSpacingUnits={paginationFractionWordSpacingUnits}
                                onChangeWordSpacingUnit={(value) => setAttributes({ paginationFractionWordSpacingUnits: value })}

                                deviceType={deviceType}
                            />

                            <SwitcherControl
                                label={__("Color", "gslider-blocks")}
                                options={NORMAL_HOVER}
                                value={paginationFractionColorSwitcher}
                                onChange={(value) => setAttributes({ paginationFractionColorSwitcher: value })}
                            />

                            {paginationFractionColorSwitcher === 'normal' && (
                                <ColorControl
                                    label={__("Normal Color", "gslider-blocks")}
                                    color={paginationFractionColor}
                                    onChangeColor={(value) => setAttributes({ paginationFractionColor: value })}
                                    defaultColor=''
                                />
                            )}

                            {paginationFractionColorSwitcher === 'hover' && (
                                <ColorControl
                                    label={__("Hover Color", "gslider-blocks")}
                                    color={paginationFractionColorHover}
                                    onChangeColor={(value) => setAttributes({ paginationFractionColorHover: value })}
                                    defaultColor=''
                                />
                            )}

                        </>
                    )}

                    {paginationType === 'progressbar' && (
                        <>
                            <SwitcherControl
                                label={__("Background Color", "gslider-blocks")}
                                options={NORMAL_ACTIVE}
                                value={paginationProgressbarBGColorSwitcher}
                                onChange={(value) => setAttributes({ paginationProgressbarBGColorSwitcher: value })}
                            />

                            {paginationProgressbarBGColorSwitcher === 'normal' && (
                                <ColorControl
                                    label={__("Normal Color", "gslider-blocks")}
                                    color={paginationProgressbarBGColor}
                                    onChangeColor={(value) => setAttributes({ paginationProgressbarBGColor: value })}
                                    defaultColor=''
                                />
                            )}

                            {paginationProgressbarBGColorSwitcher === 'active' && (
                                <ColorControl
                                    label={__("Active Color", "gslider-blocks")}
                                    color={paginationProgressbarBGActiveColor}
                                    onChangeColor={(value) => setAttributes({ paginationProgressbarBGActiveColor: value })}
                                    defaultColor=''
                                />
                            )}

                            <ResponsiveRangeControl
                                label={__("Height", "gslider-blocks")}
                                rangeValue={paginationProgressbarHeight}
                                onChangeValue={(value) => setAttributes({ paginationProgressbarHeight: value })}
                                onUnitChange={(value) => setAttributes({ paginationProgressbarHeightUnits: value })}
                                deviceType={deviceType}
                                units={paginationProgressbarHeightUnits}
                                resetFallbackValue={{
                                    px: "4",
                                    "%": "",
                                    vh: "",
                                    vw: "",
                                    em: "0.25",
                                    rem: "0.25",
                                }}
                                unitBounds={{
                                    px: { min: 0, max: 200, step: 1 },
                                }}
                            />

                        </>
                    )}

                </PanelBody>
            )}
        </>
    );

    /**
     * Inspector Advanced Controls
     */
    const advancedControls = (
        <>
            <PanelBody
                title={__("Layout", "gslider-blocks")}
                opened={openPanels.advanced === "layout"}
                onToggle={() => togglePanel("advanced", "layout")}
            >
                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalMarginUnits}
                    onChangeUnits={(value) => setAttributes({ globalMarginUnits: value })}
                    desktopSpacing={globalMarginDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalMarginDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalMarginDesktopCssStyle: value })}
                    tabletSpacing={globalMarginTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalMarginTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalMarginTabletCssStyle: value })}
                    mobileSpacing={globalMarginMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalMarginMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalMarginMobileCssStyle: value })}
                    isLinked={globalMarginLink}
                    onChangeLink={(value) => setAttributes({ globalMarginLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ globalPaddingUnits: value })}
                    desktopSpacing={globalPaddingDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalPaddingDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalPaddingDesktopCssStyle: value })}
                    tabletSpacing={globalPaddingTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalPaddingTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalPaddingTabletCssStyle: value })}
                    mobileSpacing={globalPaddingMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalPaddingMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalPaddingMobileCssStyle: value })}
                    isLinked={globalPaddingLink}
                    onChangeLink={(value) => setAttributes({ globalPaddingLink: value })}
                />

                <ResponsiveRangeControl
                    min={-999}
                    max={9999}
                    label={__("Z Index", "gslider-blocks")}
                    rangeValue={globalZIndex}
                    onChangeValue={(value) => setAttributes({ globalZIndex: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={""}
                    isRangeUnit={false}
                />

                <InputControls
                    label={__("CSS ID", "gslider-blocks")}
                    value={globalID}
                    onChangeValue={(value) => setAttributes({ globalID: value })}
                    helpText={__("Add an ID to the block wrapper.", "gslider-blocks")}
                />

                <InputControls
                    label={__("CSS Classes", "gslider-blocks")}
                    value={globalClass}
                    onChangeValue={(value) => setAttributes({ globalClass: value })}
                    helpText={__("Separate with spaces key.", "gslider-blocks")}
                />

            </PanelBody>

            <PanelBody
                title={__("Background", "gslider-blocks")}
                opened={openPanels.advanced === "background"}
                onToggle={() => togglePanel("advanced", "background")}
            >
                <BackgroundControl
                    label={__("Background", "gslider-blocks")}
                    deviceType={deviceType}

                    normalBackgroundType={globalNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ globalNormalBackgroundType: value })}
                    normalClassicColor={globalNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ globalNormalClassicColor: value })}
                    normalGradientColor={globalNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ globalNormalGradientColor: value })}
                    normalCustomGradientSwitcher={globalNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ globalNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={globalNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ globalNormalCustomGradientInputValue: value })}
                    normalBackgroundImageUrl={globalNormalBackgroundImageUrl}
                    setNormalBackgroundImageUrl={(value) => setAttributes({ globalNormalBackgroundImageUrl: value })}
                    normalBackgroundImagePosition={globalNormalBackgroundImagePosition}
                    setNormalBackgroundImagePosition={(value) => setAttributes({ globalNormalBackgroundImagePosition: value })}
                    normalBackgroundImageAttachment={globalNormalBackgroundImageAttachment}
                    setNormalBackgroundImageAttachment={(value) => setAttributes({ globalNormalBackgroundImageAttachment: value })}
                    normalBackgroundImageRepeat={globalNormalBackgroundImageRepeat}
                    setNormalBackgroundImageRepeat={(value) => setAttributes({ globalNormalBackgroundImageRepeat: value })}
                    normalBackgroundImageSize={globalNormalBackgroundImageSize}
                    setNormalBackgroundImageSize={(value) => setAttributes({ globalNormalBackgroundImageSize: value })}

                    hoverBackgroundType={globalHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ globalHoverBackgroundType: value })}
                    hoverClassicColor={globalHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ globalHoverClassicColor: value })}
                    hoverGradientColor={globalHoverGradientColor}
                    setHoverGradientColor={(value) => setAttributes({ globalHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={globalHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ globalHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={globalHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ globalHoverCustomGradientInputValue: value })}
                    hoverBackgroundImageUrl={globalHoverBackgroundImageUrl}
                    setHoverBackgroundImageUrl={(value) => setAttributes({ globalHoverBackgroundImageUrl: value })}
                    hoverBackgroundImagePosition={globalHoverBackgroundImagePosition}
                    setHoverBackgroundImagePosition={(value) => setAttributes({ globalHoverBackgroundImagePosition: value })}
                    hoverBackgroundImageAttachment={globalHoverBackgroundImageAttachment}
                    setHoverBackgroundImageAttachment={(value) => setAttributes({ globalHoverBackgroundImageAttachment: value })}
                    hoverBackgroundImageRepeat={globalHoverBackgroundImageRepeat}
                    setHoverBackgroundImageRepeat={(value) => setAttributes({ globalHoverBackgroundImageRepeat: value })}
                    hoverBackgroundImageSize={globalHoverBackgroundImageSize}
                    setHoverBackgroundImageSize={(value) => setAttributes({ globalHoverBackgroundImageSize: value })}
                    setAttributes={setAttributes}

                />
            </PanelBody>

            <PanelBody
                title={__("Border and Shadow", "gslider-blocks")}
                opened={openPanels.advanced === "border-shadow"}
                onToggle={() => togglePanel("advanced", "border-shadow")}
            >
                <Select2Control
                    label={__("Border Style", "gslider-blocks")}
                    options={BORDER_STYLES}
                    value={globalBorder}
                    onChange={(value) => setAttributes({ globalBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={globalBorderColorSwitcher}
                    onChange={(value) => setAttributes({ globalBorderColorSwitcher: value })}
                />

                {globalBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={globalBorderColor}
                        onChangeColor={(value) => setAttributes({ globalBorderColor: value })}
                    />
                )}

                {globalBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={globalBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ globalBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalBorderUnits}
                    onChangeUnits={(value) => setAttributes({ globalBorderUnits: value })}
                    desktopSpacing={globalBorderDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalBorderDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalBorderDesktopCssStyle: value })}
                    tabletSpacing={globalBorderTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalBorderTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalBorderTabletCssStyle: value })}
                    mobileSpacing={globalBorderMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalBorderMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalBorderMobileCssStyle: value })}
                    isLinked={globalBorderLink}
                    onChangeLink={(value) => setAttributes({ globalBorderLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ globalBorderRadiusUnits: value })}
                    desktopSpacing={globalBorderRadiusDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalBorderRadiusDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalBorderRadiusDesktopCssStyle: value })}
                    tabletSpacing={globalBorderRadiusTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalBorderRadiusTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalBorderRadiusTabletCssStyle: value })}
                    mobileSpacing={globalBorderRadiusMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalBorderRadiusMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalBorderRadiusMobileCssStyle: value })}
                    isLinked={globalBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ globalBorderRadiusLink: value })}
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={globalBoxShadowValuesSwitcher}
                    onChange={(value) => setAttributes({ globalBoxShadowValuesSwitcher: value })}
                />

                {globalBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ globalBoxShadowValues: value })}
                        initialShadowValue={globalBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ globalBoxShadowCssValue: value })}
                    />
                )}

                {globalBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ globalBoxShadowHoverValues: value })}
                        initialShadowValue={globalBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ globalBoxShadowHoverCssValue: value })}
                    />
                )}
            </PanelBody>

            <PanelBody
                title={__("Custom CSS", "gslider-blocks")}
                opened={openPanels.advanced === "custom-css"}
                onToggle={() => togglePanel("advanced", "custom-css")}
            >
                <CustomCSSEditor
                    value={globalCustomCSS}
                    onChangeValue={(value) => setAttributes({ globalCustomCSS: value })}
                />
            </PanelBody>
        </>
    );

    return (
        <>
            <InspectorControl
                generalControls={generalControls}
                styleControls={styleControls}
                advancedControls={advancedControls}
            />
        </>
    );
}

export default memo(Inspector);