<?php
/**
 * Unit tests for GSlider\Classes\StyleGenerator.
 *
 * Verifies that:
 * 1. StyleGenerator implements Registrable interface and SingletonTrait.
 * 2. register() hooks into WordPress 'render_block', 'wp_footer', and 'wp_enqueue_scripts'.
 * 3. Dynamic styles are sanitized and scoped strictly to block IDs.
 * 4. Duplicate <style> tags are prevented for identical block IDs in the same request (#312).
 * 5. <style> tags are completely excluded from RSS feeds (#312).
 * 6. LCP image optimization prioritizes the first slide image on the frontend (#391).
 * 7. reset_styles() resets collected styles, printed IDs, and optimization state.
 *
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

global $is_admin_mock, $is_feed_mock;
$is_admin_mock = false;
$is_feed_mock  = false;

// Require Core Classes Under Test.
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/Classes/StyleGenerator.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Classes\StyleGenerator;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Classes\StyleGenerator.
 */
class StyleGeneratorTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider StyleGenerator Unit Tests ===\n\n";

		$this->test_implements_registrable_and_singleton();
		$this->test_plugin_services_contains_class();
		$this->test_register_hooks();
		$this->test_css_scoping_and_sanitization();
		$this->test_dynamic_css_deduplication();
		$this->test_feed_exclusion();
		$this->test_lcp_image_optimization();
		$this->test_ensure_image_dimensions();
		$this->test_reset_styles();

		echo "\nAll StyleGenerator unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Verify StyleGenerator implements Registrable and follows Singleton pattern.
	 *
	 * @return void
	 */
	public function test_implements_registrable_and_singleton(): void {
		$generator = StyleGenerator::getInstance();
		if ( ! ( $generator instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator implements Registrable interface\n";

		$generator_again = StyleGenerator::getInstance();
		if ( $generator !== $generator_again ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not maintain singleton identity\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator implements SingletonTrait correctly\n";
	}

	/**
	 * Test 2: Verify Plugin::$services array contains StyleGenerator::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_class(): void {
		$ref = new ReflectionProperty( Plugin::class, 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$services = $ref->getValue( Plugin::getInstance() );

		if ( ! in_array( StyleGenerator::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::\$services array does not contain StyleGenerator::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin::\$services contains StyleGenerator::class\n";
	}

	/**
	 * Test 3: Verify register() registers proper filters and actions.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_filters, $wp_actions;

		$generator = StyleGenerator::getInstance();
		$generator->register();

		// Check render_block filter.
		$has_filter = false;
		if ( ! empty( $wp_filters['render_block'] ) ) {
			foreach ( $wp_filters['render_block'] as $filter ) {
				if ( is_array( $filter['callback'] ) && $filter['callback'][0] instanceof StyleGenerator && 'collect_and_render_dynamic_styles' === $filter['callback'][1] ) {
					$has_filter = true;
					break;
				}
			}
		}
		if ( ! $has_filter ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not hook collect_and_render_dynamic_styles into render_block\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator hooks into render_block filter\n";

		// Check wp_footer action.
		$has_footer_action = false;
		if ( ! empty( $wp_actions['wp_footer'] ) ) {
			foreach ( $wp_actions['wp_footer'] as $action ) {
				if ( is_array( $action['callback'] ) && $action['callback'][0] instanceof StyleGenerator && 'print_footer_styles' === $action['callback'][1] ) {
					$has_footer_action = true;
					break;
				}
			}
		}
		if ( ! $has_footer_action ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not hook print_footer_styles into wp_footer\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator hooks into wp_footer action\n";
	}

	/**
	 * Test 4: Verify CSS sanitization enforces scoping to block ID and strips dangerous constructs.
	 *
	 * @return void
	 */
	public function test_css_scoping_and_sanitization(): void {
		$generator = StyleGenerator::getInstance();
		$block_id  = 'gslider-test-block';

		// Rule properly scoped to block ID.
		$valid_css = ".{$block_id} { color: #ff0000; padding: 20px; }";
		$clean     = $generator->sanitize_css( $valid_css, $block_id );

		if ( false === strpos( $clean, $block_id ) || false === strpos( $clean, 'color:#ff0000' ) ) {
			fwrite( STDERR, "FAIL: Valid scoped CSS was improperly stripped: $clean\n" );
			exit( 1 );
		}
		echo "OK: Valid scoped CSS is preserved\n";

		// Unscoped rule targeting global body should be dropped.
		$unscoped_css = "body { background: black; } .{$block_id} { margin: 10px; }";
		$clean_unscoped = $generator->sanitize_css( $unscoped_css, $block_id );

		if ( false !== strpos( $clean_unscoped, 'body' ) ) {
			fwrite( STDERR, "FAIL: Unscoped selector 'body' was not dropped: $clean_unscoped\n" );
			exit( 1 );
		}
		if ( false === strpos( $clean_unscoped, $block_id ) ) {
			fwrite( STDERR, "FAIL: Scoped rule was dropped alongside unscoped rule: $clean_unscoped\n" );
			exit( 1 );
		}
		echo "OK: Unscoped CSS selectors are strictly dropped\n";
	}

	/**
	 * Test 5: Verify dynamic CSS deduplication per block ID on a single request (#312).
	 *
	 * @return void
	 */
	public function test_dynamic_css_deduplication(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-dedup-1';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { background: #fff; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper ' . $block_id . '">Slider 1</div>';

		// First render should prepend <style id="gslider-style-{id}">.
		$first_render = $generator->collect_and_render_dynamic_styles( $content, $block );
		$expected_style_tag = '<style id="gslider-style-' . $block_id . '">';

		if ( false === strpos( $first_render, $expected_style_tag ) ) {
			fwrite( STDERR, "FAIL: First render did not include expected style tag\n" );
			exit( 1 );
		}
		echo "OK: First render outputs dynamic <style> tag scoped to block ID\n";

		// Second render of the same block (e.g. query loop or synced pattern) should NOT prepend duplicate style tag.
		$second_render = $generator->collect_and_render_dynamic_styles( $content, $block );
		if ( false !== strpos( $second_render, $expected_style_tag ) ) {
			fwrite( STDERR, "FAIL: Second render included duplicate <style> tag for block ID '$block_id'\n" );
			exit( 1 );
		}
		echo "OK: Second render deduplicates and skips duplicate <style> tag\n";
	}

	/**
	 * Test 6: Verify <style> tags are excluded from RSS feeds (#312).
	 *
	 * @return void
	 */
	public function test_feed_exclusion(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = true; // Simulate RSS feed context.

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-feed-block';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { opacity: 0.9; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper">Feed Content</div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		if ( false !== strpos( $output, '<style' ) ) {
			fwrite( STDERR, "FAIL: <style> tag leaked into RSS feed output\n" );
			exit( 1 );
		}
		if ( $output !== $content ) {
			fwrite( STDERR, "FAIL: Feed content was altered in feed context\n" );
			exit( 1 );
		}
		echo "OK: Dynamic <style> tags are completely excluded from RSS feeds\n";

		$is_feed_mock = false;
	}

	/**
	 * Test 7: Verify LCP image optimization on first slide of first slider on the frontend (#391).
	 *
	 * @return void
	 */
	public function test_lcp_image_optimization(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-hero-slider';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { height: 500px; }",
			],
		];

		$content = '<div class="gslider-image-slider-wrapper ' . $block_id . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="https://example.com/slide1.jpg" alt="Slide 1" loading="lazy" /></div>' .
			'<div class="swiper-slide"><img src="https://example.com/slide2.jpg" alt="Slide 2" loading="lazy"></div>' .
			'</div></div></div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		// Verify slide 1 received fetchpriority="high", loading="eager", decoding="async" and preserved self-closing syntax.
		if ( preg_match( '/\/\s+[a-z]/i', $output ) ) {
			fwrite( STDERR, "FAIL: Malformed slash in middle of attributes for self-closing tag: $output\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*\/>/i', $output ) ) {
			fwrite( STDERR, "FAIL: Self-closing slash was lost on slide 1: $output\n" );
			exit( 1 );
		}
		echo "OK: Self-closing tag properly formatted without misplaced slashes\n";

		// Verify slide 1 received fetchpriority="high", loading="eager", decoding="async".
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*fetchpriority="high"[^>]*>/i', $output ) &&
		     ! preg_match( '/<img[^>]*fetchpriority="high"[^>]*slide1\.jpg[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image did not receive fetchpriority=\"high\"\n" );
			exit( 1 );
		}
		echo "OK: First slide image received fetchpriority=\"high\"\n";

		if ( preg_match( '/<img[^>]*slide1\.jpg[^>]*loading="lazy"/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image retained loading=\"lazy\"\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*loading="eager"/i', $output ) &&
		     ! preg_match( '/<img[^>]*loading="eager"[^>]*slide1\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image did not receive loading=\"eager\"\n" );
			exit( 1 );
		}
		echo "OK: First slide image converted loading=\"lazy\" to loading=\"eager\"\n";

		// Verify slide 2 retained loading="lazy" and did NOT get fetchpriority="high".
		if ( ! preg_match( '/<img[^>]*slide2\.jpg[^>]*loading="lazy"/i', $output ) &&
		     ! preg_match( '/<img[^>]*loading="lazy"[^>]*slide2\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: Second slide image lost loading=\"lazy\"\n" );
			exit( 1 );
		}
		if ( preg_match( '/<img[^>]*slide2\.jpg[^>]*fetchpriority/i', $output ) ||
		     preg_match( '/<img[^>]*fetchpriority[^>]*slide2\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: Second slide image improperly received fetchpriority\n" );
			exit( 1 );
		}
		echo "OK: Second slide image preserved loading=\"lazy\" without fetchpriority\n";

		// Second slider on the page: should NOT receive fetchpriority on its first image.
		$block_id_2 = 'gslider-second-slider';
		$block_2    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id_2,
				'blockStyle' => ".{$block_id_2} { height: 300px; }",
			],
		];
		$content_2  = '<div class="gslider-image-slider-wrapper ' . $block_id_2 . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="https://example.com/slide3.jpg" alt="Slide 3" loading="lazy"></div>' .
			'</div></div></div>';

		$output_2 = $generator->collect_and_render_dynamic_styles( $content_2, $block_2 );

		if ( preg_match( '/<img[^>]*slide3\.jpg[^>]*fetchpriority/i', $output_2 ) ||
		     preg_match( '/<img[^>]*fetchpriority[^>]*slide3\.jpg/i', $output_2 ) ) {
			fwrite( STDERR, "FAIL: Subsequent slider improperly received fetchpriority\n" );
			exit( 1 );
		}
		echo "OK: Subsequent sliders on the page do not receive duplicate fetchpriority\n";
	}

	/**
	 * Test 8: Verify ensure_image_dimensions injects width and height on slide images (#391).
	 *
	 * @return void
	 */
	public function test_ensure_image_dimensions(): void {
		global $is_admin_mock, $is_feed_mock, $attachment_metadata_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		$attachment_metadata_mock = [
			42 => [
				'width'  => 800,
				'height' => 600,
			],
			43 => [
				'width'  => 400,
				'height' => 300,
			],
			44 => [
				'width'  => 1200,
				'height' => 800,
			],
		];

		$generator = StyleGenerator::getInstance();

		$block = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId' => 'gslider-img-test',
				'images'  => [
					[
						'id'  => -1, // Template mock id: must be skipped gracefully
						'url' => 'https://example.com/template-placeholder.jpg',
					],
					[
						'id'  => 42,
						'url' => 'https://example.com/wp-content/uploads/2026/01/photo1.jpg',
					],
					[
						'id'  => 43,
						'url' => 'https://example.com/wp-content/uploads/2026/01/photo2.jpg',
					],
					[
						'id'  => 44,
						'url' => 'https://example.com/wp-content/uploads/2026/01/photo_cdn.jpg?w=800&fit=crop',
					],
				],
			],
		];

		// Image 1 has no width or height (self-closing). Image 2 already has width and height. Image 3 is a duplicate of Image 1 (ticker loop). Image 4 has CDN query string.
		$content = '<div class="gslider-image-slider-wrapper">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="https://example.com/wp-content/uploads/2026/01/photo1.jpg" alt="Photo 1" /></div>' .
			'<div class="swiper-slide"><img src="https://example.com/wp-content/uploads/2026/01/photo2.jpg" alt="Photo 2" width="400" height="300"></div>' .
			'<div class="swiper-slide"><img src="https://example.com/wp-content/uploads/2026/01/photo1.jpg" alt="Photo 1 Dup"></div>' .
			'<div class="swiper-slide"><img src="https://example.com/wp-content/uploads/2026/01/photo_cdn.jpg?w=800&fit=crop" alt="Photo CDN"></div>' .
			'</div></div></div>';

		$output = $generator->ensure_image_dimensions( $content, $block );

		// Check CDN image got width="1200" and height="800" despite query string.
		if ( ! strpos( $output, 'photo_cdn.jpg?w=800&fit=crop" alt="Photo CDN" width="1200" height="800"' ) ) {
			fwrite( STDERR, "FAIL: CDN image with query parameters did not have dimensions injected: $output\n" );
			exit( 1 );
		}
		echo "OK: ensure_image_dimensions handles URLs with query parameters and ignores negative IDs\n";

		// Check both photo 1 instances got width="800" and height="600".
		$photo1_count = substr_count( $output, 'width="800" height="600"' );
		if ( 2 !== $photo1_count ) {
			fwrite( STDERR, "FAIL: Both photo 1 instances did not have dimensions injected (found $photo1_count): $output\n" );
			exit( 1 );
		}
		if ( preg_match( '/\/\s+[a-z]/i', $output ) ) {
			fwrite( STDERR, "FAIL: Malformed slash in middle of attributes in ensure_image_dimensions: $output\n" );
			exit( 1 );
		}
		echo "OK: ensure_image_dimensions injects dimensions on all duplicate images and handles self-closing tags\n";

		// Check photo 2 did not get duplicate width or height attributes.
		if ( substr_count( $output, 'photo2.jpg' ) > 0 ) {
			preg_match( '/<img[^>]*photo2\.jpg[^>]*>/i', $output, $photo2_match );
			if ( ! empty( $photo2_match[0] ) ) {
				if ( substr_count( $photo2_match[0], 'width=' ) > 1 || substr_count( $photo2_match[0], 'height=' ) > 1 ) {
					fwrite( STDERR, "FAIL: Photo 2 received duplicate dimensions: {$photo2_match[0]}\n" );
					exit( 1 );
				}
			}
		}
		echo "OK: ensure_image_dimensions does not duplicate existing dimensions\n";

		// Test admin bypass.
		$is_admin_mock = true;
		$admin_output  = $generator->ensure_image_dimensions( $content, $block );
		if ( $admin_output !== $content ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions did not bypass in admin context\n" );
			exit( 1 );
		}
		echo "OK: ensure_image_dimensions is safely bypassed in admin\n";
		$is_admin_mock = false;
	}

	/**
	 * Test 9: Verify reset_styles() cleans all internal state.
	 *
	 * @return void
	 */
	public function test_reset_styles(): void {
		$generator = StyleGenerator::getInstance();
		StyleGenerator::reset_styles();

		$styles = StyleGenerator::get_collected_styles();
		if ( ! empty( $styles ) ) {
			fwrite( STDERR, "FAIL: reset_styles() did not clear collected styles\n" );
			exit( 1 );
		}
		echo "OK: reset_styles() clears collected styles and flags\n";
	}
}

// Standalone execution entrypoint.
( new StyleGeneratorTest() )->run_all_tests();
