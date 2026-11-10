<?php
/**
 * Unit tests for GSlider\Utils\Helper.
 *
 * Verifies that:
 * 1. Helper class exists via Helper::class.
 * 2. build_date_query() uses wp_date() site timezone and integer casts for current_month and current_year, while keeping relative ranges intact.
 * 3. build_tax_query() compiles category, tag, custom taxonomy, filter type operators, and legacy positional arguments.
 * 4. build_author_query() builds author__in and author__not_in integer arrays.
 * 5. build_excluded_posts() parses comma-separated IDs, appends current post ID when enabled, and deduplicates.
 * 6. build_meta_query() normalizes and allowlists meta_compare, omits value on EXISTS/NOT EXISTS, and preserves '0' while skipping empty ''.
 *
 * @package GSlider\Tests\Utils
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

if ( ! function_exists( 'wp_date' ) ) {
	/**
	 * Stub for WordPress wp_date() controlled by test global map.
	 *
	 * @param string $format Date format string.
	 * @return string
	 */
	function wp_date( $format ) {
		global $gslider_mock_wp_date;
		if ( isset( $gslider_mock_wp_date[ $format ] ) ) {
			return (string) $gslider_mock_wp_date[ $format ];
		}
		return gmdate( (string) $format );
	}
}

if ( ! function_exists( 'get_the_ID' ) ) {
	/**
	 * Stub for WordPress get_the_ID() controlled by test global.
	 *
	 * @return int|false
	 */
	function get_the_ID() {
		global $gslider_mock_current_post_id;
		return isset( $gslider_mock_current_post_id ) ? $gslider_mock_current_post_id : false;
	}
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Utils/Helper.php';

use GSlider\Utils\Helper;

/**
 * Test class for GSlider\Utils\Helper.
 *
 * @package GSlider\Tests\Utils
 */
class HelperTest {

	/**
	 * Helper assertion for strict boolean conditions.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( bool $condition, string $message ): void {
		if ( true !== $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Helper assertion for strict identical comparisons.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion message.
	 * @return void
	 */
	public function assert_same( $expected, $actual, string $message ): void {
		if ( $expected !== $actual ) {
			fwrite( STDERR, "FAIL: {$message} (Expected: " . var_export( $expected, true ) . ', Got: ' . var_export( $actual, true ) . ")\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Runs all Helper unit tests.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider Helper Unit Tests ===\n\n";

		$this->test_class_exists();
		$this->test_build_date_query_site_timezone_and_ranges();
		$this->test_build_tax_query();
		$this->test_build_author_query();
		$this->test_build_excluded_posts();
		$this->test_build_meta_query();

		echo "\nAll Helper unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Helper class exists via Helper::class.
	 *
	 * @return void
	 */
	public function test_class_exists(): void {
		$this->assert_true( class_exists( Helper::class, false ), 'Helper class exists via Helper::class' );
	}

	/**
	 * Test 2: build_date_query() respects wp_date() site timezone across boundaries and returns integers.
	 *
	 * @return void
	 */
	public function test_build_date_query_site_timezone_and_ranges(): void {
		global $gslider_mock_wp_date;

		// Cross-year/month boundary differing from system clock (e.g. UTC Dec 31 vs site Jan 1 2099).
		$gslider_mock_wp_date = [
			'Y' => '2099',
			'm' => '01',
		];

		$month_query = Helper::build_date_query( 'current_month' );
		$this->assert_same(
			[
				[
					'year'  => 2099,
					'month' => 1,
				],
			],
			$month_query,
			'build_date_query(current_month) returns integer year/month from wp_date() across year boundary'
		);

		$year_query = Helper::build_date_query( 'current_year' );
		$this->assert_same(
			[
				[
					'year' => 2099,
				],
			],
			$year_query,
			'build_date_query(current_year) returns integer year from wp_date() across year boundary'
		);

		// Another explicit site timezone snapshot (2026 / 11).
		$gslider_mock_wp_date = [
			'Y' => '2026',
			'm' => '11',
		];
		$this->assert_same(
			[
				[
					'year'  => 2026,
					'month' => 11,
				],
			],
			Helper::build_date_query( 'current_month' ),
			'build_date_query(current_month) returns 2026/11 integers matching wp_date()'
		);

		$this->assert_same( [], Helper::build_date_query( '' ), 'build_date_query empty returns empty array' );
		$this->assert_same( [], Helper::build_date_query( 'any' ), 'build_date_query(any) returns empty array' );
		$this->assert_same( [ [ 'after' => '24 hours ago' ] ], Helper::build_date_query( 'last_24_hours' ), 'build_date_query(last_24_hours) unchanged' );
		$this->assert_same( [ [ 'after' => '7 days ago' ] ], Helper::build_date_query( 'last_7_days' ), 'build_date_query(last_7_days) unchanged' );
		$this->assert_same( [ [ 'after' => '30 days ago' ] ], Helper::build_date_query( 'last_30_days' ), 'build_date_query(last_30_days) unchanged' );
		$this->assert_same( [ [ 'after' => '1 year ago' ] ], Helper::build_date_query( 'last_365_days' ), 'build_date_query(last_365_days) unchanged' );
	}

	/**
	 * Test 3: build_tax_query() compiles taxonomy clauses and legacy arguments.
	 *
	 * @return void
	 */
	public function test_build_tax_query(): void {
		$this->assert_same( [], Helper::build_tax_query(), 'build_tax_query() with empty args returns empty array' );

		$single_cat = Helper::build_tax_query( [ '3', '7' ], 'exclude' );
		$this->assert_same(
			[
				[
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => [ 3, 7 ],
					'operator' => 'NOT IN',
				],
			],
			$single_cat,
			'build_tax_query() handles excluded category IDs as integers'
		);

		$combined = Helper::build_tax_query(
			[ 1 ],
			'include',
			[ 2 ],
			'exclude',
			[ 'product_cat' => [ '9' ] ],
			[ 'product_cat' => 'include' ]
		);
		$this->assert_same(
			[
				[
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => [ 1 ],
					'operator' => 'IN',
				],
				[
					'taxonomy' => 'post_tag',
					'field'    => 'term_id',
					'terms'    => [ 2 ],
					'operator' => 'NOT IN',
				],
				[
					'taxonomy' => 'product_cat',
					'field'    => 'term_id',
					'terms'    => [ 9 ],
					'operator' => 'IN',
				],
				'relation' => 'AND',
			],
			$combined,
			'build_tax_query() sets relation=AND for multiple taxonomy clauses'
		);

		// Legacy 3-argument signature: build_tax_query( $categories, $tags, $taxonomies ).
		$legacy = Helper::build_tax_query( [ 5 ], [ 6 ], [ 'genre' => [ 8 ] ] );
		$this->assert_same( 'AND', $legacy['relation'] ?? null, 'build_tax_query() supports legacy positional signature' );
		$this->assert_same( 'post_tag', $legacy[1]['taxonomy'] ?? null, 'Legacy signature maps second argument to post_tag' );
		$this->assert_same( 'genre', $legacy[2]['taxonomy'] ?? null, 'Legacy signature maps third argument to custom taxonomy' );
	}

	/**
	 * Test 4: build_author_query() handles empty, include, and exclude modes.
	 *
	 * @return void
	 */
	public function test_build_author_query(): void {
		$this->assert_same( [], Helper::build_author_query(), 'build_author_query() empty returns empty array' );
		$this->assert_same( [ 'author__in' => [ 4, 9 ] ], Helper::build_author_query( [ '4', '9' ], 'include' ), 'build_author_query() include builds author__in' );
		$this->assert_same( [ 'author__not_in' => [ 2, 5 ] ], Helper::build_author_query( [ '2', '5' ], 'exclude' ), 'build_author_query() exclude builds author__not_in' );
	}

	/**
	 * Test 5: build_excluded_posts() parses comma lists, optionally appends current post, and deduplicates.
	 *
	 * @return void
	 */
	public function test_build_excluded_posts(): void {
		global $gslider_mock_current_post_id;

		$gslider_mock_current_post_id = 42;
		$this->assert_same( [], Helper::build_excluded_posts( '', false ), 'build_excluded_posts() empty returns empty array' );
		$this->assert_same( [ 10, 20 ], Helper::build_excluded_posts( '10, 20, 10', false ), 'build_excluded_posts() deduplicates comma-separated IDs' );
		$this->assert_same( [ 10, 42 ], Helper::build_excluded_posts( '10', true ), 'build_excluded_posts() appends current post ID when enabled' );

		$gslider_mock_current_post_id = false;
		$this->assert_same( [ 10 ], Helper::build_excluded_posts( '10', true ), 'build_excluded_posts() ignores false get_the_ID()' );
	}

	/**
	 * Test 6: build_meta_query() allowlists/uppercases compare, omits value on EXISTS/NOT EXISTS, and handles '0' vs ''.
	 *
	 * @return void
	 */
	public function test_build_meta_query(): void {
		$this->assert_same( [], Helper::build_meta_query( '' ), 'build_meta_query() empty key returns empty array' );
		$this->assert_same( [], Helper::build_meta_query( '   ' ), 'build_meta_query() whitespace-only key returns empty array' );

		// Valid allowlisted operators including lowercase normalization.
		$this->assert_same(
			[
				[
					'key'     => 'rating',
					'compare' => 'LIKE',
					'value'   => 'top',
				],
			],
			Helper::build_meta_query( 'rating', 'top', 'like' ),
			"build_meta_query() normalizes lowercase 'like' to 'LIKE'"
		);

		$this->assert_same(
			[
				[
					'key'     => 'rating',
					'compare' => 'NOT LIKE',
					'value'   => 'spam',
				],
			],
			Helper::build_meta_query( 'rating', 'spam', 'not like' ),
			"build_meta_query() normalizes lowercase 'not like' to 'NOT LIKE'"
		);

		// EXISTS and NOT EXISTS omit 'value' even when non-empty value is passed.
		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => 'EXISTS',
				],
			],
			Helper::build_meta_query( 'badge', 'ignored', 'exists' ),
			"build_meta_query() normalizes 'exists' to 'EXISTS' and omits value"
		);

		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => 'NOT EXISTS',
				],
			],
			Helper::build_meta_query( 'badge', 'ignored', 'not exists' ),
			"build_meta_query() normalizes 'not exists' to 'NOT EXISTS' and omits value"
		);

		// Invalid operator falls back to '='.
		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => '=',
					'value'   => 'gold',
				],
			],
			Helper::build_meta_query( 'badge', 'gold', 'REGEXP' ),
			"build_meta_query() falls back invalid operator 'REGEXP' to '='"
		);

		// '0' value is preserved while '' value omits 'value'.
		$this->assert_same(
			[
				[
					'key'     => 'stock',
					'compare' => '=',
					'value'   => '0',
				],
			],
			Helper::build_meta_query( 'stock', '0', '=' ),
			"build_meta_query() preserves '0' meta_value"
		);

		$this->assert_same(
			[
				[
					'key'     => 'stock',
					'compare' => '!=',
				],
			],
			Helper::build_meta_query( 'stock', '', '!=' ),
			"build_meta_query() omits empty string '' meta_value"
		);
	}
}

try {
	( new HelperTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
