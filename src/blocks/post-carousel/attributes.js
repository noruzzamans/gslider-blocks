import { queryAttributes } from '@Components/query-settings-panel/query-attributes';

const attributes = {
    blockId: {
        type: "string",
        default: ""
    },
    deviceType: {
        type: "string",
        default: "Desktop",
    },
    blockStyle: {
        type: "string",
        default: ""
    },

    /** Start Carousel Settings */
    carouselPerColumn: {
        type: "object",
        default: {
            Desktop: 3,
            Tablet: 2,
            Mobile: 1,
        },
    },
    carouselPerColumnGap: {
        type: "object",
        default: {
            Desktop: 10,
            Tablet: 10,
            Mobile: 10,
        },
    },
    speed: {
        type: "object",
        default: {
            Desktop: 800,
            Tablet: 800,
            Mobile: 800,
        },
    },
    autoplay: {
        type: "boolean",
        default: false,
    },
    enableLazyLoad: {
        type: "boolean",
        default: false,
    },
    autoplayDelay: {
        type: "object",
        default: {
            Desktop: 1000,
            Tablet: 1000,
            Mobile: 1000,
        },
    },
    infiniteLoop: {
        type: 'boolean',
        default: true,
    },
    allowTouchMove: {
        type: 'boolean',
        default: true,
    },
    pauseOnHover: {
        type: "boolean",
        default: false
    },
    stopOnLastSlide: {
        type: "boolean",
        default: false
    },
    reverseDirection: {
        type: "boolean",
        default: false
    },
    carouselEffect: {
        type: "string",
        default: "slide"
    },
    mousewheelControl: {
        type: "boolean",
        default: false
    },
    keyboardNavigation: {
        type: 'boolean',
        default: false
    },
    paginationType: {
        type: "string",
        default: "bullets"
    },
    dynamicBullets: {
        type: "boolean",
        default: false,
    },
    /** End Carousel Settings */

    /** Start Show/Hide Elements */
    paginationPositionType: {
        type: "string",
        default: "outside",
    },
    showNavigation: {
        type: "object",
        default: {
            Desktop: true,
            Tablet: true,
            Mobile: true,
        },
    },
    showPagination: {
        type: "object",
        default: {
            Desktop: true,
            Tablet: true,
            Mobile: true,
        },
    },
    /** End Show/Hide Elements */

    /** Layout & Content Setting */
    layoutHeight: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    layoutHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    verticalAlign: {
        type: "object",
        default: {
            Desktop: 'center',
            Tablet: 'center',
            Mobile: 'center',
        }
    },
    /** End Layout & Content Setting */

    /** Content Order */
    contentOrder: {
        type: "array",
        default: [ 'thumbnail', 'categories', 'title', 'excerpt', 'meta', 'readmore' ]
    },
    /** End Content Order */

    /** Query Attributes */
    ...queryAttributes,
    /** End Query Attributes */

    /** Start Navigation Custom Arrows */
    navigationArrowsIconSwitcher: {
        type: "boolean",
        default: false,
    },

    navigationArrowsIconLeftAlign: {
        type: "string",
        default: "icon",
    },

    navigationArrowsIconLeft: {
        type: 'string',
        default: 'arrow-left',
    },

    navigationArrowsIconLeftImageUrl: {
        type: 'string',
        default: '',
    },
    navigationArrowsIconLeftImageAlt: {
        type: 'string',
        default: 'Left Arrow',
    },
    navigationArrowsIconLeftImageID: {
        type: 'string',
        default: '',
    },

    navigationArrowsIconRightAlign: {
        type: "string",
        default: "icon",
    },

    navigationArrowsIconRight: {
        type: 'string',
        default: 'arrow-right',
    },

    navigationArrowsIconRightImageUrl: {
        type: 'string',
        default: '',
    },
    navigationArrowsIconRightImageAlt: {
        type: 'string',
        default: 'Right Arrow',
    },
    navigationArrowsIconRightImageID: {
        type: 'string',
        default: '',
    },
    /** End Navigation Custom Arrows */

    /** Start Navigation Arrow Size */
    navigationArrowSize: {
        type: "object",
        default: {
            Desktop: "16",
            Tablet: "16",
            Mobile: "14",
        },
    },
    navigationArrowSizeUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Navigation Arrow Size */

    /** Start Navigation Arrow Color */
    navigationArrowColorSwitcher: {
        type: "string",
        default: "normal",
    },
    navigationArrowColor: {
        type: "string",
        default: "#333333",
    },
    navigationArrowColorHover: {
        type: "string",
        default: "",
    },
    /** End Navigation Arrow Color */

    /** Start Navigation Arrow Background */
    navigationArrowNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    navigationArrowNormalClassicColor: {
        type: "string",
        default: "#d2d2d2c7",
    },
    navigationArrowNormalGradientColor: {
        type: "string",
        default: null,
    },
    navigationArrowNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    navigationArrowNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    navigationArrowHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    navigationArrowHoverClassicColor: {
        type: "string",
        default: "#787878b8",
    },
    navigationArrowHoverGradientColor: {
        type: "string",
        default: null,
    },
    navigationArrowHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    navigationArrowHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    /** End Navigation Arrow Background */

    /** Start Navigation Arrow Width & Height */
    navigationArrowWidth: {
        type: "object",
        default: {
            Desktop: "46",
            Tablet: "46",
            Mobile: "32",
        },
    },
    navigationArrowWidthUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    navigationArrowHeight: {
        type: "object",
        default: {
            Desktop: "46",
            Tablet: "46",
            Mobile: "32",
        },
    },
    navigationArrowHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Navigation Arrow Width & Height */

    /** Start Navigation Arrow Border */
    navigationArrowBorder: {
        type: "string",
        default: "none",
    },
    navigationArrowBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    navigationArrowBorderColor: {
        type: "string",
        default: "",
    },
    navigationArrowBorderHoverColor: {
        type: "string",
        default: "",
    },
    navigationArrowBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    navigationArrowDesktopBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    navigationArrowDesktopBorderCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowTabletBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    navigationArrowTabletBorderCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowMobileBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    navigationArrowMobileBorderCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowBorderLink: {
        type: "boolean",
        default: true
    },
    /** End Navigation Arrow Border */

    /** Start Navigation Arrow Border Radius */
    navigationArrowBorderRadiusUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    navigationArrowDesktopBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    navigationArrowDesktopBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowTabletBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    navigationArrowTabletBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowMobileBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    navigationArrowMobileBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    navigationArrowBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    /** End Navigation Arrow Border Radius */

    /** Start Navigation Arrow Box Shadow */
    navigationArrowBoxShadowValuesSwitcher: {
        type: "string",
        default: "normal"
    },
    navigationArrowBoxShadowValues: {
        type: "array",
        default: [],
    },
    navigationArrowBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    navigationArrowBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    navigationArrowBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End Navigation Arrow Box Shadow */

    /** Start Navigation Arrow Position */
    navigationArrowPositionType: {
        type: "string",
        default: "inside",
    },

    navigationArrowPosition: {
        type: "string",
        default: "center",
    },
    navigationArrowDirection: {
        type: "string",
        default: "row",
    },
    navigationArrowPositionTopOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionTopOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionLeftOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionLeftOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionRightOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionRightOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionBottomOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionBottomOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowGap: {
        type: "object",
        default: {
            Desktop: "10",
            Tablet: "10",
            Mobile: "10",
        },
    },
    navigationArrowGapUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    navigationArrowPositionOutsidePadding: {
        type: "object",
        default: {
            Desktop: "60",
            Tablet: "60",
            Mobile: "45",
        },
    },
    navigationArrowPositionOutsidePaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Navigation Arrow Position */

    /** Start Pagination Dots Margin */
    paginationDotsMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    paginationDotsDesktopMargin: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationDotsDesktopMarginCssStyle: {
        type: "string",
        default: "",
    },
    paginationDotsTabletMargin: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationDotsTabletMarginCssStyle: {
        type: "string",
        default: "",
    },
    paginationDotsMobileMargin: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationDotsMobileMarginCssStyle: {
        type: "string",
        default: "",
    },
    paginationDotsMarginLink: {
        type: "boolean",
        default: true
    },
    /** End Pagination Dots Margin */

    /** Start Pagination Dots Position */
    paginationDotsPosition: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    paginationDotsPositionUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    paginationProgressbarPosition: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    paginationProgressbarPositionUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    /** End Pagination Dots Position */

    /** Start Pagination Dots Style */
    paginationDotsSwitcher: {
        type: "string",
        default: "normal",
    },
    paginationNormalDotsBgColor: {
        type: "string",
        default: "#333333",
    },
    paginationActiveDotsBgColor: {
        type: "string",
        default: "",
    },
    paginationNormalDotsWidth: {
        type: "object",
        default: {
            Desktop: "8",
            Tablet: "8",
            Mobile: "8",
        },
    },
    paginationNormalDotsWidthUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    paginationNormalDotsHeight: {
        type: "object",
        default: {
            Desktop: "8",
            Tablet: "8",
            Mobile: "8",
        },
    },
    paginationNormalDotsHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Pagination Dots Style */

    /** Start Pagination Dots Border */
    paginationNormalDotsBorder: {
        type: "string",
        default: "none",
    },
    paginationNormalDotsBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    paginationNormalDotsBorderColor: {
        type: "string",
        default: ""
    },
    paginationNormalDotsBorderHoverColor: {
        type: "string",
    },

    paginationNormalDotsBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    paginationNormalDotsDesktopBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationNormalDotsDesktopBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsTabletBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationNormalDotsTabletBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsMobileBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationNormalDotsMobileBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsBorderLink: {
        type: "boolean",
        default: true
    },
    /** End Pagination Dots Border */

    /** Start Pagination Dots Border Radius */
    paginationNormalDotsBorderRadius: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    paginationNormalDotsBorderRadiusUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    paginationNormalDotsDesktopBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    paginationNormalDotsDesktopBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsTabletBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    paginationNormalDotsTabletBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsMobileBorderRadius: {
        type: "object",
        default: {
            top: "50",
            bottom: "50",
            left: "50",
            right: "50",
        },
    },
    paginationNormalDotsMobileBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationNormalDotsBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    /** End Pagination Dots Border Radius */

    /** Start Active Pagination Dots Width & Height */
    paginationActiveDotsWidth: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    paginationActiveDotsWidthUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    paginationActiveDotsHeight: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    paginationActiveDotsHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Active Pagination Dots Width & Height */

    /** Start Active Pagination Dots Border */
    paginationActiveDotsBorder: {
        type: "string",
        default: "none",
    },
    paginationActiveDotsBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    paginationActiveDotsBorderColor: {
        type: "string",
        default: ""
    },
    paginationActiveDotsBorderHoverColor: {
        type: "string",
    },

    paginationActiveDotsBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    paginationActiveDotsDesktopBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsDesktopBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsTabletBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsTabletBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsMobileBorder: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsMobileBorderCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsBorderLink: {
        type: "boolean",
        default: true
    },
    /** End Active Pagination Dots Border */

    /** Start Active Pagination Dots Border Radius */
    paginationActiveDotsBorderRadiusUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    paginationActiveDotsDesktopBorderRadius: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsDesktopBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsTabletBorderRadius: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsTabletBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsMobileBorderRadius: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsMobileBorderRadiusCssStyle: {
        type: "string",
        default: "",
    },
    paginationActiveDotsBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    /** End Active Pagination Dots Border Radius */

    /** Start Fraction Typography */
    paginationFractionFontFamily: {
        type: "string",
        default: "",
    },
    paginationFractionFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionFontWeight: {
        type: "string",
        default: "",
    },
    paginationFractionFontStyle: {
        type: "string",
        default: "",
    },
    paginationFractionTextTransform: {
        type: "string",
        default: "",
    },
    paginationFractionTextDecoration: {
        type: "string",
        default: "",
    },
    paginationFractionLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Fraction Typography */

    /** Start Fraction Color */
    paginationFractionColorSwitcher: {
        type: "string",
        default: "normal",
    },
    paginationFractionColor: {
        type: "string",
        default: "",
    },
    paginationFractionColorHover: {
        type: "string",
        default: "",
    },
    /** End Fraction Color */

    /** Start Progressbar */
    paginationProgressbarBGColorSwitcher: {
        type: 'string',
        default: 'normal',
    },
    paginationProgressbarBGColor: {
        type: 'string',
        default: '',
    },
    paginationProgressbarBGActiveColor: {
        type: 'string',
    },
    paginationProgressbarHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: '',
        },
    },
    paginationProgressbarHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        },
    },
    /** End Progressbar */


    /** Start Global Setting */

    /** Start Global Margin */
    globalMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalMarginDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginDesktopCssStyle: {
        type: "string",
        default: "",
    },
    globalMarginTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginTabletCssStyle: {
        type: "string",
        default: "",
    },
    globalMarginMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginMobileCssStyle: {
        type: "string",
        default: "",
    },
    globalMarginLink: {
        type: "boolean",
        default: true
    },
    /** End Global Margin */

    /** Start Global Padding */
    globalPaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalPaddingDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingDesktopCssStyle: {
        type: "string",
        default: "",
    },
    globalPaddingTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingTabletCssStyle: {
        type: "string",
        default: "",
    },
    globalPaddingMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingMobileCssStyle: {
        type: "string",
        default: "",
    },
    globalPaddingLink: {
        type: "boolean",
        default: true
    },
    /** End Global Padding */

    /** Start Global Z-Index */
    globalZIndex: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalID: {
        type: "string",
        default: "",
    },
    globalClass: {
        type: "string",
        default: "",
    },
    /** End Global Z-Index */

    /** Start Global Background */
    globalNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalNormalClassicColor: {
        type: "string",
        default: "",
    },
    globalNormalGradientColor: {
        type: "string",
        default: null,
    },
    globalNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    globalNormalBackgroundImageUrl: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalNormalBackgroundImagePosition: {
        type: "object",
        default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
        }
    },
    globalNormalBackgroundImageAttachment: {
        type: "object",
        default: {
            Desktop: "scroll",
            Tablet: "scroll",
            Mobile: "scroll"
        }
    },
    globalNormalBackgroundImageRepeat: {
        type: "object",
        default: {
            Desktop: "no-repeat",
            Tablet: "no-repeat",
            Mobile: "no-repeat"
        }
    },
    globalNormalBackgroundImageSize: {
        type: "object",
        default: {
            Desktop: "cover",
            Tablet: "cover",
            Mobile: "cover"
        }
    },

    globalHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalHoverClassicColor: {
        type: "string",
        default: "",
    },
    globalHoverGradientColor: {
        type: "string",
        default: null,
    },
    globalHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    globalHoverBackgroundImageUrl: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalHoverBackgroundImagePosition: {
        type: "object",
        default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
        }
    },
    globalHoverBackgroundImageAttachment: {
        type: "object",
        default: {
            Desktop: "scroll",
            Tablet: "scroll",
            Mobile: "scroll"
        }
    },
    globalHoverBackgroundImageRepeat: {
        type: "object",
        default: {
            Desktop: "no-repeat",
            Tablet: "no-repeat",
            Mobile: "no-repeat"
        }
    },
    globalHoverBackgroundImageSize: {
        type: "object",
        default: {
            Desktop: "cover",
            Tablet: "cover",
            Mobile: "cover"
        }
    },
    /** End Global Background */

    /** Start Global Border */
    globalBorder: {
        type: "string",
        default: "none",
    },
    globalBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    globalBorderColor: {
        type: "string",
    },
    globalBorderHoverColor: {
        type: "string",
    },
    globalBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalBorderDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderDesktopCssStyle: {
        type: "string",
        default: "",
    },
    globalBorderTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderTabletCssStyle: {
        type: "string",
        default: "",
    },
    globalBorderMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderMobileCssStyle: {
        type: "string",
        default: "",
    },
    globalBorderLink: {
        type: "boolean",
        default: true
    },
    globalBorderRadiusUnits: {
        type: 'object',
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalBorderRadiusDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusDesktopCssStyle: {
        type: 'string',
        default: '',
    },
    globalBorderRadiusTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusTabletCssStyle: {
        type: 'string',
        default: '',
    },
    globalBorderRadiusMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusMobileCssStyle: {
        type: "string",
        default: "",
    },
    globalBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    globalBoxShadowValuesSwitcher: {
        type: "string",
        default: "normal"
    },
    globalBoxShadowValues: {
        type: "array",
        default: [],
    },
    globalBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    globalBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    globalBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End Global Border */


    /** Start Global Custom CSS */
    globalCustomCSS: {
        type: "string",
        default: "",
    },
    /** End Global Custom CSS */

    /** Start Image Settings */
    imageMaxWidth: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    imageMaxWidthUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    imageHeight: {
        type: "object",
        default: {
            Desktop: "200",
            Tablet: "",
            Mobile: "",
        },
    },
    imageHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    imageObjectFit: {
        type: "string",
        default: "cover",
    },
    imageObjectPosition: {
        type: "string",
        default: "center",
    },

    /** Start image Padding */
    imagePaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    imagePaddingDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imagePaddingDesktopCssStyle: {
        type: "string",
        default: "",
    },
    imagePaddingTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imagePaddingTabletCssStyle: {
        type: "string",
        default: "",
    },
    imagePaddingMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imagePaddingMobileCssStyle: {
        type: "string",
        default: "",
    },
    imagePaddingLink: {
        type: "boolean",
        default: true
    },
    /** End image Padding */

    /** Start image Margin */
    imageMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    imageMarginDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageMarginDesktopCssStyle: {
        type: "string",
        default: "",
    },
    imageMarginTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageMarginTabletCssStyle: {
        type: "string",
        default: "",
    },
    imageMarginMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageMarginMobileCssStyle: {
        type: "string",
        default: "",
    },
    imageMarginLink: {
        type: "boolean",
        default: true
    },
    /** End image Margin */

    /** Start image Background */
    imageNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    imageNormalClassicColor: {
        type: "string",
        default: "",
    },
    imageNormalGradientColor: {
        type: "string",
        default: null,
    },
    imageNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    imageNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },

    imageHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    imageHoverClassicColor: {
        type: "string",
        default: "",
    },
    imageHoverGradientColor: {
        type: "string",
        default: null,
    },
    imageHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    imageHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    /** End image Background */

    /** Start image Border */
    imageBorder: {
        type: "string",
        default: "none",
    },
    imageBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    imageBorderColor: {
        type: "string",
        default: "",
    },
    imageBorderHoverColor: {
        type: "string",
        default: "",
    },
    imageBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    imageBorderDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderDesktopCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderTabletCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderMobileCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderLink: {
        type: "boolean",
        default: true
    },
    /** End image Border */

    /** Start image Border Radius */
    imageBorderRadiusUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    imageBorderRadiusDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderRadiusDesktopCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderRadiusTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderRadiusTabletCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderRadiusMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    imageBorderRadiusMobileCssStyle: {
        type: "string",
        default: "",
    },
    imageBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    /** End image Border Radius */

    /** Start image Box Shadow */
    imageBoxShadowValuesSwitcher: {
        type: "string",
        default: "normal"
    },
    imageBoxShadowValues: {
        type: "array",
        default: [],
    },
    imageBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    imageBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    imageBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End image Box Shadow */

    /** Start Image Hover Settings */
    imageHoverEffect: {
        type: "string",
        default: "none",
    },
    imageHoverOpacity: {
        type: "object",
        default: {
            Desktop: 0.8,
            Tablet: 0.8,
            Mobile: 0.8,
        },
    },
    imageHoverScale: {
        type: "object",
        default: {
            Desktop: 1.05,
            Tablet: 1.05,
            Mobile: 1.05,
        },
    },
    imageHoverLift: {
        type: "object",
        default: {
            Desktop: 10,
            Tablet: 10,
            Mobile: 10,
        },
    },
    imageHoverLiftUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
        imageTransitionDuration: {
        type: "object",
        default: {
            Desktop: 300,
            Tablet: 300,
            Mobile: 300,
        },
    },
    /** End Image Hover Settings */

    /** Start Post Title Alignment & Heading Tag */
    postTitleAlign: {
        type: "object",
        default: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
        },
    },
    postTitleHtmlTag: {
        type: "string",
        default: "h3",
    },

    /** Start Post Title Typography */
    postTitleFontFamily: {
        type: "string",
        default: "",
    },
    postTitleFontSize: {
        type: 'object',
        default: {
            Desktop: '18',
            Tablet: '18',
            Mobile: '18'
        }
    },
    postTitleFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postTitleFontWeight: {
        type: "string",
        default: "600",
    },
    postTitleFontStyle: {
        type: "string",
        default: "",
    },
    postTitleTextTransform: {
        type: "string",
        default: "",
    },
    postTitleTextDecoration: {
        type: "string",
        default: "",
    },
    postTitleLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postTitleLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postTitleLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postTitleLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postTitleWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    postTitleWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Post Title Typography */

    /** Start Post Title Color */
    postTitleColorSwitcher: {
        type: "string",
        default: "normal",
    },
    postTitleColor: {
        type: "string",
        default: "",
    },
    postTitleColorHover: {
        type: "string",
        default: "",
    },
    /** End Post Title Color */

    /** Start Post Title Margin */
    postTitleMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postTitleDesktopMargin: {
        type: "object", 
        default: {
            top: "0",
            bottom: "8",
            left: "0",
            right: "0",
        },
    },
    postTitleDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postTitleTabletMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postTitleTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postTitleMobileMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postTitleMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postTitleMarginLink : {
        type : "boolean",
        default: true
    },
    /** End Post Title Margin */

    /** Start Post Title Padding */
    postTitlePaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postTitleDesktopPadding: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postTitleDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postTitleTabletPadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postTitleTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postTitleMobilePadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postTitleMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postTitlePaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Post Title Padding */

    /** Start Post Excerpt Styling */
    postExcerptAlign: {
        type: "object",
        default: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
        },
    },
    postExcerptHtmlTag: {
        type: "string",
        default: "p",
    },

    /** Start Post Excerpt Typography */
    postExcerptFontFamily: {
        type: "string",
        default: "",
    },
    postExcerptFontSize: {
        type: 'object',
        default: {
            Desktop: '16',
            Tablet: '16',
            Mobile: '16'
        }
    },
    postExcerptFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postExcerptFontWeight: {
        type: "string",
        default: "",
    },
    postExcerptFontStyle: {
        type: "string",
        default: "",
    },
    postExcerptTextTransform: {
        type: "string",
        default: "",
    },
    postExcerptTextDecoration: {
        type: "string",
        default: "",
    },
    postExcerptLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postExcerptLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postExcerptLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postExcerptLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postExcerptWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    postExcerptWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Post Excerpt Typography */

    /** Start Post Excerpt Color */
    postExcerptColorSwitcher: {
        type: "string",
        default: "normal",
    },
    postExcerptColor: {
        type: "string",
        default: "",
    },
    postExcerptColorHover: {
        type: "string",
        default: "",
    },
    /** End Post Excerpt Color */

    /** Start Post Excerpt Margin */
    postExcerptMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postExcerptDesktopMargin: {
        type: "object", 
        default: {
            top: "0",
            bottom: "12",
            left: "0",
            right: "0",
        },
    },
    postExcerptDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptTabletMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postExcerptTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptMobileMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postExcerptMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptMarginLink : {
        type : "boolean",
        default: true
    },
    /** End Post Excerpt Margin */

    /** Start Post Excerpt Padding */
    postExcerptPaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postExcerptDesktopPadding: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postExcerptDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptTabletPadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postExcerptTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptMobilePadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postExcerptMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postExcerptPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Post Excerpt Padding */
    /** End Post Excerpt Styling */

    /** Start Post Category Styling */

    /** Start Post Category Alignment */
    postCategoryAlign: {
        type: "object",
        default: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
        },
    },

    /** Start Post Category Typography */
    postCategoryFontFamily: {
        type: "string",
        default: "",
    },
    postCategoryFontSize: {
        type: 'object',
        default: {
            Desktop: '13',
            Tablet: '13',
            Mobile: '13'
        }
    },
    postCategoryFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postCategoryFontWeight: {
        type: "string",
        default: "",
    },
    postCategoryFontStyle: {
        type: "string",
        default: "",
    },
    postCategoryTextTransform: {
        type: "string",
        default: "",
    },
    postCategoryTextDecoration: {
        type: "string",
        default: "",
    },
    postCategoryLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postCategoryLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postCategoryLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    postCategoryLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    postCategoryWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    postCategoryWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Post Category Typography */

    /** Start Post Category Color */
    postCategoryColorSwitcher: {
        type: "string",
        default: "normal",
    },
    postCategoryColor: {
        type: "string",
        default: "",
    },
    postCategoryColorHover: {
        type: "string",
        default: "",
    },
    /** End Post Category Color */

    /** Start Post Category Background */
    postCategoryNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    postCategoryNormalClassicColor: {
        type: "string",
        default: "",
    },
    postCategoryNormalGradientColor: {
        type: "string",
        default: null,
    },
    postCategoryNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    postCategoryNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },

    postCategoryHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    postCategoryHoverClassicColor: {
        type: "string",
        default: "",
    },
    postCategoryHoverGradientColor: {
        type: "string",
        default: null,
    },
    postCategoryHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    postCategoryHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    /** End Post Category Background */

    /** Start Post Category Border */
    postCategoryBorder: {
        type: "string",
        default: "none",
    },
    postCategoryBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    postCategoryBorderColor: {
        type: "string",
        default: "",
    },
    postCategoryBorderHoverColor: {
        type: "string",
        default: "",
    },
    postCategoryBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    postCategoryBorderDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderDesktopCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderTabletCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderMobileCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderLink: {
        type: "boolean",
        default: true
    },
    /** End Post Category Border */

    /** Start Post Category Border Radius */
    postCategoryBorderRadiusUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    postCategoryBorderRadiusDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderRadiusDesktopCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderRadiusTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderRadiusTabletCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderRadiusMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryBorderRadiusMobileCssStyle: {
        type: "string",
        default: "",
    },
    postCategoryBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    /** End Post Category Border Radius */

    /** Start Post Category Box Shadow */
    postCategoryBoxShadowValuesSwitcher: {
        type: "string",
        default: "normal"
    },
    postCategoryBoxShadowValues: {
        type: "array",
        default: [],
    },
    postCategoryBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    postCategoryBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    postCategoryBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End Post Category Box Shadow */

    /** Start Post Category Gap */
    postCategoryGap: {
        type: "object",
        default: {
            Desktop: "5",
            Tablet: "5",
            Mobile: "5"
        }
    },
    postCategoryGapUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    /** End Post Category Gap */

    /** Start Post Category Spacing (Margin & Padding) */
    postCategoryMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postCategoryDesktopMargin: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryTabletMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryMobileMargin: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryMarginLink : {
        type : "boolean",
        default: true
    },

    postCategoryPaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postCategoryDesktopPadding: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryTabletPadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryMobilePadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Post Category Spacing */

    /** Start Post Category Item Padding */
    postCategoryItemPaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    postCategoryItemDesktopPadding: {
        type: "object", 
        default: {
            top: "4",
            bottom: "4",
            left: "8",
            right: "8",
        },
    },
    postCategoryItemDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryItemTabletPadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryItemTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryItemMobilePadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    postCategoryItemMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
    postCategoryItemPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Post Category Item Padding */
    /** End Post Category Styling */
};

export default attributes;