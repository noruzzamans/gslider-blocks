<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering, applies strict CSS sanitization
 * to prevent arbitrary CSS injection, enforces block-level scoping, and
 * outputs safe scoped styles inline.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;
use GSlider\Utils\CssSanitizer;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( StyleGenerator::class, false ) ) {

    /**
     * Generates and manages safe dynamic CSS for GSlider blocks.
     *
     * Collects styles from rendered blocks, sanitizes them to ensure
     * all rules are scoped to the block ID and free of arbitrary code,
     * and injects them via WordPress core inline style APIs.
     *
     * @since 1.0.0
     */
    class StyleGenerator implements Registrable {

        use SingletonTrait;

        /**
         * Collected and sanitized block styles keyed by block ID.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $styles = [];

        /**
         * Track block IDs whose style tags have already been rendered on the current request.
         *
         * Prevents duplicate <style> tags for the same block ID (e.g. in query loops or synced patterns).
         *
         * @since 1.2.1
         *
         * @var array<string, bool>
         */
        private static $printed = [];

        /**
         * Track whether the LCP image priority has been applied to the first slide on the page.
         *
         * @since 1.2.1
         *
         * @var bool
         */
        private static $lcp_optimized = false;

        /**
         * Registers hooks for style collection, sanitization, and rendering.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_and_render_dynamic_styles' ], 10, 2 );
            add_action( 'wp_footer', [ $this, 'print_footer_styles' ], 20 );
            add_action( 'wp_enqueue_scripts', [ $this, 'register_style_handle' ], 20 );
        }

        /**
         * Registers the dynamic style handle for WordPress enqueue system.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function register_style_handle(): void {
            if ( ! wp_style_is( 'gslider-blocks-dynamic-styles', 'registered' ) ) {
                wp_register_style( 'gslider-blocks-dynamic-styles', false, [], GSLIDER_VERSION );
                wp_enqueue_style( 'gslider-blocks-dynamic-styles' );
            }
        }

        /**
         * Collects, sanitizes, and renders dynamic styles for GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block,
         * strictly validates that all CSS rules are scoped to the block ID,
         * strips dangerous properties/protocols, and injects safe scoped CSS.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_and_render_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            // Exclude styles and optimizations from RSS feeds to prevent feed validation errors.
            if ( function_exists( 'is_feed' ) && is_feed() ) {
                return $block_content;
            }

            if ( false !== strpos( $block['blockName'], 'gslider-blocks/' ) ) {
                // Apply LCP image priority to the first slide image on the page (frontend only).
                $block_content = $this->optimize_lcp_image( $block_content );

                // Ensure explicit width and height attributes on slide images to eliminate CLS (#391).
                $block_content = $this->ensure_image_dimensions( $block_content, $block );

                if ( ! empty( $block['attrs']['blockStyle'] ) ) {
                    $block_id = isset( $block['attrs']['blockId'] ) ?
                        sanitize_key( $block['attrs']['blockId'] ) :
                        'gslider-blocks-' . md5( serialize( $block['attrs'] ) );

                    $raw_style = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';

                    // Strictly sanitize CSS to prevent arbitrary CSS injection.
                    $clean_style = $this->sanitize_css( $raw_style, $block_id );

                    if ( ! empty( $clean_style ) ) {
                        self::$styles[ $block_id ] = $clean_style;

                        // Check if external file caching is enabled (#314).
                        if ( $this->is_file_cache_enabled() ) {
                            $enqueued = $this->enqueue_dynamic_css_file( $block_id, $clean_style );
                            if ( $enqueued ) {
                                return $block_content;
                            }
                        }

                        // Deduplicate: only render the inline <style> tag once per unique block ID per request.
                        if ( empty( self::$printed[ $block_id ] ) ) {
                            self::$printed[ $block_id ] = true;
                            $nonce      = $this->get_csp_nonce();
                            $nonce_attr = ! empty( $nonce ) ? ' nonce="' . esc_attr( $nonce ) . '"' : '';
                            $style_tag  = '<style id="gslider-style-' . esc_attr( $block_id ) . '"' . $nonce_attr . '>' . $clean_style . '</style>';
                            return $style_tag . $block_content;
                        }
                    }
                }
            }

            return $block_content;
        }

        /**
         * Prioritizes the first slide image of the first GSlider block on the page for LCP.
         *
         * Injects fetchpriority="high", removes loading="lazy" (sets loading="eager"),
         * and ensures decoding="async" on the first <img> tag of the first slider.
         *
         * @since 1.2.1
         *
         * @param string $block_content The block HTML content.
         * @return string Optimized block HTML content.
         */
        public function optimize_lcp_image( string $block_content ): string {
            if ( self::$lcp_optimized || empty( $block_content ) ) {
                return $block_content;
            }

            // Only run on frontend page loads (skip admin, REST requests, and feeds).
            if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || ( function_exists( 'wp_is_json_request' ) && wp_is_json_request() ) ) {
                return $block_content;
            }

            // Find the first <img> tag in the slider block content.
            if ( preg_match( '/<img\b([^>]*)>/i', $block_content, $matches, PREG_OFFSET_CAPTURE ) ) {
                $full_img_tag = $matches[0][0];
                $attributes   = $matches[1][0];
                $offset       = $matches[0][1];

                $is_self_closing = '/' === substr( trim( $attributes ), -1 );
                $new_attributes  = rtrim( $attributes, " /\t\n\r\0\x0B" );

                // 1. Ensure loading="eager" instead of loading="lazy".
                if ( preg_match( '/\bloading\s*=\s*["\']lazy["\']/i', $new_attributes ) ) {
                    $new_attributes = preg_replace( '/\bloading\s*=\s*["\']lazy["\']/i', 'loading="eager"', $new_attributes );
                } elseif ( ! preg_match( '/\bloading\s*=/i', $new_attributes ) ) {
                    $new_attributes .= ' loading="eager"';
                }

                // 2. Ensure fetchpriority="high".
                if ( ! preg_match( '/\bfetchpriority\s*=/i', $new_attributes ) ) {
                    $new_attributes .= ' fetchpriority="high"';
                }

                // 3. Ensure decoding="async".
                if ( ! preg_match( '/\bdecoding\s*=/i', $new_attributes ) ) {
                    $new_attributes .= ' decoding="async"';
                }

                $new_img_tag = '<img' . $new_attributes . ( $is_self_closing ? ' />' : '>' );

                // Replace only the first occurrence.
                $block_content = substr_replace( $block_content, $new_img_tag, $offset, strlen( $full_img_tag ) );
                self::$lcp_optimized = true;
            }

            return $block_content;
        }

        /**
         * Ensures explicit width and height HTML attributes on slide images to eliminate CLS (#391).
         *
         * Inspects block attributes for attachment IDs (images or logos array) and
         * injects missing width and height attributes based on WordPress attachment metadata.
         *
         * @since 1.2.1
         *
         * @param string $block_content The block HTML content.
         * @param array  $block         The block data and attributes.
         * @return string Updated block HTML with width/height attributes on slide images.
         */
        public function ensure_image_dimensions( string $block_content, array $block ): string {
            if ( empty( $block_content ) || empty( $block['attrs'] ) ) {
                return $block_content;
            }

            if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || ( function_exists( 'is_feed' ) && is_feed() ) ) {
                return $block_content;
            }

            // Extract images or logos array.
            $items = [];
            if ( ! empty( $block['attrs']['images'] ) && is_array( $block['attrs']['images'] ) ) {
                $items = $block['attrs']['images'];
            } elseif ( ! empty( $block['attrs']['logos'] ) && is_array( $block['attrs']['logos'] ) ) {
                $items = $block['attrs']['logos'];
            }

            if ( empty( $items ) ) {
                return $block_content;
            }

            foreach ( $items as $item ) {
                if ( empty( $item['id'] ) || (int) $item['id'] <= 0 || empty( $item['url'] ) ) {
                    continue;
                }

                $attachment_id = (int) $item['id'];
                $meta          = function_exists( 'wp_get_attachment_metadata' ) ? wp_get_attachment_metadata( $attachment_id ) : null;
                $width         = ! empty( $meta['width'] ) ? (int) $meta['width'] : null;
                $height        = ! empty( $meta['height'] ) ? (int) $meta['height'] : null;

                if ( ! $width || ! $height ) {
                    if ( function_exists( 'wp_get_attachment_image_src' ) ) {
                        $src_data = wp_get_attachment_image_src( $attachment_id, 'full' );
                        if ( ! empty( $src_data[1] ) && ! empty( $src_data[2] ) ) {
                            $width  = (int) $src_data[1];
                            $height = (int) $src_data[2];
                        }
                    }
                }

                if ( ! $width || ! $height ) {
                    continue;
                }

                $escaped_url = preg_quote( $item['url'], '/' );
                $pattern     = '/<img\b([^>]*src=["\']' . $escaped_url . '["\'][^>]*)>/i';

                // If full URL match fails, try basename matching for protocol-relative or rewritten CDN URLs.
                if ( ! preg_match( $pattern, $block_content ) ) {
                    $url_path = function_exists( 'wp_parse_url' ) ? wp_parse_url( $item['url'], PHP_URL_PATH ) : parse_url( $item['url'], PHP_URL_PATH );
                    $basename = ! empty( $url_path ) ? basename( $url_path ) : basename( $item['url'] );
                    if ( ! empty( $basename ) ) {
                        $escaped_basename = preg_quote( $basename, '/' );
                        $pattern          = '/<img\b([^>]*src=["\'][^"\']*\/' . $escaped_basename . '(?:[?#][^"\']*)?["\'][^>]*)>/i';
                    }
                }

                $block_content = preg_replace_callback(
                    $pattern,
                    static function ( $matches ) use ( $width, $height ) {
                        $attrs           = $matches[1];
                        $is_self_closing = '/' === substr( trim( $attrs ), -1 );
                        $new_attrs       = rtrim( $attrs, " /\t\n\r\0\x0B" );

                        if ( ! preg_match( '/\bwidth\s*=/i', $new_attrs ) ) {
                            $new_attrs .= ' width="' . $width . '"';
                        }
                        if ( ! preg_match( '/\bheight\s*=/i', $new_attrs ) ) {
                            $new_attrs .= ' height="' . $height . '"';
                        }

                        return '<img' . $new_attrs . ( $is_self_closing ? ' />' : '>' );
                    },
                    $block_content
                );
            }

            return $block_content;
        }

        /**
         * Backward-compatible alias for collect_dynamic_styles.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_dynamic_styles( $block_content, $block ) {
            return $this->collect_and_render_dynamic_styles( $block_content, $block );
        }

        /**
         * Strictly sanitizes CSS rules to prevent arbitrary CSS injection.
         *
         * Enforces:
         * 1. Removal of all HTML/XML tags.
         * 2. Removal of comments to avoid filter bypasses.
         * 3. Blocking of dangerous protocols (javascript, data, expression, behavior, -moz-binding, vbscript).
         * 4. Stripping of risky at-rules (@import, @charset, @namespace, etc.).
         * 5. Sanitization of url() values to only allow safe HTTP/HTTPS image URLs.
         * 6. Scoping: every selector MUST contain the specific block ID.
         *
         * @since 1.2.0
         *
         * @param string $css      The raw CSS string to sanitize.
         * @param string $block_id The unique block identifier to enforce scoping against.
         * @return string The sanitized and minified CSS string.
         */
        public function sanitize_css( $css, $block_id ): string {
            if ( empty( $css ) || ! is_string( $css ) ) {
                return '';
            }

            // Layer 1: Run comprehensive CssSanitizer to strip nested exploit patterns.
            $css = CssSanitizer::sanitize( $css );
            if ( empty( $css ) ) {
                return '';
            }

            // 1. Strip all HTML/XML tags.
            $css = wp_strip_all_tags( $css );

            // 2. Strip comments to prevent comment-based filter bypasses.
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );

            // 3. Block and strip dangerous CSS functions, protocols, and keywords.
            $dangerous_patterns = [
                '/javascript\s*:/i',
                '/expression\s*\(/i',
                '/behavior\s*:/i',
                '/-moz-binding\s*:/i',
                '/vbscript\s*:/i',
                '/@import\b[^;]*;?/i',
                '/@charset\b[^;]*;?/i',
                '/@namespace\b[^;]*;?/i',
                '/<\/?(?:script|style|iframe|object|embed)[^>]*>/i',
                '/data\s*:\s*text\/html/i',
            ];
            $css = preg_replace( $dangerous_patterns, '', $css );

            // 4. Sanitize and validate url(...) values: only allow safe image URLs.
            $css = preg_replace_callback( '/url\s*\(\s*([\'"]?)(.*?)\1\s*\)/i', function( $matches ) {
                $url = trim( $matches[2] );
                // If it contains quotes, parentheses, semicolons, or dangerous protocols, reject it.
                if ( preg_match( '/[\'"\(\);\s]/', $url ) || preg_match( '/^(javascript|data|vbscript):/i', $url ) ) {
                    return 'none';
                }
                $clean_url = esc_url_raw( $url );
                return empty( $clean_url ) ? 'none' : "url('{$clean_url}')";
            }, $css );

            // 5. Enforce Block Scoping:
            // Extract media queries and normal rules, ensuring EVERY selector is scoped to $block_id.
            $output = '';

            // Handle media queries.
            $media_regex = '/@media[^{]+\{(?:[^{}]*\{[^{}]*\})+[^{}]*\}/i';
            if ( preg_match_all( $media_regex, $css, $media_matches, PREG_SET_ORDER ) ) {
                foreach ( $media_matches as $match ) {
                    $media_full   = $match[0];
                    $open_pos     = strpos( $media_full, '{' );
                    $media_header = trim( substr( $media_full, 0, $open_pos ) );
                    $media_inner  = trim( substr( $media_full, $open_pos + 1, -1 ) );

                    $sanitized_inner = $this->filter_rules_by_scope( $media_inner, $block_id );
                    if ( ! empty( $sanitized_inner ) ) {
                        $output .= $media_header . ' { ' . $sanitized_inner . " }\n";
                    }
                    $css = str_replace( $media_full, '', $css );
                }
            }

            // Handle remaining standard rules.
            $sanitized_normal = $this->filter_rules_by_scope( $css, $block_id );
            if ( ! empty( $sanitized_normal ) ) {
                $output .= $sanitized_normal;
            }

            return $this->minify_css( $output );
        }

        /**
         * Filters CSS rules so that only selectors containing the specific block ID are retained.
         *
         * Drops any selectors that attempt to target outside elements (e.g. body, html, input, *).
         *
         * @since 1.2.0
         *
         * @param string $css      CSS rules chunk.
         * @param string $block_id Block identifier to match against.
         * @return string Filtered CSS rules.
         */
        private function filter_rules_by_scope( $css, $block_id ): string {
            $rules       = explode( '}', $css );
            $valid_rules = [];

            foreach ( $rules as $rule ) {
                $rule = trim( $rule );
                if ( empty( $rule ) ) {
                    continue;
                }

                $parts = explode( '{', $rule );
                if ( count( $parts ) < 2 ) {
                    continue;
                }

                $selectors_str = trim( $parts[0] );
                $props_str     = trim( $parts[1] );

                if ( empty( $selectors_str ) || empty( $props_str ) ) {
                    continue;
                }

                $selectors       = explode( ',', $selectors_str );
                $valid_selectors = [];

                foreach ( $selectors as $sel ) {
                    $sel = trim( $sel );
                    // Must contain the specific block ID to prevent targeting arbitrary page elements.
                    if ( false !== strpos( $sel, $block_id ) ) {
                        $valid_selectors[] = $sel;
                    }
                }

                if ( ! empty( $valid_selectors ) ) {
                    $valid_rules[] = implode( ', ', $valid_selectors ) . ' { ' . $props_str . ' }';
                }
            }

            return implode( ' ', $valid_rules );
        }

        /**
         * Resets collected styles and optimization flags in memory (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return void
         */
        public static function reset_styles(): void {
            self::$styles        = [];
            self::$printed       = [];
            self::$lcp_optimized = false;
        }

        /**
         * Gets collected styles array (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return string[]
         */
        public static function get_collected_styles(): array {
            return self::$styles;
        }

        /**
         * Retrieves the Content Security Policy (CSP) nonce if configured (#314).
         *
         * Checks the 'gslider_style_nonce', 'gslider_csp_nonce', and 'wp_csp_nonce' filters.
         *
         * @since 1.2.1
         *
         * @return string The sanitized CSP nonce string, or empty string if not set.
         */
        public function get_csp_nonce(): string {
            $nonce = apply_filters( 'gslider_style_nonce', '' );
            if ( empty( $nonce ) ) {
                $nonce = apply_filters( 'gslider_csp_nonce', '' );
            }
            if ( empty( $nonce ) ) {
                $nonce = apply_filters( 'wp_csp_nonce', '' );
            }
            return is_string( $nonce ) ? sanitize_text_field( $nonce ) : '';
        }

        /**
         * Determines whether external dynamic CSS file caching is enabled (#314).
         *
         * Can be enabled via constant GSLIDER_DYNAMIC_CSS_FILE_CACHE or filter 'gslider_enable_file_cache'.
         *
         * @since 1.2.1
         *
         * @return bool True if file caching is enabled.
         */
        public function is_file_cache_enabled(): bool {
            $enabled = defined( 'GSLIDER_DYNAMIC_CSS_FILE_CACHE' ) && GSLIDER_DYNAMIC_CSS_FILE_CACHE;
            return (bool) apply_filters( 'gslider_enable_file_cache', $enabled );
        }

        /**
         * Writes dynamic CSS to a hashed static file in uploads and enqueues it (#314).
         *
         * Allows strict CSP environments (style-src 'self') to load dynamic block styles
         * without any inline <style> tags.
         *
         * @since 1.2.1
         *
         * @param string $block_id    Block unique identifier.
         * @param string $clean_style Sanitized CSS rules.
         * @return bool True if successfully enqueued or file exists, false to fallback to inline style.
         */
        public function enqueue_dynamic_css_file( string $block_id, string $clean_style ): bool {
            if ( empty( $block_id ) || empty( $clean_style ) ) {
                return false;
            }

            if ( ! function_exists( 'wp_upload_dir' ) ) {
                return false;
            }

            $upload = wp_upload_dir();
            if ( empty( $upload['basedir'] ) || empty( $upload['baseurl'] ) ) {
                return false;
            }

            $cache_dir = trailingslashit( $upload['basedir'] ) . 'gslider-styles';
            $cache_url = trailingslashit( $upload['baseurl'] ) . 'gslider-styles';

            if ( ! is_dir( $cache_dir ) ) {
                if ( function_exists( 'wp_mkdir_p' ) ) {
                    wp_mkdir_p( $cache_dir );
                } elseif ( ! @mkdir( $cache_dir, 0755, true ) && ! is_dir( $cache_dir ) ) {
                    return false;
                }
            }

            $hash      = substr( md5( $clean_style ), 0, 8 );
            $file_name = 'gslider-' . $block_id . '-' . $hash . '.css';
            $file_path = $cache_dir . '/' . $file_name;
            $file_url  = function_exists( 'set_url_scheme' )
                ? set_url_scheme( $cache_url . '/' . $file_name )
                : $cache_url . '/' . $file_name;

            if ( ! file_exists( $file_path ) ) {
                // Delete older hashed files for this block_id to prevent orphaned cache files.
                $pattern   = $cache_dir . '/gslider-' . $block_id . '-*.css';
                $old_files = glob( $pattern );
                if ( ! empty( $old_files ) && is_array( $old_files ) ) {
                    foreach ( $old_files as $old_file ) {
                        if ( is_file( $old_file ) ) {
                            @unlink( $old_file );
                        }
                    }
                }

                $written = @file_put_contents( $file_path, $clean_style );
                if ( false === $written ) {
                    return false;
                }
            }

            $handle = 'gslider-style-' . $block_id;
            if ( function_exists( 'wp_enqueue_style' ) ) {
                wp_enqueue_style( $handle, $file_url, [], GSLIDER_VERSION );
            }

            return true;
        }

        /**
         * Clears all cached dynamic CSS files in uploads/gslider-styles (#314).
         *
         * @since 1.2.0
         *
         * @return int Number of cached files purged.
         */
        public function clear_dynamic_css_cache(): int {
            self::reset_styles();

            if ( ! function_exists( 'wp_upload_dir' ) ) {
                return 0;
            }

            $upload = wp_upload_dir();
            if ( empty( $upload['basedir'] ) ) {
                return 0;
            }

            $cache_dir = trailingslashit( $upload['basedir'] ) . 'gslider-styles';
            if ( ! is_dir( $cache_dir ) ) {
                return 0;
            }

            $files = glob( $cache_dir . '/*.css' );
            if ( empty( $files ) || ! is_array( $files ) ) {
                return 0;
            }

            $count = 0;
            foreach ( $files as $file ) {
                if ( is_file( $file ) && @unlink( $file ) ) {
                    $count++;
                }
            }

            return $count;
        }

        /**
         * Retrieves dynamic CSS cache statistics (#314).
         *
         * @since 1.2.0
         *
         * @return array{files_count: int, total_size_bytes: int, total_size_formatted: string}
         */
        public function get_cache_stats(): array {
            $default = [
                'files_count'          => 0,
                'total_size_bytes'     => 0,
                'total_size_formatted' => '0 KB',
            ];

            if ( ! function_exists( 'wp_upload_dir' ) ) {
                return $default;
            }

            $upload = wp_upload_dir();
            if ( empty( $upload['basedir'] ) ) {
                return $default;
            }

            $cache_dir = trailingslashit( $upload['basedir'] ) . 'gslider-styles';
            if ( ! is_dir( $cache_dir ) ) {
                return $default;
            }

            $files = glob( $cache_dir . '/*.css' );
            if ( empty( $files ) || ! is_array( $files ) ) {
                return $default;
            }

            $total_bytes = 0;
            $files_count = 0;
            foreach ( $files as $file ) {
                if ( is_file( $file ) ) {
                    $files_count++;
                    $total_bytes += (int) filesize( $file );
                }
            }

            $formatted = function_exists( 'size_format' )
                ? size_format( $total_bytes, 2 )
                : round( $total_bytes / 1024, 2 ) . ' KB';

            return [
                'files_count'          => $files_count,
                'total_size_bytes'     => $total_bytes,
                'total_size_formatted' => $formatted,
            ];
        }

        /**
         * Prints any collected dynamic styles in wp_footer as fallback.
         *
         * If styles remain collected and CSP nonce is present, injects nonce attribute.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function print_footer_styles(): void {
            if ( empty( self::$styles ) || $this->is_file_cache_enabled() ) {
                self::$styles = [];
                return;
            }

            // Only output dynamic styles that have not already been rendered inline.
            $unprinted_styles = array_diff_key( self::$styles, self::$printed );
            if ( ! empty( $unprinted_styles ) ) {
                $combined_css = implode( "\n", $unprinted_styles );
                if ( ! empty( $combined_css ) ) {
                    $nonce      = $this->get_csp_nonce();
                    $nonce_attr = ! empty( $nonce ) ? ' nonce="' . esc_attr( $nonce ) . '"' : '';
                    echo '<style id="gslider-blocks-footer-styles"' . $nonce_attr . ">\n" . $combined_css . "\n</style>\n";
                }
            }

            self::$styles = [];
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
        private function minify_css( $css ): string {
            if ( empty( $css ) ) {
                return '';
            }

            $css = wp_strip_all_tags( $css );
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
            $css = preg_replace( '/\s*([:,;{}])\s*/', '$1', $css );
            $css = preg_replace( '/;}/', '}', $css );

            return trim( $css );
        }
    }
}
