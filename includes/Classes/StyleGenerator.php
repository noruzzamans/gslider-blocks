<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering and generates
 * minified per-page CSS files in the uploads directory.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'StyleGenerator' ) ) {

    /**
     * Generates and manages dynamic CSS files for GSlider blocks.
     *
     * Collects inline styles from rendered blocks, combines them
     * into a single minified CSS file per page, and enqueues it.
     *
     * @since 1.0.0
     */
    class StyleGenerator implements Registrable {

        use SingletonTrait;

        /**
         * Subdirectory path for CSS files within the uploads folder.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private const CSS_SUBDIR = '/gslider-blocks/css';

        /**
         * File permissions for generated CSS files.
         *
         * @since 1.0.0
         *
         * @var int
         */
        private const FILE_PERMISSIONS = 0644;

        /**
         * Collected block styles keyed by block ID.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $styles = [];

        /**
         * Absolute path to the CSS output directory.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private $css_dir;

        /**
         * URL to the CSS output directory.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private $css_url;

        /**
         * Initializes the style generator and sets up directories.
         *
         * @since 1.0.0
         */
        private function __construct() {
            $this->setup_directories();
        }

        /**
         * Registers hooks for style collection and generation.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_dynamic_styles' ], 10, 2 );
            add_action( 'wp_footer', [ $this, 'output_collected_styles' ], 20 );
        }

        /**
         * Sets up the CSS output directory paths.
         *
         * Creates the CSS directory inside wp-content/uploads
         * if it does not already exist.
         *
         * @since 1.0.0
         *
         * @return void
         */
        private function setup_directories() {
            $upload_dir    = wp_upload_dir();
            $this->css_dir = $upload_dir['basedir'] . self::CSS_SUBDIR;
            $this->css_url = $upload_dir['baseurl'] . self::CSS_SUBDIR;

            if ( ! file_exists( $this->css_dir ) ) {
                if ( ! wp_mkdir_p( $this->css_dir ) ) {
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                        error_log( 'GSlider Blocks: Failed to create CSS directory at: ' . $this->css_dir );
                    }
                }
            }
        }

        /**
         * Collects dynamic styles from rendered GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block
         * during rendering and stores it keyed by block ID.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The unmodified block content.
         */
        public function collect_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            if ( false === strpos( $block['blockName'], 'gslider-blocks/' ) || ! isset( $block['attrs']['blockStyle'] ) ) {
                return $block_content;
            }

            $style = $block['attrs']['blockStyle'];
            if ( ! is_string( $style ) || '' === $style ) {
                return $block_content;
            }

            $block_id = isset( $block['attrs']['blockId'] ) ?
                sanitize_key( $block['attrs']['blockId'] ) :
                'gslider-blocks-' . md5( serialize( $block['attrs'] ) );
            self::$styles[ $block_id ] = $style;

            return $block_content;
        }

        /**
         * Generates a minified CSS file from collected styles.
         *
         * Combines all collected block styles into a single CSS file
         * per page using WP_Filesystem. Skips writing if content
         * has not changed.
         *
         * @since 1.0.0
         *
         * @global WP_Filesystem_Base $wp_filesystem WordPress filesystem abstraction.
         *
         * @return void
         */
        public function output_collected_styles(): void {
            if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || empty( self::$styles ) ) {
                return;
            }

            $raw = '';
            foreach ( self::$styles as $style ) {
                if ( is_string( $style ) && '' !== $style ) {
                    $raw .= $style;
                }
            }

            $minified = $this->minify_css( $raw );
            if ( '' === $minified ) {
                return;
            }

            $identity = $this->queried_style_identity();
            if ( 0 !== $identity['id'] ) {
                $this->write_css_if_changed( $identity, $minified );
            }

            $this->print_style_tag( $minified );
        }

        /**
         * Writes the minified CSS when its body differs from the stored file.
         *
         * The compared bytes do not include a clock, so an unchanged page
         * does not rewrite the file or move filemtime.
         *
         * @since 1.0.0
         *
         * @param array  $identity Query type and numeric ID.
         * @param string $minified Minified CSS body.
         * @return void
         */
        private function write_css_if_changed( array $identity, string $minified ): void {
            clearstatcache();
            $css_file = $this->css_dir . '/' . $this->css_filename( $identity );

            if ( ! function_exists( 'WP_Filesystem' ) ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            global $wp_filesystem;
            if ( empty( $wp_filesystem ) ) {
                WP_Filesystem();
            }

            if ( ! is_dir( $this->css_dir ) && ! wp_mkdir_p( $this->css_dir ) ) {
                return;
            }

            if ( file_exists( $css_file ) ) {
                $existing = $wp_filesystem->get_contents( $css_file );
                if ( is_string( $existing ) && $this->css_body( $existing ) === $minified ) {
                    return;
                }
            }

            $comment = '/* GSlider Blocks Dynamic Styles - ' . $identity['type'] . ' ' . $identity['id'] . ' */';
            $wp_filesystem->put_contents( $css_file, $comment . "\n" . $minified, self::FILE_PERMISSIONS );
        }

        /**
         * Prints this request's CSS after blocks have rendered.
         *
         * @since 1.0.0
         *
         * @param string $minified Minified CSS body.
         * @return void
         */
        private function print_style_tag( string $minified ): void {
            echo '<style id="gslider-blocks-dynamic-styles">' . $minified . '</style>';
        }

        /**
         * Builds a filename that cannot collide across query types.
         *
         * @since 1.0.0
         *
         * @param array $identity Query type and numeric ID.
         * @return string CSS filename.
         */
        private function css_filename( array $identity ): string {
            return 'gslider-blocks-dynamic-styles-' . $identity['type'] . '-' . $identity['id'] . '.min.css';
        }

        /**
         * Identifies the current query so post 12 and term 12 stay distinct.
         *
         * @since 1.0.0
         *
         * @return array{type: string, id: int}
         */
        private function queried_style_identity(): array {
            $id     = function_exists( 'get_queried_object_id' ) ? (int) get_queried_object_id() : 0;
            $object = function_exists( 'get_queried_object' ) ? get_queried_object() : null;
            $type   = 'query';

            if ( $object instanceof \WP_Post ) {
                $type = 'post';
            } elseif ( $object instanceof \WP_Term ) {
                $type = 'term';
            } elseif ( $object instanceof \WP_User ) {
                $type = 'user';
            } elseif ( $object instanceof \WP_Post_Type ) {
                $type = 'post-type';
            }

            return [
                'type' => $type,
                'id'   => $id,
            ];
        }

        /**
         * Returns stored CSS without the leading comment used as a label.
         *
         * @since 1.0.0
         *
         * @param string $css File contents.
         * @return string CSS body used for equality.
         */
        private function css_body( string $css ): string {
            $stripped = preg_replace( '/^\/\*.*?\*\/\s*/s', '', $css, 1 );
            return is_string( $stripped ) ? $stripped : $css;
        }

        /**
         * Minifies a CSS string.
         *
         * Removes comments, unnecessary whitespace, and trailing
         * semicolons before closing braces.
         *
         * @since 1.0.0
         *
         * @param string $css The raw CSS string to minify.
         * @return string The minified CSS string.
         */
        private function minify_css( $css ) {
            if ( empty( $css ) ) {
                return '';
            }

            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
            $css = preg_replace( '/\s*([:,;{}])\s*/', '$1', $css );
            $css = preg_replace( '/;}/', '}', $css );

            return trim( $css );
        }
    }
}

