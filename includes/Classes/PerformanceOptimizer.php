<?php
/**
 * Performance Optimizer for GSlider Blocks.
 *
 * Implements server-side performance improvements including preloading
 * LCP images, adding fetchpriority="high", recovering image dimensions,
 * deferring scripts, and preventing layout shifts.
 *
 * @package GSlider\Classes
 * @since   1.2.0
 */

namespace GSlider\Classes;

use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'PerformanceOptimizer' ) ) {

    /**
     * Handles core performance optimization routines.
     *
     * @since 1.2.0
     */
    class PerformanceOptimizer {

        use SingletonTrait;

        /**
         * Registers performance optimization hooks.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function register() {
            add_action( 'wp', [ $this, 'pre_parse_gslider_lcp_preload' ] );
            add_filter( 'render_block', [ $this, 'optimize_gslider_images' ], 11, 2 );
            add_filter( 'script_loader_tag', [ $this, 'defer_gslider_scripts' ], 10, 2 );
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_preinit_styles' ], 15 );
        }

        /**
         * Checks if the Performance Mode optimization is active.
         *
         * Can be disabled via the GSLIDER_DISABLE_PERFORMANCE_MODE constant
         * or the gslider_enable_performance_mode filter.
         *
         * @since 1.2.0
         *
         * @return bool True if active, false otherwise.
         */
        public static function is_performance_mode_active() {
            if ( defined( 'GSLIDER_DISABLE_PERFORMANCE_MODE' ) && GSLIDER_DISABLE_PERFORMANCE_MODE ) {
                return false;
            }
            // Check database option (defaults to true if not set)
            $db_option = get_option( 'gslider_performance_mode', true );
            if ( ! $db_option || '0' === $db_option || 'false' === $db_option || 'no' === $db_option ) {
                return false;
            }
            return (bool) apply_filters( 'gslider_enable_performance_mode', true );
        }

        /**
         * Pre-parses post content to extract the first GSlider image and inject a preload link in <head>.
         *
         * Runs on the 'wp' action hook before headers are sent.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function pre_parse_gslider_lcp_preload() {
            if ( ! self::is_performance_mode_active() || ! is_singular() ) {
                return;
            }

            $post = get_post();
            if ( ! $post || ! has_block( 'gslider-blocks/', $post->post_content ) ) {
                return;
            }

            $blocks = parse_blocks( $post->post_content );
            foreach ( $blocks as $block ) {
                if ( isset( $block['blockName'] ) && str_contains( $block['blockName'], 'gslider-blocks/' ) ) {
                    $image_url = '';
                    
                    if ( $block['blockName'] === 'gslider-blocks/image-slider' && ! empty( $block['attrs']['images'][0]['url'] ) ) {
                        $image_url = $block['attrs']['images'][0]['url'];
                    } elseif ( $block['blockName'] === 'gslider-blocks/logo-carousel' && ! empty( $block['attrs']['logos'][0]['url'] ) ) {
                        $image_url = $block['attrs']['logos'][0]['url'];
                    }

                    if ( $image_url ) {
                        add_action( 'wp_head', function() use ( $image_url ) {
                            echo '<link rel="preload" href="' . esc_url( $image_url ) . '" as="image" fetchpriority="high">' . "\n";
                        }, 1 );
                    }
                    break; // Only preload the first GSlider block on the page
                }
            }
        }

        /**
         * Dynamically optimizes block image tags during rendering.
         *
         * - Injects missing width/height attributes using WordPress attachment metadata.
         * - Adds fetchpriority="high" and removes loading="lazy" for the first image on the page.
         *
         * @since 1.2.0
         *
         * @param string $block_content The block HTML content.
         * @param array  $block         The block properties and attributes.
         * @return string The optimized block HTML.
         */
        public function optimize_gslider_images( $block_content, $block ) {
            if ( ! self::is_performance_mode_active() ) {
                return $block_content;
            }

            if ( ! is_array( $block ) || empty( $block['blockName'] ) || ! str_contains( $block['blockName'], 'gslider-blocks/' ) ) {
                return $block_content;
            }

            $block_images = [];
            if ( isset( $block['attrs']['images'] ) && is_array( $block['attrs']['images'] ) ) {
                $block_images = $block['attrs']['images'];
            } elseif ( isset( $block['attrs']['logos'] ) && is_array( $block['attrs']['logos'] ) ) {
                $block_images = $block['attrs']['logos'];
            }

            global $gslider_first_image_optimized;
            if ( ! isset( $gslider_first_image_optimized ) ) {
                $gslider_first_image_optimized = false;
            }

            $pattern = '/<img([^>]+)>/i';
            $optimized_content = preg_replace_callback( $pattern, function( $matches ) use ( $block_images, &$gslider_first_image_optimized ) {
                $img_tag = $matches[0];
                $attrs_str = $matches[1];

                if ( preg_match( '/src=["\']([^"\']+)["\']/i', $attrs_str, $src_match ) ) {
                    $src = $src_match[1];
                    
                    // Match the source URL against the block attributes to discover the image attachment ID
                    $image_id = 0;
                    foreach ( $block_images as $img ) {
                        if ( isset( $img['url'] ) && ( $img['url'] === $src || basename( $img['url'] ) === basename( $src ) ) ) {
                            $image_id = isset( $img['id'] ) ? intval( $img['id'] ) : 0;
                            break;
                        }
                    }

                    // Query and inject image dimensions if missing in HTML
                    if ( $image_id > 0 && ! preg_match( '/width=/i', $attrs_str ) && ! preg_match( '/height=/i', $attrs_str ) ) {
                        $meta = wp_get_attachment_image_src( $image_id, 'full' );
                        if ( $meta ) {
                            $width = $meta[1];
                            $height = $meta[2];
                            $img_tag = str_replace( '<img', '<img width="' . esc_attr( $width ) . '" height="' . esc_attr( $height ) . '"', $img_tag );
                        }
                    }
                }

                // If this is the first slide image on the page, set fetchpriority and loading properties
                if ( ! $gslider_first_image_optimized ) {
                    $gslider_first_image_optimized = true;
                    
                    if ( ! preg_match( '/fetchpriority=/i', $img_tag ) ) {
                        $img_tag = str_replace( '<img', '<img fetchpriority="high"', $img_tag );
                    } else {
                        $img_tag = preg_replace( '/fetchpriority=["\'][^"\']+["\']/i', 'fetchpriority="high"', $img_tag );
                    }

                    if ( preg_match( '/loading=["\']lazy["\']/i', $img_tag ) ) {
                        $img_tag = preg_replace( '/loading=["\']lazy["\']/i', 'loading="eager"', $img_tag );
                    }
                }

                return $img_tag;
            }, $block_content );

            return $optimized_content;
        }

        /**
         * Appends the 'defer' attribute to all GSlider frontend scripts.
         *
         * @since 1.2.0
         *
         * @param string $tag    The <script> tag HTML.
         * @param string $handle The script register handle.
         * @return string The modified <script> tag.
         */
        public function defer_gslider_scripts( $tag, $handle ) {
            if ( ! self::is_performance_mode_active() ) {
                return $tag;
            }

            if ( str_contains( $handle, 'gslider-blocks-' ) ) {
                if ( ! str_contains( $tag, ' defer' ) ) {
                    $tag = str_replace( ' src', ' defer src', $tag );
                }
            }
            return $tag;
        }

        /**
         * Enqueues pre-initialization CSS to reserve slide dimensions and prevent vertical stacking.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function enqueue_preinit_styles() {
            if ( ! self::is_performance_mode_active() ) {
                return;
            }

            $preinit_css = "
                .swiper:not(.swiper-initialized) .swiper-wrapper {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    overflow: hidden !important;
                }
                .swiper:not(.swiper-initialized) .swiper-slide {
                    flex: 0 0 auto !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    transition: none !important;
                }
                .swiper:not(.swiper-initialized) .swiper-slide:not(:first-child) {
                    display: none !important;
                }
            ";
            wp_add_inline_style( 'gslider-blocks-swiper-style', $preinit_css );
        }
    }
}
